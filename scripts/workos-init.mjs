#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = process.cwd()

function log(msg) {
  console.log(`[workos-init] ${msg}`)
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function writeFile(dest, content) {
  ensureDir(path.dirname(dest))
  fs.writeFileSync(dest, content, 'utf8')
}

function readTemplate(relPath) {
  // Read templates from the CLI package directory so it works when run in other repos
  const cliTemplatesPath = path.join(__dirname, '..', 'templates', 'workos', relPath)
  if (fs.existsSync(cliTemplatesPath)) {
    return fs.readFileSync(cliTemplatesPath, 'utf8')
  }

  // Fallback: allow local development reading from current project (useful when running inside this repo)
  const localTemplatesPath = path.join(projectRoot, 'templates', 'workos', relPath)
  if (fs.existsSync(localTemplatesPath)) {
    return fs.readFileSync(localTemplatesPath, 'utf8')
  }

  throw new Error(`Missing template: templates/workos/${relPath}`)
}

function detectBaseDir() {
  const srcPath = path.join(projectRoot, 'src')
  if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) return srcPath
  return projectRoot
}

function detectRouter(baseDir) {
  const hasApp = fs.existsSync(path.join(baseDir, 'app'))
  const hasPages = fs.existsSync(path.join(baseDir, 'pages'))
  if (hasApp) return 'app'
  if (hasPages) return 'pages'
  // Default to app router scaffold if neither exists
  return 'app'
}

function scaffoldAppRouter(baseDir) {
  const destApp = path.join(baseDir, 'app')
  ensureDir(destApp)

  // callback route
  writeFile(path.join(destApp, 'callback', 'route.ts'), readTemplate(path.join('app', 'callback', 'route.ts')))
  // login route
  writeFile(path.join(destApp, 'login', 'route.ts'), readTemplate(path.join('app', 'login', 'route.ts')))
  // logout route
  writeFile(path.join(destApp, 'logout', 'route.ts'), readTemplate(path.join('app', 'logout', 'route.ts')))

  // middleware in baseDir
  writeFile(path.join(baseDir, 'middleware.ts'), readTemplate('middleware.ts'))

  // optional components and contexts
  writeFile(path.join(baseDir, 'components', 'header.tsx'), readTemplate(path.join('components', 'header.tsx')))
  writeFile(path.join(baseDir, 'contexts', 'UserContext.tsx'), readTemplate(path.join('contexts', 'UserContext.tsx')))
}

function scaffoldPagesRouter(baseDir) {
  // Limited support notice
  log('Detected Pages Router. AuthKit Next.js targets App Router; scaffolding basic callback only.')
  const pagesDir = path.join(baseDir, 'pages')
  ensureDir(pagesDir)
  // Place middleware as well — supported for route protection
  writeFile(path.join(baseDir, 'middleware.ts'), readTemplate('middleware.ts'))
  // Create API callback route using App Router handler signature is not supported in Pages.
  // We’ll emit a placeholder file with guidance.
  const apiAuthDir = path.join(pagesDir, 'api', 'auth')
  ensureDir(apiAuthDir)
  writeFile(
    path.join(apiAuthDir, 'workos-callback.ts'),
    `// This placeholder exists because @workos-inc/authkit-nextjs is designed for the App Router.\n` +
      `// Please migrate to App Router or implement a custom callback using the WorkOS Node SDK.\n` +
      `// Docs: https://workos.com/docs/authkit/nextjs\n`
  )
}

function run() {
  // Basic arg support: `install workos-authkit`
  const [, , cmd, sub] = process.argv
  if (cmd === 'install' && sub === 'workos-authkit') {
    log('Scaffolding WorkOS AuthKit files...')
  } else {
    log('Scaffolding WorkOS AuthKit files...')
  }

  const baseDir = detectBaseDir()
  const router = detectRouter(baseDir)
  log(`Base directory: ${path.relative(projectRoot, baseDir) || '.'}`)
  log(`Router detected: ${router}`)

  if (router === 'app') {
    scaffoldAppRouter(baseDir)
  } else {
    scaffoldPagesRouter(baseDir)
  }

  // Create env file if missing
  createEnvFile()

  // Try to wrap layout with AuthKitProvider
  if (router === 'app') {
    try {
      wrapLayoutWithProvider(baseDir)
    } catch (e) {
      log(`Could not update layout automatically: ${e?.message || e}`)
    }
  }

  log('Done. Next steps:')
  log('- Install @workos-inc/authkit-nextjs')
  log('- Add WORKOS env vars to .env.local')
  log('- Configure Redirect URIs in WorkOS dashboard')
}

function createEnvFile() {
  const envPath = path.join(projectRoot, '.env.local')
  const required = {
    WORKOS_CLIENT_ID: 'client_... # from WorkOS dashboard',
    WORKOS_API_KEY: 'sk_... # from WorkOS dashboard',
    WORKOS_COOKIE_PASSWORD: 'SET_A_STRONG_PASSWORD_32_CHARS_MIN',
    NEXT_PUBLIC_WORKOS_REDIRECT_URI: 'http://localhost:3000/callback',
  }
  if (!fs.existsSync(envPath)) {
    const contents = Object.entries(required)
      .map(([k, v]) => `${k}="${v}"`)
      .join('\n') + '\n'
    fs.writeFileSync(envPath, contents, 'utf8')
    log('Created .env.local with WorkOS variables (update values as needed).')
  } else {
    // Append missing keys
    const existing = fs.readFileSync(envPath, 'utf8')
    let updated = existing
    for (const [k, v] of Object.entries(required)) {
      const regex = new RegExp(`^${k}=`, 'm')
      if (!regex.test(existing)) {
        updated += `${k}="${v}"\n`
      }
    }
    if (updated !== existing) {
      fs.writeFileSync(envPath, updated, 'utf8')
      log('Updated .env.local with missing WorkOS variables.')
    }
  }
}

function wrapLayoutWithProvider(baseDir) {
  const layoutPath = path.join(baseDir, 'app', 'layout.tsx')
  if (!fs.existsSync(layoutPath)) throw new Error('layout.tsx not found')
  const backupPath = layoutPath + '.bak'
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(layoutPath, backupPath)
    log('Backed up app/layout.tsx to app/layout.tsx.bak')
  }
  let src = fs.readFileSync(layoutPath, 'utf8')
  if (src.includes('AuthKitProvider')) {
    log('AuthKitProvider already referenced in layout; skipping wrap.')
    return
  }
  // Add import
  const importLine = "import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components'\n"
  if (!src.includes("@workos-inc/authkit-nextjs/components")) {
    // Insert after first import block
    const lines = src.split('\n')
    let insertIdx = 0
    while (insertIdx < lines.length && lines[insertIdx].startsWith('import')) insertIdx++
    lines.splice(insertIdx, 0, importLine.trim())
    src = lines.join('\n')
  }
  // Wrap {children} inside body with AuthKitProvider
  src = src.replace(/(<body[\s\S]*?>)([\s\S]*?)(<\/body>)/, (m, open, inner, close) => {
    // If already wrapped, keep as is
    if (inner.includes('<AuthKitProvider>')) return m
    const wrapped = inner.replace('{children}', '<AuthKitProvider>{children}</AuthKitProvider>')
    return open + wrapped + close
  })
  fs.writeFileSync(layoutPath, src, 'utf8')
  log('Wrapped layout children with <AuthKitProvider>.')
}

try {
  run()
} catch (err) {
  console.error('[workos-init] Error:', err?.message || err)
  process.exitCode = 1
}
// @ts-nocheck
import Link from 'next/link'
import { withAuth, getSignInUrl, signOut } from '@workos-inc/authkit-nextjs'

export default async function Header() {
  const { user } = await withAuth()
  const signInUrl = await getSignInUrl()

  return (
    <header className="flex items-center justify-between py-4 px-4 border-b">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-semibold">Registry</Link>
        <nav className="hidden sm:flex items-center gap-3">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
          <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground">Settings</Link>
        </nav>
      </div>
      {user ? (
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button type="submit" className="text-sm underline">Sign out</button>
        </form>
      ) : (
        <Link href={signInUrl} className="text-sm underline">Sign in</Link>
      )}
    </header>
  )
}
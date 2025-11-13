# Commit Message Guidelines

This document outlines the commit message conventions used in this project to enable automated NPM package publishing via GitHub Actions.

## Overview

Our automated publishing system analyzes commit messages to determine:
- **Version bump type** (major, minor, patch, or none)
- **Which packages to publish** (all packages or specific ones)
- **Whether to skip publishing** entirely

## Commit Message Format

Use the conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types and Version Bumping

| Type | Version Bump | Description |
|------|-------------|-------------|
| `feat:` | **Minor** | New features that add functionality |
| `fix:` | **Patch** | Bug fixes |
| `docs:` | **Patch** | Documentation changes |
| `style:` | **Patch** | Code style changes (formatting, etc.) |
| `refactor:` | **Patch** | Code refactoring without behavior changes |
| `test:` | **Patch** | Adding or updating tests |
| `chore:` | **Patch** | Maintenance tasks, dependency updates |
| `major:` | **Major** | Breaking changes (alternative to BREAKING CHANGE) |
| `minor:` | **Minor** | New features (alternative to feat:) |
| `patch:` | **Patch** | Bug fixes (alternative to fix:) |

### Breaking Changes

For breaking changes, use either:
- `BREAKING CHANGE:` in the commit footer
- `!` after the type (e.g., `feat!:`)
- `major:` as the type

## Examples

### Minor Version Bump (New Feature)
```
feat: add dark mode support

- Implement theme switching functionality
- Add user preference storage
- Update UI components for dark theme
```

### Patch Version Bump (Bug Fix)
```
fix: resolve authentication redirect issue

- Fix redirect loop after login
- Update auth middleware logic
```

### Major Version Bump (Breaking Change)
```
feat!: remove deprecated API endpoints

BREAKING CHANGE: Removed all v1 API endpoints. 
Migrate to v2 endpoints for continued functionality.
```

Alternative format:
```
major: remove deprecated API endpoints

Removed all v1 API endpoints. 
Migrate to v2 endpoints for continued functionality.
```

### Documentation Update
```
docs: update README with installation instructions

- Add step-by-step setup guide
- Include troubleshooting section
```

## Package-Specific Publishing

To publish only specific packages, mention them in the commit message:

```
fix(workos-authkit): resolve token refresh issue

- Fix token expiration handling
- Update refresh logic
```

This will only publish the `@nareshkosal/workos-authkit` package.

Available package names:
- `@nareshkosal/split-display`
- `@nareshkosal/workos-authkit`

## Skip Publishing

To skip automated publishing entirely, include any of these in your commit message:
- `[skip-publish]`
- `[no-publish]`
- `skip-publish:`
- `no-publish:`

Example:
```
chore: update development dependencies [skip-publish]

- Update eslint and prettier versions
- No production changes
```

## Best Practices

### 1. Clear and Descriptive
Write clear, descriptive commit messages that explain the "what" and "why":

```
# Good
feat: add user profile image upload

- Implement image validation and resizing
- Add progress indicator during upload
- Store images in cloud storage

# Bad
feat: upload stuff
```

### 2. Atomic Commits
Keep commits focused and atomic:

```
# Good - One logical change
fix: resolve memory leak in image carousel

# Bad - Multiple unrelated changes
fix: resolve memory leak and update dependencies and refactor utils
```

### 3. Reference Issues
Reference related issues or tickets:

```
fix: resolve navigation bug on mobile

Fixes #123
```

### 4. Consistent Formatting
Use consistent formatting throughout:

```
# Good - Consistent tense and style
feat: add user authentication
fix: resolve login validation issue
docs: update API documentation

# Bad - Mixed styles
feature: added user auth
fix bug in login validation
updating the docs
```

## Validation

The automated system will:
1. Parse your commit message for keywords
2. Determine the appropriate version bump
3. Decide which packages to publish
4. Create a GitHub release with your commit details

## Common Patterns

### Development Workflow
```bash
# New feature
git commit -m "feat: add user registration form"

# Bug fix
git commit -m "fix: resolve form validation error"

# Documentation
git commit -m "docs: update setup instructions"

# Skip publishing
git commit -m "chore: update dependencies [skip-publish]"
```

### Monorepo Package Updates
```bash
# Update specific package
git commit -m "fix(workos-authkit): improve error handling"

# Update multiple packages
git commit -m "feat: add shared utility functions (affects all packages)"
```

## Troubleshooting

### Publishing Didn't Trigger
- Check that your commit message follows the format
- Ensure you're pushing to the main branch
- Verify the GitHub Actions workflow is enabled

### Wrong Version Bump
- Review the commit message type keywords
- Check for breaking change indicators
- Use explicit version bump types (`major:`, `minor:`, `patch:`)

### Need to Skip Publishing
- Add `[skip-publish]` to your commit message
- Use `skip-publish:` or `no-publish:` prefixes

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
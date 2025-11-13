// @ts-nocheck
import { authkitMiddleware } from '@workos-inc/authkit-nextjs'

// Full middleware solution; protects routes and manages the session.
export default authkitMiddleware()

// Configure which routes should be matched by middleware-based auth.
// Adjust as needed; leaving it out protects all resources by default.
export const config = {
  matcher: ['/'],
}
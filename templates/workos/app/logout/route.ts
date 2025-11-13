// @ts-nocheck
import { signOut } from '@workos-inc/authkit-nextjs'

// Signs out the current user and redirects to the configured Logout URI
export const GET = async () => {
  return await signOut()
}
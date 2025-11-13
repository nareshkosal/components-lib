// @ts-nocheck
import { getSignInUrl } from '@workos-inc/authkit-nextjs'

// Login endpoint — redirects users into AuthKit’s hosted flow.
export const GET = async () => {
  const url = await getSignInUrl()
  return Response.redirect(url)
}
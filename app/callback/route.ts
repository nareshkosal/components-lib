// @ts-nocheck
import { handleAuth } from '@workos-inc/authkit-nextjs'

// AuthKit callback endpoint — matches WORKOS redirect URI.
export const GET = handleAuth()
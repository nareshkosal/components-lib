// @ts-nocheck
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components'

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  return <AuthKitProvider>{children}</AuthKitProvider>
}
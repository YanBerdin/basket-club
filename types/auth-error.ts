export interface AuthError {
  name: string
  status?: number
  message?: string
  code?: string
  __isAuthError: boolean
}

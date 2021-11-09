export interface TokenPayload {
  id: number
  email: string
  role: string
}
export interface TokenVerifier {
  verify: (token: string) => Promise<TokenPayload>|TokenPayload
}

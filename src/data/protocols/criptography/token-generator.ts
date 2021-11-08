export interface TokenData {
  id: number
  email: string
  role: string
}
export interface TokenGenerator {
  generate: (data: TokenData) => Promise<string>|string
}

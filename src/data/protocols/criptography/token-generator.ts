export interface TokenData {
  id: number
  email: string
}
export interface TokenGenerator {
  generate: (data: TokenData) => Promise<string>|string
}

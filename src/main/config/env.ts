export const env = {
  port: process.env.SERVER_PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET as string
}

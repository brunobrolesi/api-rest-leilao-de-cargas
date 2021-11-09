export const env = {
  port: process.env.SERVER_PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET as string
}

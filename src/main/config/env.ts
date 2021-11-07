export const env = {
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'my_secret'
}


export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET_DEV,
    jwtExp: '100d'
  },
  dbUrl: 'mongodb://localhost:27017/mini-blog'
}
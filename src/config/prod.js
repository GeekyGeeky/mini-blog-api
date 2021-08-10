
export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  },
  dbUrl: 'mongodb://localhost:27017/api-design'
}
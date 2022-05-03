module.exports = () => ({
  port: +process.env.PORT,
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  databaseUrl: process.env.DATABASE_URL,
});

export default () => ({
  env: process.env.ENV,
  appPort: parseInt(process.env.APP_PORT, 10),
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    schema: process.env.POSTGRES_SCHEMA,
    applicationName: process.env.POSTGRES_DB,
  },
});

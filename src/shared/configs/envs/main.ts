export default () => ({
  env: process.env.ENV,
  saltRounds: process.env.SALT_ROUNDS,
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
  jwt: {
    publicKey: Buffer.from(
      process.env.JWT_PUBLIC_KEY_BASE64!,
      'base64',
    ).toString('utf8'),
    privateKey: Buffer.from(
      process.env.JWT_PRIVATE_KEY_BASE64!,
      'base64',
    ).toString('utf8'),
    accessTokenExpiresInSec: parseInt(
      process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC!,
      10,
    ),
    // refreshTokenExpiresInSec: parseInt(
    //   process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC!,
    //   10,
    // ),
  },
  sso: {
    google: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleClienteSecret: process.env.GOOGLE_CLIENT_SECRET,
      googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
  },
  fileUpload: {
    storageDriver: process.env.STORAGE_DRIVER,
    bucket: process.env.AWS_S3_BUCKET,
    fileSizeLimit: process.env.FILE_SIZE_LIMIT,
    maxCount: process.env.MAX_FILE_COUNT,
  },
});

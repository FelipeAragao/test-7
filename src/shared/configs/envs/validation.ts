import * as Joi from 'joi';

export default Joi.object({
  ENV: Joi.string().valid('local', 'dev', 'prod').default('local'),
  SALT_ROUNDS: Joi.number(),
  APP_PORT: Joi.number().port(),
  POSTGRES_HOST: Joi.string().optional(),
  POSTGRES_PORT: Joi.number().optional(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_DB: Joi.string(),
  POSTGRES_SCHEMA: Joi.string().optional(),
  JWT_PUBLIC_KEY_BASE64: Joi.string().required(),
  JWT_PRIVATE_KEY_BASE64: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXP_IN_SEC: Joi.number().required(),
  // JWT_REFRESH_TOKEN_EXP_IN_SEC: Joi.number().required(),
  GOOGLE_CLIENT_ID: Joi.string().optional(),
  GOOGLE_CLIENT_SECRET: Joi.string().optional(),
  GOOGLE_CALLBACK_URL: Joi.string().uri().optional(),
  STORAGE_STRATEGY: Joi.string().valid('local', 's3').default('local'),
  AWS_S3_BUCKET: Joi.string().optional(),
  FILE_SIZE_LIMIT: Joi.number().optional(),
  MAX_FILE_COUNT: Joi.number().optional(),
});

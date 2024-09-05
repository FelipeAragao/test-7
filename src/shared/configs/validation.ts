import * as Joi from 'joi';

export default Joi.object({
  ENV: Joi.string().valid('local', 'dev', 'prod').default('local'),
  APP_PORT: Joi.number().port(),
  POSTGRES_HOST: Joi.string().optional(),
  POSTGRES_PORT: Joi.number().optional(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_DB: Joi.string(),
  POSTGRES_SCHEMA: Joi.string().optional(),
});

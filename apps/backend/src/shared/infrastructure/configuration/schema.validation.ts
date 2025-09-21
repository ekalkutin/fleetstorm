import Joi, { ObjectSchema } from 'joi';

import { type EnvironmentConfig } from './environment.interface';

const ENV_SCHEMA_VALIDATION: ObjectSchema<EnvironmentConfig> = Joi.object({
  ROOT_EMAIL: Joi.string().required(),
  ROOT_PASSWORD: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(27017),
  DB_PASSWORD: Joi.string().required(),
  DB_USERNAME: Joi.string().default('root'),
  DB_NAME: Joi.string().default('tunnel_dev'),
});

export default ENV_SCHEMA_VALIDATION;

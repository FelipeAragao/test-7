import { ConfigService } from '@nestjs/config';

export const loggerFactory = (configService: ConfigService) => ({
  pinoHttp: {
    transport: {
      target: 'pino-pretty',
      options: {
        minimunLevel: configService.get<string>('logLevel'),
        colorizeObjects: true,
        levelFisrt: true,
        singleLine: true,
      },
    },
  },
});

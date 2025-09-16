import { Module, Global } from '@nestjs/common';
import { createClient } from 'redis';
import { redisConfig } from '../config';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          url: `redis://${redisConfig.host}:${redisConfig.port}`,
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
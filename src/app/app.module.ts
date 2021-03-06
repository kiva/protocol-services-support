import { Module } from '@nestjs/common';
import { ConfigModule, ProtocolLoggerModule } from 'protocol-common';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
import { StatsModule } from '../stats/stats.module.js';
// @ts-ignore: assertions are currently required when importing json
import data from '../config/env.json' assert { type: 'json'};

/**
 * Initializes the Nest application
 * Note we don't use the logging interceptor since graphql handles requests differently
 */
@Module({
    imports: [
        ConfigModule.init(data),
        ProtocolLoggerModule,
        StatsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule {}

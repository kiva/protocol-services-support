import { Module } from '@nestjs/common';
import { ConfigModule } from 'protocol-common/config.module';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
import data from '../config/env.json';
import { StatsModule } from '../stats/stats.module.js';

/**
 * Initializes the Nest application
 * Note we don't use the logging interceptor since graphql handles requests differently
 */
@Module({
    imports: [
        ConfigModule.init(data),
        StatsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule {}

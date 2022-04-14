import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { AppController } from '../app/app.controller';

@Module({
    imports: [],
    controllers: [StatsController, AppController],
    providers: [StatsService],
})
export class StatsModule {}

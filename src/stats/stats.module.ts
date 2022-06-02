import { Module, HttpModule } from '@nestjs/common';
import { ProtocolHttpModule } from "protocol-common";
import { StatsController } from './stats.controller.js';
import { StatsService } from './stats.service.js';
import { AppController } from '../app/app.controller.js';

@Module({
    imports: [HttpModule, ProtocolHttpModule],
    controllers: [StatsController, AppController],
    providers: [StatsService],
})
export class StatsModule {}

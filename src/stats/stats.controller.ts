import { DisableAutoLogging } from 'protocol-common/disable.auto.logging.decorator';
import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@DisableAutoLogging()
@Controller('v2/stats')
export class StatsController {

    constructor(private readonly statsService: StatsService) {
    }

    @Get('report')
    public async report() {
        return await this.statsService.generateReport();
    }
}

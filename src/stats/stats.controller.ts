import { Controller, Get } from '@nestjs/common';
import { DisableAutoLogging } from 'protocol-common';
import { StatsService } from './stats.service.js';
import { SummaryReportDto } from './dtos/summary.report.dto.js';

@DisableAutoLogging()
@Controller('v2/stats')
export class StatsController {

    constructor(private readonly statsService: StatsService) {
    }

    @Get('report')
    public async report() : Promise<SummaryReportDto> {
        return await this.statsService.generateReport();
    }
}

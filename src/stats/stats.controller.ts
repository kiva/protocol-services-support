import { DisableAutoLogging } from 'protocol-common/disable.auto.logging.decorator';
import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { SummaryReportDto } from './dtos/summary.report.dto';

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

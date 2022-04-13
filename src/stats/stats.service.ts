import { Injectable } from '@nestjs/common';
import { SummaryReportDto } from './dtos/summary.report.dto';

@Injectable()
export class StatsService {

    public async generateReport(): Promise<SummaryReportDto> {
        return Promise.resolve(undefined);
    }
}

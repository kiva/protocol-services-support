import { Injectable } from '@nestjs/common';
import { SummaryReportDto } from './dtos/summary.report.dto';
import { Logger } from 'protocol-common/logger';
import { ServiceReportDto } from './dtos/service.report.dto';

@Injectable()
export class StatsService {

    public async generateReport(): Promise<SummaryReportDto> {

        Logger.info(`System statistics report generated`);

        let report: SummaryReportDto = new SummaryReportDto();

        report.reportDate = Date.now().toLocaleString();
        report.reportingServices.push(this.getThisService());

        return Promise.resolve(report);
    }

    private getThisService(): ServiceReportDto {
        const thisService = new ServiceReportDto();
        thisService.serviceName = process.env.SERVICE_NAME
        // TODO: finish
        return thisService;
    }
}

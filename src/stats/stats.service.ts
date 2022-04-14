import { Injectable } from '@nestjs/common';
import { SummaryReportDto } from './dtos/summary.report.dto';
import { Logger } from 'protocol-common/logger';
import { ServiceReportDto } from './dtos/service.report.dto';
import { AppService } from '../app/app.service';
import { hosts } from '../config/services.json';


@Injectable()
export class StatsService {

    public async generateReport(): Promise<SummaryReportDto> {

        Logger.info(`System statistics report generated`);

        let report: SummaryReportDto = new SummaryReportDto();

        report.reportDate = new Date().toDateString();
        report.reportingServices.push(this.getThisServiceReport());

        for(const serviceName of hosts)  {
            try {
                // for performance it might be nice to not wait for each service
                // and let each one reply syncronously
                const details = await this.getServiceReport(serviceName);
                Logger.log(`query ${serviceName}`, details);
                report.reportingServices.push(details);
            } catch {
                report.failedServices.push(serviceName);
            }
        }

        return Promise.resolve(report);
    }

    private getThisServiceReport(): ServiceReportDto {
        const service = new ServiceReportDto();
        service.serviceName = process.env.SERVICE_NAME
        service.startedAt = AppService.getStartDate().toDateString();
        service.currentTime = new Date().toDateString();
        // TODO: finish
        return service;
    }

    private async getServiceReport(serviceName: string): Promise<ServiceReportDto> {
        // todo: make the call to
        // http://serviceNamae/stats
        return Promise.resolve( new ServiceReportDto() );
    }
}

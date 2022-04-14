import { HttpService, Injectable } from '@nestjs/common';
import { ProtocolHttpService } from 'protocol-common/protocol.http.service';
import { Logger } from 'protocol-common/logger';
import { SummaryReportDto } from './dtos/summary.report.dto';
import { ServiceReportDto } from './dtos/service.report.dto';
import { AppService } from '../app/app.service';
import { hosts } from '../config/services.json';


@Injectable()
export class StatsService {
    private readonly http: ProtocolHttpService;

    constructor(httpService: HttpService) {
        this.http = new ProtocolHttpService(httpService);
    }

    public async generateReport(): Promise<SummaryReportDto> {

        Logger.info(`System statistics report generated`);

        const report: SummaryReportDto = new SummaryReportDto();
        report.reportDate = new Date().toDateString();
        report.reportingServices.push(this.getThisServiceReport());

        for(const serviceName of hosts)  {
            try {
                // for performance it might be nice to not wait for each service
                // and let each one reply syncronously
                const details: ServiceReportDto = await this.getServiceReport(serviceName);
                Logger.log(`query ${serviceName} returned`, details);
                report.reportingServices.push(details);
            } catch(e) {
                Logger.error(`${serviceName} failed to provide stats. ${e.message}`, e);
                // any error indicates the service was not functional
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
        const url = `http://${serviceName}/stats`;
        const req: any = {
            method: 'GET',
            url,
        };
        const res = await this.http.requestWithRetry(req);
        Logger.info(`${serviceName} returned `, res.data);
        return Promise.resolve( req.data );
    }
}

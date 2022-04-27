import { HttpService, Injectable } from '@nestjs/common';
import { Constants } from 'protocol-common/constants';
import { ProtocolHttpService } from 'protocol-common/protocol.http.service';
import { Logger } from 'protocol-common/logger';
import { SummaryReportDto } from './dtos/summary.report.dto';
import { ServiceReportDto } from './dtos/service.report.dto';
import { AppService } from '../app/app.service';
import servicesData from '../config/services.json';


@Injectable()
export class StatsService {
    private readonly http: ProtocolHttpService;

    constructor(httpService: HttpService) {
        this.http = new ProtocolHttpService(httpService);
    }

    public async generateReport(): Promise<SummaryReportDto> {

        Logger.info('System statistics report generated');

        const report: SummaryReportDto = new SummaryReportDto();
        report.reportDate = new Date().toDateString();
        report.reportingServices.push(this.getThisServiceReport());

        const hosts : any = this.getHosts();
        for(const serviceName of hosts)  {
            try {
                // for performance it might be nice to not wait for each service
                // and let each one reply synchronously
                const details: ServiceReportDto = await this.getServiceReport(serviceName);
                Logger.log(`query ${serviceName as string} returned`, details);
                report.reportingServices.push(details);
            } catch(e) {
                Logger.error(`${serviceName as string} failed to provide stats. ${e.message as string}`, e);
                // any error indicates the service was not functional
                report.failedServices.push(serviceName);
            }
        }

        return Promise.resolve(report);
    }

    private getHosts(): any {
        let dataSet : any;
        switch (process.env.NODE_ENV) {
            case Constants.PROD:
                dataSet = {...servicesData.prod};
                break;
            case Constants.SAND:
                dataSet = {...servicesData.sand};
                break;
            case Constants.QA:
                dataSet = {...servicesData.qa};
                break;
            case Constants.DEV:
                dataSet = {...servicesData.dev};
                break;
            case Constants.LOCAL:
                dataSet = {...servicesData.local};
                break;
            default:
                throw new Error(`NODE_ENV ${process.env.NODE_ENV} is not a valid value`);
        }

        return dataSet.hosts;
    }

    private getThisServiceReport(): ServiceReportDto {
        const service = new ServiceReportDto();
        service.serviceName = process.env.SERVICE_NAME;
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
        const result = await this.http.requestWithRetry(req);
        Logger.info(`${serviceName} returned `, result.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Promise.resolve( result.data );
    }
}

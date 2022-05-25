import { Injectable, Logger } from '@nestjs/common';
import { Constants, ProtocolHttpService } from 'protocol-common';
import { SummaryReportDto } from './dtos/summary.report.dto.js';
import { ServiceReportDto } from './dtos/service.report.dto.js';
import { AppService } from '../app/app.service.js';
// @ts-ignore: assertions are currently required when importing json
import servicesData from '../config/services.json' assert { type: 'json'};


@Injectable()
export class StatsService {
    constructor(readonly http: ProtocolHttpService) {
    }

    public async generateReport(): Promise<SummaryReportDto> {
        Logger.log('System statistics report generated');

        const report: SummaryReportDto = new SummaryReportDto();
        report.reportDate = new Date().toDateString();
        report.reportingServices.push(this.getThisServiceReport());

        const hosts : any = this.getHosts();
        for(const serviceName of hosts)  {
            try {
                // for performance it might be nice to not wait for each service
                // and let each one reply synchronously
                const details: ServiceReportDto = await this.getServiceReport(serviceName);
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
        Logger.log(`${serviceName} returned `, result.data);
        return Promise.resolve( result.data );
    }
}

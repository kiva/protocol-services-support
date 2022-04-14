import { ServiceReportDto } from './service.report.dto';

export class SummaryReportDto {
    reportDate: string;
    reportingServices: ServiceReportDto[] = [];
    failedServices: string[] = [];
}

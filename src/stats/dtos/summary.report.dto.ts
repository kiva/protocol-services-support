import { ServiceReportDto } from './service.report.dto';
import { IsArray, IsString } from 'class-validator';

export class SummaryReportDto {
    @IsString() reportDate: string;
    @IsArray() reportingServices: ServiceReportDto[] = [];
    @IsArray() failedServices: string[] = [];
}

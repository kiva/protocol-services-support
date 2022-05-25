import { IsArray, IsString } from 'class-validator';
import { ServiceReportDto } from './service.report.dto.js';

export class SummaryReportDto {
    @IsString() reportDate: string;
    @IsArray() reportingServices: ServiceReportDto[] = [];
    @IsArray() failedServices: string[] = [];
}

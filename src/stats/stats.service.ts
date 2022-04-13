import { Injectable } from '@nestjs/common';

@Injectable()
export class StatsService {

    public async generateReport(): Promise<any> {
        return Promise.resolve();
    }
}

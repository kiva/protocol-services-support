import { Injectable, INestApplication } from '@nestjs/common';
import bodyParser from 'body-parser';
import { traceware, HttpConstants, ProtocolExceptionFilter, ProtocolLogger } from 'protocol-common';

/**
 * Sets up global functionality
 * Note we don't use protocol exception filter because Graphql handles errors in it's own unique well
 * And we don't use swagger since Graphql provides it's own documentation
 */
@Injectable()
export class AppService {

    private static startedAt: Date;
    /**
     * Sets up app in a way that can be used by main.ts and e2e tests
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    public static async setup(app: INestApplication): Promise<void> {
        app.useLogger(app.get(ProtocolLogger));
        app.use(traceware(process.env.SERVICE_NAME));
        app.useGlobalFilters(new ProtocolExceptionFilter());

        // Increase json parse size to handle encoded images
        app.use(bodyParser.json({ limit: HttpConstants.JSON_LIMIT }));

        AppService.startedAt = new Date();
    }

    public static getStartDate(): Date {
        return AppService.startedAt;
    }
}

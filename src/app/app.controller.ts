import { Get, Controller } from '@nestjs/common';
import { HttpConstants } from 'protocol-common/http-context/http.constants';
import { DisableAutoLogging } from 'protocol-common/disable.auto.logging.decorator';

/**
 * Base route is just for various health check endpoints
 */
@DisableAutoLogging()
@Controller()
export class AppController {

    @Get()
    base(): string {
        return process.env.SERVICE_NAME;
    }

    // keeping this here for conformity but we are likely to remove this at some ppint
    @Get('ping')
    ping(): string {
        return HttpConstants.PING_RESPONSE;
    }

    // keeping this here for conformity but we are likely to remove this at some ppint
    @Get('healthz')
    healthz(): string {
        return HttpConstants.HEALTHZ_RESPONSE;
    }
}

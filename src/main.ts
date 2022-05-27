import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module.js';
import { AppService } from './app/app.service.js';

const bootstrap = async () => {
    const port = process.env.PORT;
    const app = await NestFactory.create(AppModule);

    await AppService.setup(app);
    await app.listen(port);
    Logger.log(`Server started on ${port}`);
};

bootstrap().catch(e => {
    Logger.error(e.message);
});

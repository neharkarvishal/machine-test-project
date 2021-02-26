import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const PORT = 3000

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })

    app.enableCors({ origin: '*' })
    app.enableShutdownHooks()
    app.setGlobalPrefix('api')

    /** ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data */
    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false,
            transform: true,
            whitelist: true,
            forbidUnknownValues: true,
            forbidNonWhitelisted: true,
        }),
    )

    /** Swagger AutoDocGen */
    SwaggerModule.setup(
        '/docs',
        app,
        SwaggerModule.createDocument(
            app,
            new DocumentBuilder()
                .setTitle('Machine-test-project')
                .setDescription('Machine-test-project API')
                .build(),
            {
                deepScanRoutes: true,
            },
        ),
    )

    await app.listen(PORT)
}

bootstrap()
    .then(() => {
        console.log(`Application is running on http://localhost:${PORT}/api,`)
        console.log(`Swaggerdocs is running on http://localhost:${PORT}/docs,`)
    })
    .catch(console.error)

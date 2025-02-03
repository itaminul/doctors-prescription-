import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { AllExceptionsFilter } from './filters/exception.filter';
import * as fs from 'fs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Global validation pipe with detailed error messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const formatErrors = (errors) => {
          return errors.map((error) => {
            const constraints = Object.values(error.constraints || {});
            const nestedErrors =
              error.children && error.children.length > 0
                ? formatErrors(error.children)
                : [];

            return {
              field: error.property,
              errors: constraints.concat(...nestedErrors),
            };
          });
        };

        const errors = formatErrors(validationErrors);

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: errors,
        });
      },
    }),
  );

  // Global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());
  // Apply the global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  // Global prefix for all routes
  app.setGlobalPrefix('/api');

  // app.enableCors({
  //   origin: 'http://163.47.146.233:4016',
  //   credentials: true
  // });

  // Add a wildcard route for undefined URLs
  // app.getHttpAdapter().get('*', (req, res) => {
  //   res.status(404).json({
  //     statusCode: 404,
  //     message: `Route ${req.method} ${req.url} not found`,
  //   });
  // });

  app.enableCors();
  await app.listen(4017);
}
bootstrap();

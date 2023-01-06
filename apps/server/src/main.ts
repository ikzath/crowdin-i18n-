import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO Configure apollo for helmet
  // app.use(helmet());
  app.enableCors();
  // Terminate MikroORM connection on app shutdown
  app.enableShutdownHooks();

  // Documentation
  const config = new DocumentBuilder()
    .setTitle('Lawlift API 1.0')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('auth', 'Authentication Endpoints')
    .addTag('templates')
    .addTag('users')
    .addServer('http://localhost:4000')
    .setExternalDoc('Postman Collection', 'localhost:4000/api/v1-json')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT);
}
bootstrap();

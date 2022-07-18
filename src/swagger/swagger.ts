import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export function createdocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .addTag(SWAGGER_CONFIG.tags[0])
    // .addBearerAuth({ type: 'http', in: 'header', name: 'Authorization' });
    .addBearerAuth();
  for (const tag of SWAGGER_CONFIG.tags) {
    builder.addTag(tag);
  }
  const document = builder.build();
  return SwaggerModule.createDocument(app, document);
}

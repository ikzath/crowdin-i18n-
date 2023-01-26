import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { TemplatesModule } from './templates/templates.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import GraphQLJSON from 'graphql-type-json';
import { join } from 'path';
import { TenantsModule } from './tenants/tenants.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { MembersModule } from './members/members.module';

const Throttler = ThrottlerModule.forRoot({
  // ttl: 60,
  // limit: 1,
});

const MikroORM = MikroOrmModule.forRoot({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  clientUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  // 'mongodb+srv://lawlift:FnRr9UIeNOBoeavi@cluster0.2gejh.mongodb.net/?retryWrites=true&w=majority',
  type: 'mongo',
  ensureIndexes: true,
  dbName: process.env.MONGO_NAME || 'lawlift',
  metadataProvider: TsMorphMetadataProvider,
});

const GraphQL = GraphQLModule.forRoot({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  // autoSchemaFile: true,
  sortSchema: true,
  resolvers: { JSON: GraphQLJSON },
});
@Module({
  imports: [
    Throttler,
    MikroORM,
    GraphQL,
    UsersModule,
    TemplatesModule,
    AuthModule,
    TenantsModule,
    WorkspacesModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}

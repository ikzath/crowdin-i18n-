import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MailerModule } from '@nestjs-modules/mailer';
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
import { EmailModule } from './email/email.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerService } from './mailer/mailer.service';
import { IntegrationModule } from './integration/integration.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { DbTestModule } from './db-test/db-test.module';

const Throttler = ThrottlerModule.forRoot({
  // ttl: 60,
  // limit: 1,
});

const MikroORM = MikroOrmModule.forRoot();

const GraphQL = GraphQLModule.forRoot({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  // autoSchemaFile: true,
  sortSchema: true,
  resolvers: { JSON: GraphQLJSON },
  // debug: false,
  // formatError: (error: GraphQLError) => {
  //   const graphQLFormattedError: GraphQLFormattedError = {
  //     message: error?.message,
  //   };
  //   return graphQLFormattedError;
  // },
});

const Mailer = MailerModule.forRoot({
  transport: {
    host: 'smtp.sendgrid.net',
    auth: {
      user: 'apikey',
      pass: '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',
    },
  },
  template: {
    dir: join(__dirname, 'mails'),
    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
  },
});
@Module({
  imports: [
    Throttler,
    MikroORM,
    GraphQL,
    Mailer,
    UsersModule,
    TemplatesModule,
    AuthModule,
    TenantsModule,
    WorkspacesModule,
    MembersModule,
    EmailModule,
    MailerModule,
    IntegrationModule,
    DbTestModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
  // providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}

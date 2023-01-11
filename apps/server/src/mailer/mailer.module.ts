import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  providers: [MailerService],
})
export class MailerModule {}

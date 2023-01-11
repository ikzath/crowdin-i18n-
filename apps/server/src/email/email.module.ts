import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  providers: [EmailService, MailerService],
  controllers: [EmailController],
})
export class EmailModule {}

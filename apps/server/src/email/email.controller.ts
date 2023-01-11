// import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('email')
export class EmailController {
  constructor(private mailerService: MailerService) {}

  @Get('test')
  findAll(): string {
    return this.mailerService.findAll();
  }

  @Get('send-email')
  async sendMail(): Promise<string> {
    return this.mailerService.sendMail();
  }

  // constructor(private mailService: MailerService) {}

  // @Get('plain-text-email')
  // async sendPlainTextEmail(@Query('toemail') toemail) {
  //   await this.mailService.sendMail({
  //     to: toemail,
  //     from: 'ikzathcash@gmail.com',
  //     subject: 'Testing Nest MailerModule',
  //     text: 'welcome to nest-modules',
  //   });
  //   return 'Email sent';
  // }

  // @Post('html-email')
  // async postHtmlEmail(@Body() payload) {
  //   await this.mailService.sendMail({
  //     to: payload.toemail,
  //     from: 'ikzathcash@gmail.com',
  //     subject: 'Testing Nest MailerModule',
  //     template: 'email-template',
  //     context: {
  //       mailer: payload,
  //     },
  //   });
  //   return 'Email sent with name';
  // }
}

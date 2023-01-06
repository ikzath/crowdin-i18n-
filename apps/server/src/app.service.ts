import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  version(): string {
    return '0.1';
  }
}

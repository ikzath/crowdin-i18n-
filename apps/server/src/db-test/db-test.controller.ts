import { Controller, Get } from '@nestjs/common';
import { DbTestService } from './db-test.service';

@Controller('db-test')
export class DbTestController {
  constructor(private readonly dbTestService: DbTestService) {}

  // private readonly logger = new Logger('WorkspacesService');
  @Get('fillDB')
  fillDB(): Promise<void> {
    return this.dbTestService.populateTable();
  }

  @Get('findOne')
  findOneById(): Promise<object> {
    return this.dbTestService.findOneById();
  }

  @Get('ben')
  async findBenGunn(): Promise<object> {
    return this.dbTestService.findBenGunn();
  }

  @Get('update')
  async updateBenSurname(): Promise<void> {
    return this.dbTestService.updateBenSurname();
  }
}

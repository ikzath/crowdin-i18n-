import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth-guard';

@Controller('auth')
// @ApiBody({ type: LoginUserBody })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  // @ApiBody({ type: CreateUserDto })
  @ApiTags('auth')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  // @Post('signup')
  // @ApiTags('auth')
  // async signup(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.register(...createUserDto);
  // }
}

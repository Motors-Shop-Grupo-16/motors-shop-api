import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { ILogin } from './interfaces/ILogin';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async create(@Body() data: ILogin) {
    const token = await this.loginService.login(data);
    return { token };
  }
}

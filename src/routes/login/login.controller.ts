import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login-dto';
import { Login, LoginResponse } from './entities/login.entity';
import { LoginService } from './login.service';
import { LoginError400 } from './entities/error-login.entity';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: Login })
  @ApiResponse({
    status: 400,
    type: LoginError400,
  })
  async create(@Body() data: LoginDTO): Promise<LoginResponse> {
    const token = await this.loginService.login(data);
    return { token };
  }
}

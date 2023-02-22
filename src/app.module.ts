import { Module } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { LoginModule } from './routes/login/login.module';

@Module({
  imports: [UsersModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

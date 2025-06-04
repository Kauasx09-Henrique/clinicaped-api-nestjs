import { Module } from '@nestjs/common';
import { LoginUserService } from './login_user.service';
import { LoginUserController } from './login_user.controller';
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [UsersModule],  
  controllers: [LoginUserController],
  providers: [LoginUserService],
})
export class LoginUserModule {}

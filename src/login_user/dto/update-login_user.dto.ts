import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './create-login_user.dto';

export class UpdateLoginUserDto extends PartialType(LoginUserDto) {}

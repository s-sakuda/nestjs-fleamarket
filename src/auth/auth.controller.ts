import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { CredentialsDTO } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() CreateUserDTO: CreateUserDTO): Promise<User> {
    return await this.authService.createUser(CreateUserDTO);
  }

  @Post('signin')
  async signIn(
    @Body() credentialsDTO: CredentialsDTO,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentialsDTO);
  }
}

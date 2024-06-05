// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // API 1: POST /user/register:
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return await this.userService.register(createUserDto);
  }

  // API 2: GET /user/verify-email/{username}/{verificationToken}
  @Get('verify-email/:username/:verificationToken')
  async verifyEmail(@Param('username') username: string, @Param('verificationToken') verificationToken: string): Promise<string> {
    const user = await this.userService.findByUsername(username);
    if (user.verificationToken !== verificationToken) { 
      throw new BadRequestException('Invalid verification token');
    }
    await this.userService.verifyEmail(username);
    return "Email verified successfully";
  }

  // API 3: GET /user/check-verification/{username}:
  @Get('check-verification/:username')
  async checkVerification(@Param('username') username: string): Promise<string> {
    const user = await this.userService.findByUsername(username);
    return user.isVerified ? 'User is verified' : 'User is not verified';
  }
}

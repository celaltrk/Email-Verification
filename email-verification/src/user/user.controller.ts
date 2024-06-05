// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.register(createUserDto);
  }

  // Verification of email using the verification token
  @Get('verify-email/:username/:verificationToken')
  async verifyEmail(@Param('username') username: string, @Param('verificationToken') verificationToken: string): Promise<string> {
    const isVerified = await this.userService.verifyEmail(username, verificationToken);
    if (!isVerified) {
      throw new BadRequestException('Invalid verification token');
    }
    return 'Email successfully verified';
  }

  // Check if the user is verified
  @Get('check-verification/:username')
  async checkVerification(@Param('username') username: string): Promise<string> {
    const isVerified = await this.userService.checkVerification(username);
    if (!isVerified) {
      return 'User is not verified';
    }
    return 'User is verified';
  }
}

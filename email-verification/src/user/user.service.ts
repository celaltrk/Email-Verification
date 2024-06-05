// src/user/user.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from '../mail/mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  // Register a new user (do not register if user already exists)
  async register(createUserDto: CreateUserDto): Promise<boolean> {
    const verificationToken = randomBytes(20).toString('hex');
    const user = this.userRepository.create({
      ...createUserDto,
      verificationToken,
      isVerified: false,
    });
    if (await this.userRepository.findOne({ where: { email: user.email} }) || await this.userRepository.findOne({ where: { username: user.username} })) {
      throw new BadRequestException('Username or email is already in use');
    }
    await this.userRepository.save(user);
    await this.mailService.sendVerificationEmail(user.email, user.username, verificationToken);
    return true;
  }

  // Verify email of a user
  async verifyEmail(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isVerified) {
      throw new BadRequestException('User is already verified');
    }
    user.isVerified = true;
    await this.userRepository.save(user);
    return true;
  }

  // Find user by username
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

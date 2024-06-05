// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
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
    private usersRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<void> {
    const verificationToken = randomBytes(20).toString('hex');
    const user = this.usersRepository.create({
      ...createUserDto,
      verificationToken,
      isVerified: false,
    });
    await this.usersRepository.save(user);
    await this.mailService.sendVerificationEmail(user.email, user.username, verificationToken);
  }

  // Verification of email using the verification token
  async verifyEmail(username: string, verificationToken: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user || user.verificationToken !== verificationToken) {
      return false;
    }
    user.isVerified = true;
    await this.usersRepository.save(user);
    return true;
  }

  // Check if the user is verified
  async checkVerification(username: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      return false;
    }
    return user.isVerified;
  }
}

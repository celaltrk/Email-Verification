// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });
  }

  // Send a verification email to the user
  async sendVerificationEmail(email: string, username: string, verificationToken: string): Promise<void> {
    const url = `http://localhost:3000/user/verify-email/${username}/${verificationToken}`;
    await this.transporter.sendMail({
      from: this.configService.get<string>('GMAIL_USER'),
      to: email,
      subject: 'Email Verification',
      text: `Click this link to verify your email: ${url}`,
    });
  }
}

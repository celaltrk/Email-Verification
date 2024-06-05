import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from '../mail/mail.service';
export declare class UserService {
    private usersRepository;
    private mailService;
    constructor(usersRepository: Repository<User>, mailService: MailService);
    register(createUserDto: CreateUserDto): Promise<void>;
    verifyEmail(username: string, verificationToken: string): Promise<boolean>;
    checkVerification(username: string): Promise<boolean>;
}

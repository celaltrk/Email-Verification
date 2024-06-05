import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from '../mail/mail.service';
export declare class UserService {
    private userRepository;
    private mailService;
    constructor(userRepository: Repository<User>, mailService: MailService);
    register(createUserDto: CreateUserDto): Promise<boolean>;
    verifyEmail(username: string): Promise<boolean>;
    findByUsername(username: string): Promise<User>;
}

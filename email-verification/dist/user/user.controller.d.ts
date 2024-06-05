import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<boolean>;
    verifyEmail(username: string, verificationToken: string): Promise<string>;
    checkVerification(username: string): Promise<string>;
}

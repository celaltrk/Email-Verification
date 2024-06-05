"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const mail_service_1 = require("../mail/mail.service");
const crypto_1 = require("crypto");
let UserService = class UserService {
    constructor(userRepository, mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }
    async register(createUserDto) {
        const verificationToken = (0, crypto_1.randomBytes)(20).toString('hex');
        const user = this.userRepository.create({
            ...createUserDto,
            verificationToken,
            isVerified: false,
        });
        if (await this.userRepository.findOne({ where: { email: user.email } }) || await this.userRepository.findOne({ where: { username: user.username } })) {
            throw new common_1.BadRequestException('Username or email is already in use');
        }
        await this.userRepository.save(user);
        await this.mailService.sendVerificationEmail(user.email, user.username, verificationToken);
        return true;
    }
    async verifyEmail(username) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('User is already verified');
        }
        user.isVerified = true;
        await this.userRepository.save(user);
        return true;
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map
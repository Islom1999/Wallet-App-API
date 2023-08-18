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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, prismaService) {
        this.jwtService = jwtService;
        this.prismaService = prismaService;
    }
    async register(register) {
        let user = await this.prismaService.user.findUnique({ where: { email: register.email } });
        if (user) {
            throw new common_1.HttpException('User oldindan yaratilgan boshqa email kiriting', common_1.HttpStatus.BAD_REQUEST);
        }
        const password = await bcrypt.hash(register.password, 10);
        const data = {
            fullName: register.fullName,
            email: register.email,
            password,
        };
        const newUser = await this.prismaService.user.create({ data });
        const wallet = await this.prismaService.wallet.create({ data: { userId: newUser.id } });
        const token = await this.generateToken({ name: register.fullName, email: register.email });
        user = await this.prismaService.user.update({ data: { token }, where: { email: register.email } });
        user.password = undefined;
        return { code: 201, message: "User ro'yhatdan o'tdi", data: user };
    }
    async login(loginDto) {
        let user = await this.prismaService.user.findUnique({ where: { email: loginDto.email } });
        if (!user) {
            throw new common_1.HttpException('User topilmadi', common_1.HttpStatus.NOT_FOUND);
        }
        const valid = await bcrypt.compare(loginDto.password, user.password);
        if (!valid) {
            throw new common_1.HttpException('Parol xato', common_1.HttpStatus.BAD_REQUEST);
        }
        const token = await this.generateToken({ name: user.fullName, email: user.email });
        user = await this.prismaService.user.update({ data: { token }, where: { email: loginDto.email } });
        user.password = undefined;
        return { code: 201, message: "User tizimga kirdi", data: user };
    }
    async logout(userId) {
        await this.prismaService.user.updateMany({
            where: {
                id: userId,
                token: {
                    not: null,
                },
            },
            data: {
                token: null,
            },
        });
        return { code: 204, message: "Tizimdan chiqildi", };
    }
    async getProfile(userId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                email: true,
                token: true,
            }
        });
        return { code: 200, data: user, message: 'Profile malumotlari berildi' };
    }
    async updateProfileFullname(userId, updateDto) {
        const { fullName } = updateDto;
        const user = await this.prismaService.user.update({
            where: { id: userId },
            data: { fullName }
        });
        return { code: 200, data: user, message: "Ism familiya yangilandi", };
    }
    async updateProfilePassword(userId, updateDto) {
        const { password, newPassword } = updateDto;
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new common_1.HttpException('Eski paroliz xato', common_1.HttpStatus.BAD_REQUEST);
        }
        const token = await this.generateToken({ name: user.fullName, email: user.email });
        const passwordHash = await bcrypt.hash(newPassword, 10);
        const uptadeUser = await this.prismaService.user.update({ data: { token, password: passwordHash }, where: { email: user.email } });
        user.password = undefined;
        return { code: 200, data: uptadeUser, message: "Parol yangilandi" };
    }
    async generateToken(user) {
        return this.jwtService.sign(user);
    }
    async validateUser(payload) {
        const user = this.prismaService.user.findUnique({ where: { email: payload.email } });
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
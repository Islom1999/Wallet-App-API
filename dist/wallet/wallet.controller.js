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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const transaction_dto_1 = require("./dto/transaction.dto");
const transactionQuery_dto_1 = require("./dto/transactionQuery.dto");
const passport_1 = require("@nestjs/passport");
const get_userId_1 = require("../decorators/get.userId");
const categoryQuery_dto_1 = require("./dto/categoryQuery.dto");
const category_dto_1 = require("./dto/category.dto");
const swagger_1 = require("@nestjs/swagger");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async getAllTransactionCategory(categoryQueryDto) {
        const category = await this.walletService.getAllTransactionCategory(categoryQueryDto);
        return category;
    }
    async getAllTransaction(query, userId) {
        const kirim = await this.walletService.getAllTransaction(query, userId);
        return kirim;
    }
    async createTransaction(transactionDto, userId) {
        return await this.walletService.createTransaction(transactionDto, userId);
    }
    async deleteTransaction(id, userId) {
        return await this.walletService.deleteTransaction(id, userId);
    }
    async createTransactionCategory(categoryDto) {
        return await this.walletService.createTransactionCategory(categoryDto);
    }
    async updateTransactionCategory(categoryDto, id) {
        return await this.walletService.updateTransactionCategory(categoryDto, id);
    }
    async deleteTransactionCategory(id) {
        return await this.walletService.deleteTransactionCategory(id);
    }
};
__decorate([
    (0, swagger_1.ApiTags)("Wallet service"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('/transaction/category'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categoryQuery_dto_1.CategoryQueryDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getAllTransactionCategory", null);
__decorate([
    (0, swagger_1.ApiTags)("Wallet service"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('/transaction'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_userId_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionQuery_dto_1.QueryDto, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getAllTransaction", null);
__decorate([
    (0, swagger_1.ApiTags)("Wallet service"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/transaction/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_userId_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_dto_1.TransactionDto, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createTransaction", null);
__decorate([
    (0, swagger_1.ApiTags)("Wallet service"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('/transaction/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_userId_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deleteTransaction", null);
__decorate([
    (0, swagger_1.ApiTags)("Admin service - buni app ga ulamaysiz"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/admin/transaction/category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createTransactionCategory", null);
__decorate([
    (0, swagger_1.ApiTags)("Admin service - buni app ga ulamaysiz"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('/admin/transaction/category/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryDto, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "updateTransactionCategory", null);
__decorate([
    (0, swagger_1.ApiTags)("Admin service - buni app ga ulamaysiz"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('/admin/transaction/category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deleteTransactionCategory", null);
WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map
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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const transactionQuery_dto_1 = require("./dto/transactionQuery.dto");
const runtime_1 = require("@prisma/client/runtime");
let WalletService = class WalletService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllTransactionCategory(categoryQueryDto) {
        const transactionType = categoryQueryDto.transactionType || undefined;
        const category = await this.prismaService.category.findMany({
            where: {
                type: transactionType
            }
        })
            .catch((error) => {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                throw new common_1.HttpException('Prisma Error', common_1.HttpStatus.NOT_MODIFIED);
            }
            throw error;
        });
        if (!category[0]) {
            throw new common_1.HttpException('Kategoriyalar topilmadi', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            code: 200,
            message: 'Kategoriyalar topildi',
            data: category
        };
    }
    async getAllTransaction(query, userId) {
        const dateStart = new Date(query.dateStart);
        const dateEnd = new Date(query.dateEnd);
        let kun = dateEnd.getDate() + 1;
        dateEnd.setDate(kun);
        let wallet = await this.prismaService.wallet.findUnique({ where: { userId: userId } });
        if (!wallet) {
            wallet = await this.prismaService.wallet.create({ data: { userId: userId } });
        }
        const transaction = await await this.prismaService.transaction.findMany({
            where: {
                createdAt: {
                    gte: dateStart,
                    lte: dateEnd,
                },
                walletId: wallet.id,
                type: query.transactionType ? query.transactionType : undefined,
                categoryId: query.categoryId ? +query.categoryId : undefined
            },
            include: {
                category: {
                    select: {
                        title: true,
                    },
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
        });
        if (Boolean(!transaction[0])) {
            throw new common_1.HttpException('transactionlar topilmadi', common_1.HttpStatus.NOT_FOUND);
        }
        let total = await this.prismaService.transaction.aggregate({
            where: {
                createdAt: {
                    gte: dateStart,
                    lte: dateEnd,
                },
                walletId: wallet.id,
                type: query.transactionType ? query.transactionType : undefined,
                categoryId: query.categoryId ? +query.categoryId : undefined
            },
            _sum: {
                amount: true,
            }
        });
        const totalData = { totalAmount: total._sum.amount };
        return { code: 200, message: "Barcha transactionlar", totalData, data: transaction };
    }
    async createTransaction(transactionDto, userId) {
        let wallet = await this.prismaService.wallet.findUnique({ where: { userId: userId } });
        if (!wallet) {
            wallet = await this.prismaService.wallet.create({ data: { userId: userId } });
        }
        const category = await this.prismaService.category.findUnique({
            where: { id: transactionDto.categoryId }
        });
        if (category.type !== transactionDto.type) {
            throw new common_1.HttpException('transaction type bilan category lar mos emas', common_1.HttpStatus.BAD_REQUEST);
        }
        const newtransaction = await this.prismaService.transaction.create({ data: Object.assign(Object.assign({}, transactionDto), { walletId: wallet.id }) });
        return {
            code: 201,
            message: 'transaction yaratildi',
            data: newtransaction
        };
    }
    async deleteTransaction(deleteId, userId) {
        deleteId = +deleteId;
        let wallet = await this.prismaService.wallet.findUnique({ where: { userId: userId } });
        if (!wallet) {
            wallet = await this.prismaService.wallet.create({ data: { userId: userId } });
        }
        const transaction = await this.prismaService.transaction.findUnique({ where: { id: deleteId } });
        if (!transaction) {
            throw new common_1.HttpException('transaction topilmadi', common_1.HttpStatus.NOT_FOUND);
        }
        if (transaction.walletId != wallet.id) {
            throw new common_1.HttpException('Bu transaction sizga tegishli emas uni o\'chira olmaysiz', common_1.HttpStatus.BAD_REQUEST);
        }
        const deletetransaction = await this.prismaService.transaction.delete({ where: { id: deleteId } });
        return {
            code: 200,
            message: 'transaction o\'chirildi',
            data: deletetransaction
        };
    }
    async createTransactionCategory(categoryDto) {
        const category = await this.prismaService.category.create({ data: Object.assign({}, categoryDto) });
        return {
            code: 201,
            message: 'transaction yaratildi',
            data: category
        };
    }
    async updateTransactionCategory(categoryDto, id) {
        const category = await this.prismaService.category.update({
            where: { id: +id },
            data: Object.assign({}, categoryDto)
        });
        return {
            code: 200,
            message: 'transaction o\'zgartirildi',
            data: category
        };
    }
    async deleteTransactionCategory(id) {
        const category = await this.prismaService.category.delete({
            where: { id: +id },
        });
        return {
            code: 200,
            message: 'transaction o\'chirildi',
            data: category
        };
    }
};
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionQuery_dto_1.QueryDto, Number]),
    __metadata("design:returntype", Promise)
], WalletService.prototype, "getAllTransaction", null);
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map
import { WalletService } from './wallet.service';
import { TransactionDto } from './dto/transaction.dto';
import { QueryDto } from './dto/transactionQuery.dto';
import { CategoryQueryDto } from './dto/categoryQuery.dto';
import { CategoryDto } from './dto/category.dto';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getAllTransactionCategory(categoryQueryDto: CategoryQueryDto): Promise<{
        code: number;
        message: string;
        data: ({
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").TransactionType;
        } & {})[];
    }>;
    getAllTransaction(query: QueryDto, userId: number): Promise<{
        code: number;
        message: string;
        totalData: {
            totalAmount: number;
        };
        data: ({
            category: {
                title: string;
            };
        } & {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").TransactionType;
            amount: number;
            walletId: number;
            categoryId: number;
            createdAt: Date;
        } & {})[];
    }>;
    createTransaction(transactionDto: TransactionDto, userId: number): Promise<{
        code: number;
        message: string;
        data: {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").TransactionType;
            amount: number;
            walletId: number;
            categoryId: number;
            createdAt: Date;
        } & {};
    }>;
    deleteTransaction(id: string, userId: number): Promise<{
        code: number;
        message: string;
        data: {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").TransactionType;
            amount: number;
            walletId: number;
            categoryId: number;
            createdAt: Date;
        } & {};
    }>;
    createTransactionCategory(categoryDto: CategoryDto): Promise<{
        code: number;
        message: string;
        data: {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").TransactionType;
        } & {};
    }>;
    updateTransactionCategory(categoryDto: CategoryDto, id: number | string): Promise<{
        code: number;
        message: string;
        data: {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").TransactionType;
        } & {};
    }>;
    deleteTransactionCategory(id: number | string): Promise<{
        code: number;
        message: string;
        data: {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").TransactionType;
        } & {};
    }>;
}

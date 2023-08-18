import { PrismaService } from 'src/prisma.service';
import { TransactionDto } from './dto/transaction.dto';
import { QueryDto } from './dto/transactionQuery.dto';
import { CategoryQueryDto } from './dto/categoryQuery.dto';
import { CategoryDto } from './dto/category.dto';
export declare class WalletService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllTransactionCategory(categoryQueryDto: CategoryQueryDto): Promise<{
        code: number;
        message: string;
        data: ({
            type: import(".prisma/client").TransactionType;
            description: string;
            title: string;
            id: number;
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
            type: import(".prisma/client").TransactionType;
            description: string;
            title: string;
            id: number;
            amount: number;
            categoryId: number;
            createdAt: Date;
            walletId: number;
        } & {})[];
    }>;
    createTransaction(transactionDto: TransactionDto, userId: number): Promise<{
        code: number;
        message: string;
        data: {
            type: import(".prisma/client").TransactionType;
            description: string;
            title: string;
            id: number;
            amount: number;
            categoryId: number;
            createdAt: Date;
            walletId: number;
        } & {};
    }>;
    deleteTransaction(deleteId: string | number, userId: number): Promise<{
        code: number;
        message: string;
        data: {
            type: import(".prisma/client").TransactionType;
            description: string;
            title: string;
            id: number;
            amount: number;
            categoryId: number;
            createdAt: Date;
            walletId: number;
        } & {};
    }>;
    createTransactionCategory(categoryDto: CategoryDto): Promise<{
        code: number;
        message: string;
        data: {
            type: import(".prisma/client").TransactionType;
            description: string;
            title: string;
            id: number;
        } & {};
    }>;
    updateTransactionCategory(categoryDto: CategoryDto, id: number | string): Promise<{
        code: number;
        message: string;
        data: {
            type: import(".prisma/client").TransactionType;
            description: string;
            title: string;
            id: number;
        } & {};
    }>;
    deleteTransactionCategory(id: number | string): Promise<{
        code: number;
        message: string;
        data: {
            type: import(".prisma/client").TransactionType;
            description: string;
            title: string;
            id: number;
        } & {};
    }>;
}

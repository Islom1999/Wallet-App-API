import { TransactionType } from "@prisma/client";
export declare class TransactionDto {
    title: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
}

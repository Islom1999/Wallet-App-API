import { TransactionType } from "@prisma/client";
export declare class QueryDto {
    dateStart: string;
    dateEnd: string;
    transactionType: TransactionType;
    categoryId: number;
}

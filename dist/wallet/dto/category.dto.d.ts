import { TransactionType } from "@prisma/client";
export declare class CategoryDto {
    title: string;
    description?: string;
    type: TransactionType;
}

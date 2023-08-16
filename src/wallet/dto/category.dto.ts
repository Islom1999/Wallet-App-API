import { TransactionType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsEnum(TransactionType)
    @IsNotEmpty()
    type: TransactionType
}
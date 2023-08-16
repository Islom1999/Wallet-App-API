import { TransactionType } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class TransactionDto{
    @IsString()
    @IsNotEmpty()
    title     : string

    @IsNumber()
    @IsNotEmpty()
    amount    : number

    @IsEnum(TransactionType)
    @IsNotEmpty()
    type : TransactionType

    @IsNumber()
    @IsNotEmpty()
    categoryId: number
}
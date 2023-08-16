import { TransactionType } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

export class QueryDto {
    @IsString()
    @IsNotEmpty()
    dateStart: string

    @IsString()
    @IsNotEmpty()
    dateEnd: string

    transactionType: TransactionType
    categoryId: number
}
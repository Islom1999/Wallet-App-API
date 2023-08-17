import { ApiProperty } from "@nestjs/swagger"
import { TransactionType } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

export class QueryDto {
    @ApiProperty({
        type: String,
        description: "date filter: boshlanish sana format - (DD-MM-YYYY)",
    })
    @IsString()
    @IsNotEmpty()
    dateStart: string

    @ApiProperty({
        type: String,
        description: "date filter: tugash sana format - (DD-MM-YYYY)",
    })
    @IsString()
    @IsNotEmpty()
    dateEnd: string

    @ApiProperty({
        type: String,
        description: "karigoriya turi, INCOME, EXPENSE - (kirim, chiqim)",
        required:false
    })
    transactionType: TransactionType
    categoryId: number
}
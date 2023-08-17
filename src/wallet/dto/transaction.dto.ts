import { ApiProperty } from "@nestjs/swagger"
import { TransactionType } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class TransactionDto{
    @ApiProperty({
        type: String,
        description: "transaktsiya nomi",
    })
    @IsString()
    @IsNotEmpty()
    title     : string

    @ApiProperty({
        type: String,
        description: "transaktsiya narxi",
    })
    @IsNumber()
    @IsNotEmpty()
    amount    : number

    @ApiProperty({
        type: String,
        description: "karigoriya turi, INCOME, EXPENSE - (kirim, chiqim)",
    })
    @IsEnum(TransactionType)
    @IsNotEmpty()
    type : TransactionType

    @ApiProperty({
        type: String,
        description: "transaktsiya qaysi categoriyaga tegishliligi, categoriya id raqami beriladi",
    })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number
}
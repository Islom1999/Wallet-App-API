import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {
    @ApiProperty({
        type: String,
        description: "kategoriya nomi",
      })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: String,
        description: "kategoriya haqida malumot",
        required: false
      })
    @IsString()
    @IsNotEmpty()
    description?: string;

    @ApiProperty({
        type: String,
        description: "karigoriya turi, INCOME, EXPENSE - (kirim, chiqim)",
    })
    @IsEnum(TransactionType)
    @IsNotEmpty()
    type: TransactionType
}
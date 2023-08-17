import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "@prisma/client";

export class CategoryQueryDto {
    @ApiProperty({
        type: String,
        description: "karigoriya turi, INCOME, EXPENSE - (kirim, chiqim)",
    })
    transactionType: TransactionType
}
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ChiqimDto{
    @IsString()
    @IsNotEmpty()
    title     : string

    @IsNumber()
    @IsNotEmpty()
    amount    : number

    @IsNumber()
    @IsNotEmpty()
    xarajatId : number
}
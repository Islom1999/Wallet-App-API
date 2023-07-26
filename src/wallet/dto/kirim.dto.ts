import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class KirimDto{
    @IsString()
    @IsNotEmpty()
    title     : string

    @IsNumber()
    @IsNotEmpty()
    amount    : number

    @IsNumber()
    @IsNotEmpty()
    tushumId  : number
}
import { Body, Controller, Post, Get, UseGuards, HttpException, HttpStatus, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { KirimDto } from './dto/kirim.dto';
import { ChiqimDto } from './dto/chiqim.dto';
import { QueryDto } from './dto/query.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { GetCurrentUserId } from 'src/decorators/get.userId';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get('/kirim/category')
  async getAllKirimCategory(){
    const category = await this.walletService.getAllKirimCategory();
    return category
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/chiqim/category')
  async getAllChiqimCategory(){
    const category = await this.walletService.getAllChiqimCategory();
    return category
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/kirim/')
  async getAllKirim(@Query() query: QueryDto, @GetCurrentUserId() userId: number ){
    const kirim = await this.walletService.getAllKirim(query, userId);
    return kirim
  }

  
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @Post('kirim/create')
  async createKirim(@Body() kirim: KirimDto, @GetCurrentUserId() userId: number) {
    return await this.walletService.createKirim(kirim, userId)
  }

  @UseGuards(AuthGuard('jwt')) 
  @Get('/chiqim/')
  async getAllChiqim(@Query() query: QueryDto, @GetCurrentUserId() userId: number ){
    const chiqim = await this.walletService.getAllChiqim(query, userId);
    if(!chiqim){
      throw new HttpException('Chiqimlar topilmadi', HttpStatus.NOT_FOUND);
    }
    return chiqim
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @Post('chiqim/create')
  async createChiqim(@Body() chiqim: ChiqimDto, @GetCurrentUserId() userId: number) {
    return await this.walletService.createChiqim(chiqim, userId)
  }
}

import { Body, Controller, Post, Get, UseGuards, HttpException, HttpStatus, UsePipes, ValidationPipe, Query, Delete, Param, Patch } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TransactionDto } from './dto/transaction.dto';
import { QueryDto } from './dto/transactionQuery.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { GetCurrentUserId } from 'src/decorators/get.userId';
import { CategoryQueryDto } from './dto/categoryQuery.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get('/transaction/category')
  async getAllTransactionCategory(@Query() categoryQueryDto: CategoryQueryDto){
    const category = await this.walletService.getAllTransactionCategory(categoryQueryDto);
    return category
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @Get('/transaction')
  async getAllTransaction(@Query() query: QueryDto, @GetCurrentUserId() userId: number ){
    const kirim = await this.walletService.getAllTransaction(query, userId);
    return kirim
  }

  
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @Post('/transaction/create')
  async createTransaction(@Body() transactionDto: TransactionDto, @GetCurrentUserId() userId: number) {
    return await this.walletService.createTransaction(transactionDto, userId)
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @Delete('/transaction/:id')
  async deleteTransaction(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number
  ) {
    return await this.walletService.deleteTransaction(id, userId)
  }

  // Admin Dashboard
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @Post('/admin/transaction/category')
  async createTransactionCategory(@Body() categoryDto: CategoryDto){
    return await this.walletService.createTransactionCategory(categoryDto); 
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @Patch('/admin/transaction/category/:id')
  async updateTransactionCategory(
    @Body() categoryDto: CategoryDto,
    @Param('id') id: number | string
  ){
    return await this.walletService.updateTransactionCategory(categoryDto, id);  
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/admin/transaction/category/:id')
  async deleteTransactionCategory(
    @Param('id') id: number | string
  ){
    return await this.walletService.deleteTransactionCategory( id);  
  }
}

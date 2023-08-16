import { Injectable, HttpException, HttpStatus, Query, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionDto } from './dto/transaction.dto';
import { QueryDto } from './dto/transactionQuery.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CategoryQueryDto } from './dto/categoryQuery.dto';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class WalletService {
    constructor(private prismaService: PrismaService) { }

    async getAllTransactionCategory(categoryQueryDto: CategoryQueryDto){
        try {
            const transactionType = categoryQueryDto.transactionType || undefined
            const category = await this.prismaService.category.findMany({
                where: {
                    type: transactionType
                }
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    throw new HttpException('Prisma Error', HttpStatus.NOT_MODIFIED);
                }
                throw error;
            });
    
            if(!category[0]){
                throw new HttpException('Kategoriyalar topilmadi', HttpStatus.NOT_FOUND);
              }
            return {
                code:200, 
                message: 'Kategoriyalar topildi',
                data: category
            }
        } catch (error) {
            throw new HttpException('serverda xatolik yoki yomon sorov', HttpStatus.GATEWAY_TIMEOUT )
        }
    }

    async getAllTransaction(@Query() query: QueryDto, userId: number){
        try {
            const dateStart = new Date(query.dateStart)
            const dateEnd = new Date(query.dateEnd)
    
            let kun = dateEnd.getDate() + 1
            dateEnd.setDate(kun)
    
            let wallet = await this.prismaService.wallet.findUnique({where: {userId: userId }})
            if(!wallet){
                wallet = await this.prismaService.wallet.create({data: {userId: userId}})
            }
    
            const transaction = await await this.prismaService.transaction.findMany({
                where: {
                    createdAt: {
                        gte: dateStart,
                        lte: dateEnd,
                    },
                    walletId: wallet.id,
                    type: query.transactionType ? query.transactionType : undefined,
                    categoryId: query.categoryId ? +query.categoryId : undefined
                },
                include: {
                    category: {
                        select: {
                            title: true,
                        },
                    }
                },
                orderBy: {
                    createdAt: 'desc'   // desc - bugungi birinchi chiqadi, asc - kechagi birinchi chiqadi
                },
            })
    
            if(Boolean(!transaction[0])){
                throw new HttpException('transactionlar topilmadi', HttpStatus.NOT_FOUND);
            }
    
            let total = await this.prismaService.transaction.aggregate({
                where: {
                    createdAt: {
                        gte: dateStart,
                        lte: dateEnd,
                    },
                    walletId: wallet.id,
                    type: query.transactionType ? query.transactionType : undefined,
                    categoryId: query.categoryId ? +query.categoryId : undefined
                },
                _sum: {
                    amount: true, 
                }
            })
    
            const totalData = {totalAmount: total._sum.amount}
    
            return {code:200, message: "Barcha transactionlar",totalData, data:transaction}
        } catch (error) {
            throw new HttpException('serverda xatolik yoki yomon sorov', HttpStatus.GATEWAY_TIMEOUT )
        }
    }

    async createTransaction(transactionDto: TransactionDto, userId: number) {
        try {
            let wallet = await this.prismaService.wallet.findUnique({where: {userId: userId}}) 
            if(!wallet){
                wallet = await this.prismaService.wallet.create({data: {userId: userId}})
            }
            const category = await this.prismaService.category.findUnique({
                where: {id: transactionDto.categoryId}
            })
            if(category.type !== transactionDto.type){
                throw new HttpException('transaction type bilan category lar mos emas', HttpStatus.BAD_REQUEST)
            }   
            const newtransaction = await this.prismaService.transaction.create({data: {...transactionDto, walletId: wallet.id}})
    
            return {
                code:201,   
                message: 'transaction yaratildi',
                data: newtransaction
            }     
        } catch (error) {
            throw new HttpException('serverda xatolik yoki yomon sorov', HttpStatus.GATEWAY_TIMEOUT )
        }
    }

    async deleteTransaction(deleteId: string | number, userId: number) {
        try {
            deleteId = +deleteId
    
            let wallet = await this.prismaService.wallet.findUnique({where: {userId: userId }})
            if(!wallet){
                wallet = await this.prismaService.wallet.create({data: {userId: userId}})
            }
    
            const transaction = await this.prismaService.transaction.findUnique({where: {id: deleteId}})
            if(!transaction){
                throw new HttpException('transaction topilmadi', HttpStatus.NOT_FOUND)
            }
            if(transaction.walletId != wallet.id){
                throw new HttpException('Bu transaction sizga tegishli emas uni o\'chira olmaysiz', HttpStatus.BAD_REQUEST)
            }
            const deletetransaction = await this.prismaService.transaction.delete({where: {id:deleteId}})
            return {
                code:200, 
                message: 'transaction o\'chirildi',
                data: deletetransaction
            }
        } catch (error) {
            throw new HttpException('serverda xatolik yoki yomon sorov', HttpStatus.GATEWAY_TIMEOUT )
        }
    }

    // Admin Dashboard
    async createTransactionCategory(categoryDto: CategoryDto) {
        try {
            const category = await this.prismaService.category.create({data: {...categoryDto}})
    
            return {
                code:201,   
                message: 'transaction yaratildi',
                data: category
            }     
        } catch (error) {
            throw new HttpException('serverda xatolik yoki yomon sorov', HttpStatus.GATEWAY_TIMEOUT )
        }
    }
    
    async updateTransactionCategory(categoryDto: CategoryDto, id: number | string) {
        try {
            const category = await this.prismaService.category.update({
                where: {id: +id},
                data: {...categoryDto}
            })
    
            return {
                code:200,   
                message: 'transaction o\'zgartirildi',
                data: category
            }     
        } catch (error) {
            throw new HttpException('serverda xatolik yoki yomon sorov', HttpStatus.GATEWAY_TIMEOUT )
        }
    }

    async deleteTransactionCategory(id: number | string) {
        try {
            const category = await this.prismaService.category.delete({
                where: {id: +id},
            })
    
            return {
                code:200,   
                message: 'transaction o\'chirildi',
                data: category
            }     
        } catch (error) {
            throw new HttpException('serverda xatolik yoki yomon sorov', HttpStatus.GATEWAY_TIMEOUT )
        }
    }

}
 
import { Injectable, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KirimDto } from './dto/kirim.dto';
import { ChiqimDto } from './dto/chiqim.dto';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class WalletService {
    constructor(private prismaService: PrismaService) { }

    
    async getAllKirimCategory(){
        const category = await this.prismaService.tushumlar.findMany()
        if(!category){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
          }
        return {
            code:200, 
            message: 'Kirim category finded',
            data: category
        }
    }

    async getAllChiqimCategory(){   
        const category = await this.prismaService.xarajatlar.findMany()
        if(!category){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
          }
        return {
            code:200, 
            message: 'Chiqim category finded',
            data: category
        }
    }

    async getAllKirim(@Query() query: QueryDto){
        const userId = query.userId
        const dateStart = new Date(query.dateStart)
        const dateEnd = new Date(query.dateEnd)

        let kun = dateEnd.getDate() + 1
        dateEnd.setDate(kun)

        const kirim = await await this.prismaService.kirim.findMany({
            where: {
                createdAt: {
                  gte: dateStart,
                  lte: dateEnd,
                },
                userId: +userId
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        email: true,
                    },
                },
                tushum: {
                    select: {
                        title: true,
                    },
                }
            },
        })
        if(Boolean(!kirim[0])){
            throw new HttpException('Kirimlar topilmadi', HttpStatus.NOT_FOUND);
          }
        return {code:200, message: "Get All Kirim", data:kirim}
    }

    async createKirim(kirim: KirimDto) {
        const newKirim = await this.prismaService.kirim.create({data: kirim})
        return {
            code:201, 
            message: 'Created Kirim',
            data: newKirim
        }
    }

    async getAllChiqim(@Query() query: QueryDto){
        const userId = query.userId
        const dateStart = new Date(query.dateStart)
        const dateEnd = new Date(query.dateEnd)

        let kun = dateEnd.getDate() + 1
        dateEnd.setDate(kun)

        const chiqim = await this.prismaService.chiqim.findMany({
            where: {
                createdAt: {
                  gte: dateStart,
                  lte: dateEnd,
                },
                userId: +userId
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        email: true,
                    },
                },
                xarajat: {
                    select: {
                        title: true,
                    },
                }
            },
        })

        if(Boolean(!chiqim[0])){
            throw new HttpException('Kirimlar topilmadi', HttpStatus.NOT_FOUND);
        }
        return {code:200, message: "Get All Chiqim", data:chiqim} 
    }

    async createChiqim(chiqim: ChiqimDto) {
        const newChiqim = await this.prismaService.chiqim.create({data: chiqim})
        return {
            code:201, 
            message: 'Created Kirim',
            data: newChiqim
        }
    }
}
 
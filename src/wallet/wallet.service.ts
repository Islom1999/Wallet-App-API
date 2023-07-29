import { Injectable, HttpException, HttpStatus, Query, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KirimDto } from './dto/kirim.dto';
import { ChiqimDto } from './dto/chiqim.dto';
import { QueryDto } from './dto/query.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class WalletService {
    constructor(private prismaService: PrismaService) { }

    
    async getAllKirimCategory(){
        const category = await this.prismaService.tushumlar.findMany()
        .catch((error) => {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new HttpException('Prisma Error', HttpStatus.NOT_MODIFIED);
            }
            throw error;
        });

        if(!category[0]){
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
        if(!category[0]){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
          }
        return {
            code:200, 
            message: 'Chiqim category finded',
            data: category
        }
    }

    async getAllKirim(@Query() query: QueryDto, userId: number){
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
                userId: +userId,
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

        let total = await this.prismaService.kirim.aggregate({
            where: {
                createdAt: {
                    gte: dateStart,
                    lte: dateEnd,
                },
                userId: +userId,
            },
            _avg: {
                amount: true,
            },
            _count: {
                amount: true,
            },
            _sum: {
                amount: true, 
            }
        })

        const totalData = {totalAmount: total._sum.amount, totalCount: total._count.amount, totalAvg: total._avg.amount}

        return {code:200, message: "Get All Kirim", totalData, data:kirim}
    }

    async createKirim(kirim: KirimDto, userId: number) {
        const newKirim = await this.prismaService.kirim.create({data: {...kirim, userId}})
        return {
            code:201, 
            message: 'Created Kirim',
            data: newKirim
        }     
    }

    async getAllChiqim(@Query() query: QueryDto, userId: number){
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
            throw new HttpException('Chiqimlar topilmadi', HttpStatus.NOT_FOUND);
        }

        let total = await this.prismaService.chiqim.aggregate({
            where: {
                createdAt: {
                    gte: dateStart,
                    lte: dateEnd,
                  },
                  userId: +userId
            },
            _avg: {
                amount: true,
            },
            _count: {
                amount: true,
            },
            _sum: {
                amount: true,
            }
        })

        const totalData = {totalAmount: total._sum.amount, totalCount: total._count.amount, totalAvg: total._avg.amount}
        
        return {code:200, message: "Get All Chiqim", totalData, data:chiqim} 
    }

    async createChiqim(chiqim: ChiqimDto, userId: number) {
        const newChiqim = await this.prismaService.chiqim.create({data: {...chiqim, userId}})
        return {
            code:201, 
            message: 'Created Kirim',
            data: newChiqim
        }
    }

    //  by category

    async getAllKirimById(@Query() query: QueryDto, userId: number){
        const dateStart = new Date(query.dateStart)
        const dateEnd = new Date(query.dateEnd)
        const categoryId = query.categoryId

        let kun = dateEnd.getDate() + 1
        dateEnd.setDate(kun)

        const kirim = await await this.prismaService.kirim.findMany({
            where: {
                createdAt: {
                  gte: dateStart,
                  lte: dateEnd,
                },
                userId: +userId,
                tushumId: +categoryId
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

        let total = await this.prismaService.kirim.aggregate({
            where: {
                createdAt: {
                    gte: dateStart,
                    lte: dateEnd,
                },
                userId: +userId,
                tushumId: +categoryId
            },
            _avg: {
                amount: true,
            },
            _count: {
                amount: true,
            },
            _sum: {
                amount: true, 
            }
        })

        const totalData = {totalAmount: total._sum.amount, totalCount: total._count.amount, totalAvg: total._avg.amount}

        return {code:200, message: "Get All Kirim", totalData, data:kirim}
    }

    async getAllChiqimById(@Query() query: QueryDto, userId: number){
        const dateStart = new Date(query.dateStart)
        const dateEnd = new Date(query.dateEnd)
        const categoryId = query.categoryId

        console.log(categoryId)

        let kun = dateEnd.getDate() + 1 
        dateEnd.setDate(kun)

        const chiqim = await this.prismaService.chiqim.findMany({
            where: {
                createdAt: {
                  gte: dateStart,
                  lte: dateEnd,
                },
                userId: +userId,
                xarajatId: +categoryId
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
            throw new HttpException('Chiqimlar topilmadi', HttpStatus.NOT_FOUND);
        }

        let total = await this.prismaService.chiqim.aggregate({
            where: {
                createdAt: {
                    gte: dateStart,
                    lte: dateEnd,
                  },
                  userId: +userId,
                  xarajatId: +categoryId
            },
            _avg: {
                amount: true,
            },
            _count: {
                amount: true,
            },
            _sum: {
                amount: true,
            }
        })

        const totalData = {totalAmount: total._sum.amount, totalCount: total._count.amount, totalAvg: total._avg.amount}
        
        return {code:200, message: "Get All Chiqim", totalData, data:chiqim} 
    }

}
 
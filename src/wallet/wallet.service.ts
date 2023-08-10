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
            throw new HttpException('Kategoriyalar topilmadi', HttpStatus.NOT_FOUND);
          }
        return {
            code:200, 
            message: 'Kategoriyalar topildi',
            data: category
        }
    }

    async getAllChiqimCategory(){   
        const category = await this.prismaService.xarajatlar.findMany()
        if(!category[0]){
            throw new HttpException('Kategoriyalar topilmadi', HttpStatus.NOT_FOUND);
          }
        return {
            code:200, 
            message: 'Barcha kategoriyalar topildi',
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

        return {code:200, message: "Barcha kirimlar", totalData, data:kirim}
    }

    async createKirim(kirim: KirimDto, userId: number) {
        const newKirim = await this.prismaService.kirim.create({data: {...kirim, userId}})
        return {
            code:201, 
            message: 'Kirim yaratildi',
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
        
        return {code:200, message: "Barcha Chiqimlar", totalData, data:chiqim} 
    }

    async createChiqim(chiqim: ChiqimDto, userId: number) {
        const newChiqim = await this.prismaService.chiqim.create({data: {...chiqim, userId}})
        return {
            code:201, 
            message: 'Chiqim yaratildi',
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

        return {code:200, message: "Barcha kirimlar", totalData, data:kirim}
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
        
        return {code:200, message: "Barcha Chiqimlar", totalData, data:chiqim} 
    }

    // delete wallet item
    async deleteChiqim(deleteId: string | number, userId: number) {
        deleteId = +deleteId
        const chiqim = await this.prismaService.chiqim.findUnique({where: {id: deleteId}})
        if(!chiqim){
            throw new HttpException('Chiqim topilmadi', HttpStatus.NOT_FOUND)
        }
        if(chiqim.userId != userId){
            throw new HttpException('Bu chiqim sizga tegishli emas uni o\'chira olmaysiz', HttpStatus.BAD_REQUEST)
        }
        const deleteChiqim = await this.prismaService.chiqim.delete({where: {id:deleteId}})
        return {
            code:200, 
            message: 'Chiqim o\'chirildi',
            data: deleteChiqim
        }
    }

    async deleteKirim(deleteId: string | number, userId: number) {
        deleteId = +deleteId
        const kirim = await this.prismaService.kirim.findUnique({where: {id: deleteId}})
        if(!kirim){
            throw new HttpException('Kirim topilmadi', HttpStatus.NOT_FOUND)
        }
        if(kirim.userId != userId){
            throw new HttpException('Bu kirim sizga tegishli emas uni o\'chira olmaysiz', HttpStatus.BAD_REQUEST)
        }
        const deleteKirim = await this.prismaService.kirim.delete({where: {id:deleteId}})
        return {
            code:200, 
            message: 'Kirim o\'chirildi',
            data: deleteKirim
        }
    }

}
 
import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaService } from 'src/prisma.service';
import { SharedModule } from 'src/shared/sharedModule';

@Module({
  controllers: [WalletController],
  providers: [WalletService, PrismaService],
  imports: [
    SharedModule,
  ],
})
export class WalletModule {}

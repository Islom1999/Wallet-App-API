import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [AuthModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

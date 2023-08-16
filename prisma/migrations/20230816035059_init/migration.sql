/*
  Warnings:

  - You are about to drop the `Chiqim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kirim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tushumlar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Xarajatlar` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- DropForeignKey
ALTER TABLE "Chiqim" DROP CONSTRAINT "Chiqim_userId_fkey";

-- DropForeignKey
ALTER TABLE "Chiqim" DROP CONSTRAINT "Chiqim_xarajatId_fkey";

-- DropForeignKey
ALTER TABLE "Kirim" DROP CONSTRAINT "Kirim_tushumId_fkey";

-- DropForeignKey
ALTER TABLE "Kirim" DROP CONSTRAINT "Kirim_userId_fkey";

-- DropTable
DROP TABLE "Chiqim";

-- DropTable
DROP TABLE "Kirim";

-- DropTable
DROP TABLE "Tushumlar";

-- DropTable
DROP TABLE "Xarajatlar";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "type" "TransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "TransactionType" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

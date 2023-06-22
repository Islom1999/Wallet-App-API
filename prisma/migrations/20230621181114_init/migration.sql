/*
  Warnings:

  - You are about to alter the column `amount` on the `Chiqim` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `Kirim` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Chiqim" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Kirim" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

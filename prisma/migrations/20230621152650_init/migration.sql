-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kirim" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "tushumId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Kirim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chiqim" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "xarajatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Chiqim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Xarajatlar" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Xarajatlar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tushumlar" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tushumlar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Kirim" ADD CONSTRAINT "Kirim_tushumId_fkey" FOREIGN KEY ("tushumId") REFERENCES "Tushumlar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kirim" ADD CONSTRAINT "Kirim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chiqim" ADD CONSTRAINT "Chiqim_xarajatId_fkey" FOREIGN KEY ("xarajatId") REFERENCES "Xarajatlar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chiqim" ADD CONSTRAINT "Chiqim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

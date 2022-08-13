-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "telephone" TEXT,
    "address" TEXT,
    "isAvailable" BOOLEAN,
    "inProgress" BOOLEAN,
    "ownerName" TEXT,
    "hasCalled" TEXT,
    "personalFavouriteNumber" INTEGER,
    "price" INTEGER,
    "sharedRooms" BOOLEAN,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_name_key" ON "House"("name");

-- CreateIndex
CREATE UNIQUE INDEX "House_telephone_key" ON "House"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "House_address_key" ON "House"("address");

-- CreateIndex
CREATE UNIQUE INDEX "House_userId_key" ON "House"("userId");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

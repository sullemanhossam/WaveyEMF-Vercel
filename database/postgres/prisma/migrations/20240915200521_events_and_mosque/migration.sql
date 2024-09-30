-- CreateTable
CREATE TABLE "Mosque" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "established" TIMESTAMP(3) NOT NULL,
    "imam" TEXT,

    CONSTRAINT "Mosque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "mosqueId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

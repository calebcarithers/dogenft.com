-- CreateTable
CREATE TABLE "transfer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "amount" TEXT NOT NULL
);

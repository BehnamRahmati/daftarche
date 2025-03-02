-- CreateTable
CREATE TABLE "Clipboard" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clipboard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clipboard" ADD CONSTRAINT "Clipboard_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

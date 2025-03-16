-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deviceReady" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pushSubscription" JSONB;

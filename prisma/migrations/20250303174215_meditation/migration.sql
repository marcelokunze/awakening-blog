/*
  Warnings:

  - Added the required column `purpose` to the `meditations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meditations" ADD COLUMN     "purpose" TEXT NOT NULL;

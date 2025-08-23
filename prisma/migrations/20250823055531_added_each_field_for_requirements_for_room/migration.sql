/*
  Warnings:

  - You are about to drop the column `requirements` on the `Room` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "requirements",
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `phone` on the `parents` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fatherPhone]` on the table `parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[motherPhone]` on the table `parents` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `parents_phone_key` ON `parents`;

-- AlterTable
ALTER TABLE `parents` DROP COLUMN `phone`,
    ADD COLUMN `fatherPhone` VARCHAR(15) NULL,
    ADD COLUMN `motherPhone` VARCHAR(15) NULL,
    MODIFY `fatherName` VARCHAR(100) NULL,
    MODIFY `fatherLastname` VARCHAR(100) NULL,
    MODIFY `motherName` VARCHAR(100) NULL,
    MODIFY `motherLastname` VARCHAR(100) NULL,
    MODIFY `fatherEmail` VARCHAR(200) NULL,
    MODIFY `motherEmail` VARCHAR(200) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `parents_fatherPhone_key` ON `parents`(`fatherPhone`);

-- CreateIndex
CREATE UNIQUE INDEX `parents_motherPhone_key` ON `parents`(`motherPhone`);

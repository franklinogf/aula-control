/*
  Warnings:

  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `year` to the `parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_parentId_fkey`;

-- AlterTable
ALTER TABLE `parents` ADD COLUMN `year` CHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `dob` DATE NOT NULL,
    ADD COLUMN `year` CHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `year` CHAR(5) NOT NULL;

-- DropTable
DROP TABLE `student`;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `year` CHAR(5) NOT NULL,

    UNIQUE INDEX `School_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `dob` DATE NOT NULL,
    `parentId` INTEGER NOT NULL,
    `year` CHAR(5) NOT NULL,

    UNIQUE INDEX `students_phone_key`(`phone`),
    UNIQUE INDEX `students_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `parents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

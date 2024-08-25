/*
  Warnings:

  - A unique constraint covering the columns `[teacherId]` on the table `grades` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `dob` DATE NOT NULL,
    `parentId` INTEGER NOT NULL,

    UNIQUE INDEX `Student_phone_key`(`phone`),
    UNIQUE INDEX `Student_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `grades_teacherId_key` ON `grades`(`teacherId`);

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `parents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

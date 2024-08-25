/*
  Warnings:

  - Added the required column `year` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gradeId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `year` CHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `gradeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `note1` SMALLINT UNSIGNED NULL,
    `note2` SMALLINT UNSIGNED NULL,
    `note3` SMALLINT UNSIGNED NULL,
    `note4` SMALLINT UNSIGNED NULL,
    `exam1` SMALLINT UNSIGNED NULL,
    `note5` SMALLINT UNSIGNED NULL,
    `note6` SMALLINT UNSIGNED NULL,
    `note7` SMALLINT UNSIGNED NULL,
    `note8` SMALLINT UNSIGNED NULL,
    `exam2` SMALLINT UNSIGNED NULL,
    `year` CHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `grades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

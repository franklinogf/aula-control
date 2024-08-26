-- DropForeignKey
ALTER TABLE `grades` DROP FOREIGN KEY `grades_teacherId_fkey`;

-- AlterTable
ALTER TABLE `grades` MODIFY `teacherId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

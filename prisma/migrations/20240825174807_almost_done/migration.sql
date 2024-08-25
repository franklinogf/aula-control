-- AlterTable
ALTER TABLE `courses` ADD COLUMN `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `grades` ADD COLUMN `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `notes` ADD COLUMN `average1` SMALLINT UNSIGNED NULL,
    ADD COLUMN `average2` SMALLINT UNSIGNED NULL,
    ADD COLUMN `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `parents` ADD COLUMN `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `school` ADD COLUMN `gradeMax` SMALLINT UNSIGNED NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `subjects` ADD COLUMN `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `deleteAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `attendace_options` (
    `name` CHAR(2) NOT NULL,
    `description` VARCHAR(150) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    UNIQUE INDEX `attendace_options_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `attendanceOptionId` CHAR(2) NOT NULL,
    `year` CHAR(5) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `description` VARCHAR(191) NULL,
    `year` CHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `date` DATE NOT NULL,
    `year` CHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `teacherId` INTEGER NOT NULL,
    `gradeId` VARCHAR(191) NOT NULL,
    `year` CHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `authorModel` ENUM('parent', 'teacher') NOT NULL,
    `comment` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_attendanceOptionId_fkey` FOREIGN KEY (`attendanceOptionId`) REFERENCES `attendace_options`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conduct` ADD CONSTRAINT `Conduct_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `grades`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

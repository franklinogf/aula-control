/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `type` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `roleId` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_roleId_fkey`;

-- AlterTable
ALTER TABLE `roles` DROP PRIMARY KEY,
    MODIFY `type` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`type`);

-- AlterTable
ALTER TABLE `users` MODIFY `roleId` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`type`) ON DELETE RESTRICT ON UPDATE CASCADE;

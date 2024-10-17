/*
  Warnings:

  - Added the required column `year` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `grades` ADD COLUMN `year` CHAR(5) NOT NULL;

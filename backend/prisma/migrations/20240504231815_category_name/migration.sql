/*
  Warnings:

  - You are about to drop the column `category_level0_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `category_level1_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categoryLevel0` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoryLevel1` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_level0_id",
DROP COLUMN "category_level1_id",
ADD COLUMN     "category_level0" TEXT,
ADD COLUMN     "category_level1" TEXT;

-- DropTable
DROP TABLE "categoryLevel0";

-- DropTable
DROP TABLE "categoryLevel1";

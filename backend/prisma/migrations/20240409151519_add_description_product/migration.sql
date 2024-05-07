-- CreateTable
CREATE TABLE "categoryLevel0" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "categoryLevel0_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoryLevel1" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "categoryLevel1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "authorLink" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "imageCredit" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "category_level0_id" INTEGER,
    "category_level1_id" INTEGER,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

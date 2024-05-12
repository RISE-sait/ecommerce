-- CreateTable
CREATE TABLE "Purchases" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "stripe_purchase_id" TEXT NOT NULL,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("id")
);

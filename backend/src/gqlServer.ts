import { ApolloServer } from '@apollo/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import { stripe } from '.';
import Stripe from 'stripe';

export const prisma: PrismaClient = new PrismaClient();

interface InfoQueryArgs {
    subtypes?: string[];
    sortType?: string;
    max?: number;
    min?: number;
    itemName?: string;
    showAmt?: number;
}

const resolvers = {
    Query: {
        info: async (_: any, args: InfoQueryArgs) => args,
        purchase: async (_: any, { orderId, email }: { orderId: string, email: string }) => {

            try {
                const paymentInfo = await stripe.checkout.sessions.retrieve(orderId);

                if (paymentInfo.customer_details?.email !== email) return new Error("Unauthorized")

                const metadata = paymentInfo.metadata as Stripe.Metadata

                const deliveryDate = metadata.deliverDate

                const products: any[] = JSON.parse(metadata.checkoutProducts)

                const items = products.map(product => {
                    const price = product.price_data.unit_amount / 100
                    const itemName = product.price_data.product_data.name
                    const quantity = product.quantity

                    return {
                        itemName, quantity, price
                    }
                })

                return {
                    items,
                    deliveryDate
                }
            }
            catch (err) {
                throw err
            }
        }
    },
    Mutation: {
        addPurchase: async (_: any, { orderId, email }: { orderId: string, email: string }) => {
            await prisma.purchases.create({
                data: {
                    email: email,
                    stripe_purchase_id: orderId
                }
            })

            return true
        }
    },
    InfoQueryType: {
        subtypes: async (parent: any) => {
            try {

                const subtypes: string[] = parent.subtypes;

                if (!subtypes || subtypes.length === 0) {
                    return new Set((await prisma.products.findMany({}).then(
                        items => items.map(item => item.category_level0))).filter(value => value !== null))
                }

                const isColExist = await prisma.$queryRaw`SELECT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'products' AND column_name = ${'category_level' + subtypes.length}
                );`.then((data: any) => data[0].exists
                )

                if (!isColExist) return []

                const nextLayerCol = `category_level${subtypes.length}`;

                const values = await prisma.products.findMany({
                    select: { [nextLayerCol]: true },
                    where: {
                        AND: await Promise.all(subtypes.map(async (subtype: string, idx: number) => ({
                            [`category_level${idx}`]: {
                                equals: subtype
                            }
                        }))) as Prisma.productsWhereInput[]
                    },
                });

                return values.map(value => value[nextLayerCol]).filter(value => value !== null)

            } catch (err) {
                console.log(err);
            }
        },
        products: async (parent: any) => {
            try {
                const { subtypes, sortType, max, min, itemName, showAmt } = parent;

                if (itemName) return prisma.products.findMany({ where: { itemName: { contains: itemName, mode: "insensitive" } } });

                let where: Prisma.productsWhereInput = {
                    price: { ...(min && { gte: min }), ...(max && { lte: max }) }
                };

                if (subtypes && subtypes.length > 0) {
                    where.AND = await Promise.all(subtypes.map(async (subtype: string, idx: number) => ({
                        [`category_level${idx}`]: {
                            equals: subtype
                        }
                    })))
                }

                const products = await prisma.products.findMany({
                    where,
                    orderBy: { price: sortType === "HIGH_TO_LOW" ? "desc" : "asc" },
                    take: showAmt ? showAmt : 10,
                });

                return products;
            } catch (err) {
                console.log(err);
            }
        },
    },
};

const schemaPath = join(__dirname, '..', 'graphql', 'schema.gql');
const typeDefs = readFileSync(schemaPath, 'utf8');

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

export default server
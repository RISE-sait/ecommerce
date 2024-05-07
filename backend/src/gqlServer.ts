import { ApolloServer } from '@apollo/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma: PrismaClient = new PrismaClient();

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

                const products = await prisma.products.findMany({
                    where: {
                        price: { ...(min && { gte: min }), ...(max && { lte: max }) },
                        AND: await Promise.all(subtypes.map(async (subtype: string, idx: number) => ({
                            [`category_level${idx}`]: {
                                equals: subtype
                            }
                        }))) as Prisma.productsWhereInput[]
                    },
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
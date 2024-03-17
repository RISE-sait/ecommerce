import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ProductsType = new GraphQLObjectType({
  name: "Products",
  fields: () => ({
    id: { type: GraphQLInt },
    itemName: { type: GraphQLString },
    authorLink: { type: GraphQLString },
    authorName: { type: GraphQLString },
    imageCredit: { type: GraphQLString },
    imageSrc: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category_level0_id: { type: GraphQLInt },
    category_level1_id: { type: GraphQLInt },
  }),
});

const InfoType = new GraphQLObjectType({
  name: "InfoQueryType",
  fields: () => ({
    subtypes: {
      type: GraphQLList(GraphQLInt),
      resolve: async (parent) => {
        try {
          const ids: number[] = parent.ids;

          const nextLayerName =
            `category_level${ids.length}_id` as keyof Prisma.productsWhereInput;

          const whereInput: Prisma.productsWhereInput = {
            AND: ids.map((id, idx) => ({
              [`category_level${idx}_id`]: { equals: id },
            })),
          };

          const values = await prisma.products.findMany({
            select: {
              [nextLayerName]: true,
            },
            where: whereInput,
          });

          return [
            ...new Set(
              values
                .map((value) => value[nextLayerName])
                .filter((value) => value !== null)
            ),
          ];
        } catch (err) {
          console.error(err)
        }

      }
    },
    products: {
      type: GraphQLList(ProductsType),
      resolve: async (parent) => {
        try {

          const {
            ids,
            sortType,
            max,
            min,
            name,
          }: {
            ids?: number[];
            sortType?: string;
            max?: number;
            min?: number;
            name?: string;
          } = parent;


          if (name) {
            return (await prisma.products.findMany({
              where: {
                itemName: {
                  contains: name,
                  mode: "insensitive"
                },
              }
            })).map((product) => ({
              ...product,
              price: parseFloat(product.price.toString()) / 100
            }))
          }

          const products = await prisma.products.findMany({
            where: {
              AND: ids && ids.map((id, idx) => ({
                [`category_level${idx}_id`]: { equals: id },
              })),
              price: {
                ...(min && { gte: min * 100 }),
                ... (max && { lte: max * 100 }),
              },
            },
            orderBy: {
              price: sortType === "HIGH_TO_LOW" ? "desc" : "asc",
            },
          });

          return products.map((product) => ({
            ...product,
            price: parseFloat(product.price.toString()) / 100,
          }));
        }
        catch (err) {
          console.error(err)
        }
      }
    },
  }),
});

const RootType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    info: {
      type: InfoType,
      args: {
        ids: {
          type: GraphQLList(GraphQLInt),
        },
        sortType: {
          type: GraphQLString,
        },
        min: {
          type: GraphQLFloat,
        },
        max: {
          type: GraphQLFloat,
        },
        name: {
          type: GraphQLString,
        },
      },
      resolve: (_, args) => args,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootType,
});

export default schema;

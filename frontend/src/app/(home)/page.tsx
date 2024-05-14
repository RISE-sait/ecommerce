import client from "@/helpers/apollo";
import { DocumentNode, gql } from "@apollo/client";
import { productsStorageType, productsType } from "@/helpers/general";
import CategoryOptions from "@/components/home/Options/CategoryOptions";
import CartIcon from "@/components/home/CartIcon";
import MainContent from "@/components/home/MainContent";

export default async function Page({ searchParams }: { searchParams: any }) {

    const { sortType, showAmt, itemName, subtypes } = searchParams

    const gqlParams = {
        subtypes: subtypes as string | null ? `subtypes: [${(subtypes as string).split(',').map(sub => `"${sub}"`)}]` : "subtypes: []",
        sortType: sortType && `sortType: \"${sortType}\"`,
        showAmt: showAmt && `showAmt: ${showAmt}`,
        itemName: itemName && `itemName: \"${itemName}\"`
    };

    const sortsList = Object.values(gqlParams).filter(Boolean);

    const GetProductsQuery: DocumentNode = gql`
    query {
        info(${sortsList.join(',')}) {
    products {
      itemName
      authorLink
      id
      description
      authorName
      imageCredit
      imageSrc
      price
      category_level0
      category_level1
    }
  }
}`

    const { data, networkStatus, error } = await client.query({
        query: GetProductsQuery,
    });

    const displayItems: productsStorageType = new Map();
    (data.info.products as (productsType & { id: number })[]).forEach(
        product => {

            displayItems.set(product.id, {
                description: product.description,
                authorLink: product.authorLink,
                authorName: product.authorName,
                imageCredit: product.imageCredit,
                imageSrc: product.imageSrc,
                itemName: product.itemName,
                price: product.price,
                quantity: 0
            });
        }
    );

    return (
        <div className="max-w-container mx-auto px-4 relative">
            <CartIcon />
            <h1 className="text-4xl font-bold my-6">Shop</h1>
            <div className="flex justify-between">
                <div className="basis-[15vw]">
                    <CategoryOptions />
                </div>

                <div className="basis-[75vw]">
                    <h3 className="font-semibold text-xl mb-4">{displayItems?.size} items</h3>
                    <MainContent displayItems={displayItems} />
                </div>
            </div>
        </div>
    );
};

import DisplayItems from "@/components/home/DisplayItems";
import client from "@/helpers/apollo";
import { DocumentNode, NetworkStatus, gql } from "@apollo/client";
import { PRICE_SORT, productsStorageType, productsType } from "@/helpers/general";
import CategoryOptions from "@/components/home/CategoryOptions";
import CartIcon from "@/components/home/CartIcon";
import ShopOptions, { TypeIsDisplayGrid } from "@/components/home/ShopOptions";
import SSRCategoryOptions from "@/components/home/SSRCategoryOptions";

export default async function Page({ searchParams }: { searchParams: any }) {

    const sortTypeSearchParams = searchParams.sortType
    const showAmtSearchParams = searchParams.showAmt
    const itemNameSearchParams = searchParams.itemName
    const isDisplayGrid = ((searchParams.displayGrid as TypeIsDisplayGrid) ?? "true") === "true"

    const subtypesSearchParams: string | null = searchParams.subtypes

    const subtypesGql = subtypesSearchParams ? `subtypes: [${subtypesSearchParams.split(',').map(sub => `"${sub}"`)}]` : "subtypes: []"
    const sortTypeGql = sortTypeSearchParams && `sortType: \"${sortTypeSearchParams}\" `
    const showAmtGql = showAmtSearchParams && `showAmt: ${showAmtSearchParams}`
    const itemNameGql = itemNameSearchParams && `itemName: \"${itemNameSearchParams}\"`

    const sortsList: string[] = []

    if (sortTypeGql) sortsList.push(sortTypeGql)
    if (subtypesGql) sortsList.push(subtypesGql)
    if (showAmtGql) sortsList.push(showAmtGql)
    if (itemNameGql) sortsList.push(itemNameGql)

    const gqlParams = sortsList.length > 0 ? `(${sortsList.join(',')})` : ""
    const GetProductsQuery: DocumentNode = gql`
    query {
  info${gqlParams} {
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

            // const cartProduct = cookies["cart"] ? cookies["cart"][product.id] : undefined;

            displayItems.set(product.id, {
                description: product.description,
                authorLink: product.authorLink,
                authorName: product.authorName,
                imageCredit: product.imageCredit,
                imageSrc: product.imageSrc,
                itemName: product.itemName,
                price: product.price,
                // quantity: cartProduct ? cartProduct.quantity : 0,
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
                    <CategoryOptions>
                        <SSRCategoryOptions />
                    </CategoryOptions>
                </div>

                <div className="basis-[75vw]">
                    <h3 className="font-semibold text-xl mb-4">{displayItems?.size} items</h3>
                    <ShopOptions />
                    {
                        displayItems !== null && <DisplayItems isDisplayGrid={isDisplayGrid} products={displayItems} />
                    }
                </div>
            </div>
        </div>
    );
};

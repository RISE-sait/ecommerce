import { backendHost, fetchData, productsStorageType, productsType } from "@/helpers/general";
import RelatedWordsOptions from "@/components/home/Options/RelatedWordsOptions";
import CartIcon from "@/components/home/CartIcon";
import MainContent from "@/components/home/MainContent";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home',
}

export default async function Page({ searchParams }: { searchParams: any }) {

    const { sortType, limit, contains, keywords } = searchParams

    const queryParams = {
        sortType: sortType && `sort=${sortType}`,
        limit: limit && `limit=${limit}`,
        contains: contains && `contains=${contains}`,
        keywords: keywords && `keywords=${keywords}`
    };

    let queryString = Object.values(queryParams)
        .filter(param => param)
        .join('&');

    queryString = `${queryString.length > 0 ? '?' : ''}${queryString}`

    const products = await fetchData(`Products${queryString}`)

    const displayItems: productsStorageType = new Map();
    (products as (productsType & { id: number })[]).forEach(
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
            <h1 className="text-4xl font-bold my-6">Shop now</h1>
            <RelatedWordsOptions searchParams={searchParams} />

            <h3 className="font-semibold text-xl mb-4">{displayItems?.size} items</h3>
            <MainContent displayItems={displayItems} />
        </div>
    );
};

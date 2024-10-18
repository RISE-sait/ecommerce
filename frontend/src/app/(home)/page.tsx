import RelatedWordsOptions from "@/components/home/Options/RelatedWordsOptions";
import CartIcon from "@/components/home/CartIcon";
import MainContent from "@/components/home/MainContent";
import type { Metadata } from 'next'
import { productsStorageType, productsType, SearchParams } from "@/types/types";
import { fetchData } from "@/helpers/helpers";
import ItemsCountDisplay from "@/components/home/Display/ItemsCountDisplay";

export const metadata: Metadata = {
    title: 'Home',
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {

    const queryParams = new URLSearchParams(searchParams as Record<string, string>)

    const products = await fetchData(`Products${queryParams.toString() ? '?' + queryParams : ''}`)

    const displayItems: productsStorageType = new Map(
        (products as (productsType & { id: number })[]).map(
            product => [product.id, {
                ...product,
            }])
    )

    const wordsQueryParams = new URLSearchParams({
        ...(queryParams.has('contains') && { contains: queryParams.get('contains')! }),
        ...(queryParams.has('keywords') && { keywords: queryParams.get('keywords')! }),
    });

    const words = await fetchData(`Words?${wordsQueryParams.toString()}`)

    return (
        <div className="max-w-container mx-auto px-4 relative">
            <CartIcon />
            <h1 className="text-4xl font-bold my-6">Shop now</h1>
            <RelatedWordsOptions words={words} />

            {
                displayItems.size > 0 ? <>
                    <ItemsCountDisplay count={displayItems.size}/>
                    <MainContent displayItems={displayItems} searchParams={searchParams} />
                </>
                    : <h3>No items</h3>
            }


        </div>
    );
};

"use client"

import DisplayItems from "@/components/shop/DisplayItems";
import React, { useEffect, useMemo, useState } from "react";
import client from "@/helpers/apollo";
import { DocumentNode, NetworkStatus, gql } from "@apollo/client";
import { PRICE_SORT, productsStorageType, productsType } from "@/helpers/general";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";
import Link from "next/link";
import CategoryOptions from "@/components/shop/CategoryOptions";

export default function ShopingPageContent() {

    const [displayItems, setDisplayItems] = useState<productsStorageType | null>(null);

    const [isGridView, setIsGridView] = useState(false)

    const [cookies] = useCookies(["cart"]);
    const cart = cookies.cart as {
        [key: string]: {
            itemName: string;
            imageSrc: string;
            quantity: number;
            price: number;
        };
    };

    const cartAmt = useMemo(() => cart ? Object.values(cart).reduce((acc, item) => acc + item.quantity, 0) : 0, [cart])

    const searchParams = useSearchParams();

    const sortTypeSearchParams = searchParams.get('sortType')
    const showAmtSearchParams = searchParams.get('showAmt')
    const itemNameSearchParams = searchParams.get('itemName')

    const subtypesSearchParams = searchParams.get('subtypes')

    const subtypesGql = subtypesSearchParams ? `subtypes: [${subtypesSearchParams.split(',').map(sub => `"${sub}"`)}]` : "subtypes: []"
    const sortTypeGql = sortTypeSearchParams !== null && `sortType: \"${sortTypeSearchParams}\" `
    const showAmtGql = showAmtSearchParams !== null && `showAmt: ${showAmtSearchParams}`
    const itemNameGql = itemNameSearchParams !== null && `itemName: \"${itemNameSearchParams}\"`

    const sortsList: string[] = []

    if (sortTypeGql) sortsList.push(sortTypeGql)
    if (subtypesGql) sortsList.push(subtypesGql)
    if (showAmtGql) sortsList.push(showAmtGql)
    if (itemNameGql) sortsList.push(itemNameGql)

    const gqlParams = sortsList.length > 0 ? `(${sortsList.join(',')})` : ""
    const GetProductsQuery: DocumentNode = useMemo(() => gql`
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
}
`, [showAmtSearchParams, sortTypeSearchParams, subtypesSearchParams, itemNameSearchParams])

    useEffect(() => {
        try {
            (async () => {
                const { data, networkStatus, error } = await client.query({
                    query: GetProductsQuery,
                });

                if (error) {
                    console.log(error.message);
                    return
                }

                const products: productsStorageType = new Map();
                (data.info.products as (productsType & { id: number })[]).forEach(
                    product => {

                        const cartProduct = cookies["cart"] ? cookies["cart"][product.id] : undefined;

                        products.set(product.id, {
                            description: product.description,
                            authorLink: product.authorLink,
                            authorName: product.authorName,
                            imageCredit: product.imageCredit,
                            imageSrc: product.imageSrc,
                            itemName: product.itemName,
                            price: product.price,
                            quantity: cartProduct ? cartProduct.quantity : 0,
                        });
                    }
                );

                setDisplayItems(products);
            })();
        }
        catch (err) {
            console.log(err)
        }
    }, [GetProductsQuery])

    return (
        <div className="max-w-container mx-auto px-4 relative">
            <Link href="/trackmyorder">
                <div className={`fixed top-20 z-20 right-5 rounded-md text-3xl h-fit aspect-square pb-4 pt-7 pl-4 pr-8 bg-white shadow-2xl shadow-black border border-[rgb(229, 231, 235)]`}>
                    <FaCartShopping className="fill-gray-500" />
                    <p className="text-base font-semibold">Cart</p>
                    <p className="absolute top-2 right-2 bg-blue-500 w-8 text-center aspect-square text-2xl rounded-full">{
                        cartAmt
                    }</p>
                </div>
            </Link>
            <h1 className="text-4xl font-bold my-6">Shop</h1>
            <div className="flex justify-between">
                <div className="basis-[15vw]">
                    <CategoryOptions />
                </div>

                <div className="basis-[75vw]">
                    <h3 className="font-semibold text-xl mb-4">{displayItems?.size} items</h3>
                    <ShopOptions isDisplayGrid={isGridView} setIsDisplayGrid={setIsGridView} />
                    {
                        displayItems !== null && <DisplayItems isDisplayGrid={isGridView} products={displayItems} />
                    }
                </div>
            </div>
        </div>
    );
};

function ShopOptions({ isDisplayGrid, setIsDisplayGrid }: {
    isDisplayGrid: boolean, setIsDisplayGrid:
    React.Dispatch<React.SetStateAction<boolean>>
}) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();

    return <div className="flex justify-between items-center">
        <DisplayOrientationSelections isDisplayGrid={isDisplayGrid} setIsDisplayGrid={setIsDisplayGrid} />
        <div className="flex items-center gap-5 text-xl">
            <div>
                <label>Sort by: </label>
                <select className="border-2 border-black" onChange={event => {
                    const current = new URLSearchParams(Array.from(searchParams.entries()))
                    current.set("sortType", event.target.value)

                    router.push(`${pathname}?${current.toString()}`)
                }}>
                    <option value={PRICE_SORT[0]}>
                        Price: Low to High
                    </option>
                    <option value={PRICE_SORT[1]}>
                        Price: High to Low
                    </option>
                </select>
            </div>

            <div>
                <label>Show: </label>
                <select className="border-2 border-black" onChange={event => {
                    const current = new URLSearchParams(Array.from(searchParams.entries()))
                    current.set("showAmt", event.target.value)

                    router.push(`${pathname}?${current.toString()}`)
                }}>
                    <option>
                        10
                    </option>
                    <option>
                        20
                    </option>
                    <option>
                        30
                    </option>
                </select>
            </div>
        </div>
    </div>
}

function DisplayOrientationSelections({ isDisplayGrid, setIsDisplayGrid }: {
    isDisplayGrid: boolean, setIsDisplayGrid:
    React.Dispatch<React.SetStateAction<boolean>>
}) {
    return <div className="flex gap-6 items-center">
        <BsGridFill onClick={() => !isDisplayGrid && setIsDisplayGrid(true)
        } className={`box-content ${isDisplayGrid ? "text-white bg-black" : "text-black bg-white"} border border-gray-500 p-3 text-2xl`} />

        <ImList onClick={() => isDisplayGrid && setIsDisplayGrid(false)} className={`box-content ${!isDisplayGrid ? "text-white bg-black" : "text-black bg-white"} border border-gray-500 p-3 text-2xl`} />
    </div>
}

"use client"

import { useState } from "react";
import ShopOptions from "./Options/ShopOptions";
import DisplayOrientationSelections from "./Options/DisplayOrientationSelections";
import AddedItemNotifications from "../AddedItemNotifications";
import { productsStorageType } from "@/types/types";
import DisplayItems from "./Display/DisplayItems";

export default function MainContent({ displayItems, searchParams }: { searchParams: any, displayItems: productsStorageType }) {

    const [isDisplayGrid, setIsDisplayGrid] = useState(false)

    return <>
        <div className="flex justify-between items-center">
            <DisplayOrientationSelections isDisplayGrid={isDisplayGrid} setIsDisplayGrid={setIsDisplayGrid} />
            <AddedItemNotifications />
            <ShopOptions searchParams={searchParams}/>
        </div>
        <DisplayItems isDisplayGrid={isDisplayGrid} products={displayItems} />
    </>
}
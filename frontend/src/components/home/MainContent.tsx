"use client"

import { useState } from "react";
import DisplayItems from "./Display/DisplayItems";
import ShopOptions from "./Options/ShopOptions";
import { productsStorageType } from "@/helpers/general";
import DisplayOrientationSelections from "./Options/DisplayOrientationSelections";
import AddedItemNotifications from "../AddedItemNotifications";

export default function MainContent({ displayItems }: { displayItems: productsStorageType }) {

    const [isDisplayGrid, setIsDisplayGrid] = useState(false)

    return <>
        <div className="flex justify-between items-center">
            <DisplayOrientationSelections isDisplayGrid={isDisplayGrid} setIsDisplayGrid={setIsDisplayGrid} />
            <AddedItemNotifications />
            <ShopOptions />
        </div>
        <DisplayItems isDisplayGrid={isDisplayGrid} products={displayItems} />
    </>
}
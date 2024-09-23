"use client"

import { useState } from "react"
import ItemQuantitySet from "../ItemQuantitySet";
import GridItemContent from "./GridItemContent";
import { productsType } from "@/types/types";

const GridItem = ({ productsInfo }: {
    productsInfo: productsType & {
        id: number
    }
}) => {

    const [isShow, setIsShow] = useState(false)

    return (
        <div className="flex flex-col py-5 px-3 h-full" onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)}>
            <GridItemContent productsInfo={productsInfo} />
            <ItemQuantitySet show={isShow} productsInfo={productsInfo} display="grid" />
        </div>
    )
}

export default GridItem
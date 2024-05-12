"use client"

import { useState } from "react"
import { productsType } from "@/helpers/general";
import ItemQuantitySet from "./ItemQuantitySet";
import GridItemContent from "./GridItemContent";

const GridItem = ({ productsInfo }: {
    productsInfo: productsType & {
        id: number
    }
}) => {

    const [isShow, setIsShow] = useState(false)

    return (
        <div className="flex flex-col py-5 px-3" onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)}>
            <GridItemContent productsInfo={productsInfo} />
            <ItemQuantitySet show={isShow} productsInfo={productsInfo} display="grid" />
        </div>
    )
}

export default GridItem
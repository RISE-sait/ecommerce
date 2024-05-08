"use client"

import React, { memo } from "react";
import { productsStorageType } from "../../helpers/general";
import GridItem from "./GridItem";
import ListItem from "./ListItem";

export enum AddOrReduceEnum {
  ADD, REDUCE
}

const ProductsDisplay = memo(({
  products,
  isDisplayGrid
}: {
  products: productsStorageType;
  isDisplayGrid: boolean
}) => {

  return products.size > 0 ? (
    <div
      className={`grid ${isDisplayGrid ? "grid-cols-3 gap-10" : "grid-cols-1"}`}
    >
      {Array.from(products.keys()).map(id => {

        const productsInfo = { ...products.get(id)!!, id };

        return (
          <div
            key={id}
            className={`${isDisplayGrid && "border border-gray-400 relative"}  mt-7`}
          >
            {
              isDisplayGrid ? <GridItem {...productsInfo} /> : <ListItem {...productsInfo} />
            }
          </div>
        );
      }
      )}
    </div>
  )
    :
    <NoItemsToDisplay />
}, (prevProps, newProps) => prevProps.isDisplayGrid === newProps.isDisplayGrid && prevProps.products === newProps.products
)

export default ProductsDisplay

const NoItemsToDisplay = () => <h3 className="relative left-0 mx-auto top-[13vh]">No items to display</h3>
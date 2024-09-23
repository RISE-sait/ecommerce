import { useEffect, useState } from "react";
import GridItem from "./GridItem";
import ListItem from "./ListItem";
import { productsStorageType } from "@/types/types";
import { useProductAndWordsContext } from "@/contexts/ProductsAndWordsContext";

export enum AddOrReduceEnum {
  ADD, REDUCE
}

export default function ProductsDisplay({
  products,
  isDisplayGrid
}: {
  products: productsStorageType;
  isDisplayGrid: boolean
}) {

  const [isSmallScreen, setIsSmallScreen] = useState(true)
  const { isPending } = useProductAndWordsContext()

  useEffect(() => {

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return isPending ? (
    <div className="loader-container">
      <div className="bouncing-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  ) : products.size > 0 ? (
    <div className={`grid ${isDisplayGrid && !isSmallScreen ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-10" : "grid-cols-1"}`}>
      {Array.from(products.keys()).map(id => {

        const productsInfo = { ...products.get(id)!!, id };

        return (
          <div
            key={id}
            className={`${isDisplayGrid && "border border-gray-400 relative"}  mt-7`}
          >
            {
              !isDisplayGrid || isSmallScreen ? <ListItem productsInfo={productsInfo} /> : <GridItem productsInfo={productsInfo} />
            }
          </div>
        );
      }
      )}
    </div>
  )
    :
    <NoItemsToDisplay />
}

const NoItemsToDisplay = () => <h3 className="relative left-0 mx-auto top-[13vh]">No items to display</h3>
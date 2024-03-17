"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/store/NavBar";
import SearchBar from "@/components/store/SearchBar";
import SideNav from "@/components/store/SideNav/SideNav";
import NotificationsComponent from "@/components/store/home/AddedItemNotifications";
import Banner from "@/components/store/home/banner/Banner";
import DisplayItemsGrid from "@/components/store/home/products/DisplayItemsGrid";
import SortAndFilter from "@/components/store/home/products/SortAndFilter";
import client from "@/helpers/apollo";
import {
  productsStorageType,
  useSortAndFilters,
  useIsSideNavOpened,
  productsType,
} from "@/helpers/general";
import { NetworkStatus, gql } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import React, { memo } from "react";
import { useState, useEffect, useRef } from "react";

interface ProductSearchParams {
  name?: string;
  max?: number;
  min?: number;
  sortType?: string;
  sideNav?: boolean;
}

export default function ProductsPage() {
  const { SortAndFilters } = useSortAndFilters();
  const searchParams = useSearchParams();

  const { max, min, sortType } = SortAndFilters;
  const name = searchParams.get("name") ?? undefined;

  const { IsSideNavOpened, setIsSideNavOpened } = useIsSideNavOpened();
  const mainSectionRef = useRef<HTMLDivElement>(null);

  const handleMainSectionClick = () =>
    IsSideNavOpened && setIsSideNavOpened(false);

  useEffect(() => {
    const mainSection = mainSectionRef.current;

    if (mainSection) {
      mainSection.addEventListener("click", handleMainSectionClick);

      return () =>
        mainSection.removeEventListener("click", handleMainSectionClick);
    }
  }, [IsSideNavOpened]);

  return (
    <div style={{ width: "90vw", margin: "0 auto" }}>
      <SideNav />
      <NotificationsComponent />
      <div
        ref={mainSectionRef}
        className={IsSideNavOpened ? "blur-[3px]" : "relative blur-0 h-max"}
      >
        <NavBar />
        <SearchBar />
        <Banner />
        <ItemsSection
          name={name}
          max={max}
          min={min}
          sortType={sortType}
          sideNav={IsSideNavOpened}
        />
        <Footer />
      </div>
    </div>
  );
}

const ItemsSection = memo<ProductSearchParams>(
  ({ name, max, min, sortType }) => {
    const [displayItems, setDisplayItems] =
      useState<productsStorageType | null>(null);

    useEffect(() => {
      try {

        let minArg = "";
        let maxArg = "";
        let nameArg = "";
        let sortTypeArg = "";

        // Construct argument strings for min, max, name, and sortType if they are defined
        if (min) minArg = `, min: ${min}`;
        if (max) maxArg = `, max: ${max}`;
        if (name) nameArg = `, name: "${name}"`;
        if (sortType) sortTypeArg = `, sortType: "${sortType}"`;

        const GET_ITEMS = gql`
        query {
          info(ids: [], ${sortTypeArg}${nameArg}${minArg}${maxArg}) {
            products {
              itemName
              authorLink
              id
              authorName
              imageCredit
              imageSrc
              price
              category_level0_id
              category_level1_id
            }
          }
        }
      `;

        (async () => {
          const { data, networkStatus } = await client.query({
            query: GET_ITEMS,
          });

          if (networkStatus === NetworkStatus.error)
            return console.error("Failed to fetch data");

          const products: productsStorageType = new Map();
          (data.info.products as (productsType & { id: number })[]).forEach(
            (product) => {
              products.set(product.id, {
                authorLink: product.authorLink,
                authorName: product.authorName,
                imageCredit: product.imageCredit,
                imageSrc: product.imageSrc,
                itemName: product.itemName,
                price: product.price,
                quantity: 0,
              });
            }
          );

          setDisplayItems(products);
        })();
      }
      catch (err) {
        console.error(err)
      }
    }, [max, min, sortType, name]);

    return displayItems !== null ? (
      <div
        className="flex flex-col justify-center ssm:gap-[5vw]
         sm:flex-row"
        id="displayItems"
      >
        <SortAndFilter itemsLength={displayItems.size} />
        <DisplayItemsGrid products={displayItems} />
      </div>
    ) : (
      <h1 className="my-[10vh] text-center">Loading Items</h1>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.name === nextProps.name &&
      prevProps.max === nextProps.max &&
      prevProps.min === nextProps.min &&
      prevProps.sortType === nextProps.sortType
    );
  }
);

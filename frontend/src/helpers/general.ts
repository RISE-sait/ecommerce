import { create } from "zustand";

export const backendHost =
  process.env.NODE_ENV === "production"
    ? "https://ksportsserver.azurewebsites.net/"
    : "http://localhost:3000/";

export const PRICE_SORT = ["LOW_TO_HIGH", "HIGH_TO_LOW"] as const;

export type SortType = (typeof PRICE_SORT)[number];

type SortAndFilterType = {
  SortAndFilters: {
    min?: number;
    max?: number;
    sortType: SortType;
  };
  setSortAndFilters: (
    SortAndFilters: Partial<SortAndFilterType["SortAndFilters"]>
  ) => void;
};

export type productsType = {
  itemName: string;
  authorLink: string;
  authorName: string;
  imageCredit: string;
  imageSrc: string;
  price: number;
  quantity?: number;
};

export type checkoutItemStructure = {
  price_data: {
    currency?: string;
    product_data: { name: string };
    unit_amount: number;
  };
  quantity: number;
};

export type productsStorageType = Map<number, productsType>;

export const useIsSideNavOpened = create<{
  IsSideNavOpened: boolean;
  setIsSideNavOpened: (newIsSideNavOpened: boolean) => void;
}>((set) => ({
  IsSideNavOpened: false,
  setIsSideNavOpened: (newIsSideNavOpened) =>
    set({ IsSideNavOpened: newIsSideNavOpened }),
}));

export const useSortAndFilters = create<SortAndFilterType>((set) => ({
  SortAndFilters: {
    min: undefined,
    max: undefined,
    sortType: "LOW_TO_HIGH",
  },
  setSortAndFilters: (newSortAndFilters) => {
    set((current) => ({
      SortAndFilters: {
        ...current.SortAndFilters,
        ...newSortAndFilters,
      },
    }));
  },
}));

export function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return decodeURIComponent(cookie.substring(cookieName.length + 1));
    }
  }

  return null;
}

export async function fetchData(endpoint: string, requestData: any) {
  const response = await fetch(`${backendHost}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  return response.json().then((data) => data);
}

export async function checkout(
  itemsForCheckout: checkoutItemStructure[]
): Promise<string> {
  try {
    const response = await fetch(`${backendHost}checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemsForCheckout),
    });
    const data = await response.json();
    const url = data.url;

    if (url) return url;
    throw "no url";
  } catch (error) {
    throw error;
  }
}

export async function fetchPurchasedItems(orderNumber: string): Promise<any> {
  try {
    const response = await fetch(`${backendHost}getPurchasedItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNumber: orderNumber,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.paymentInfo;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

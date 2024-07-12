// export const backendHost =
//   process.env.NODE_ENV === "production"
//     ? "https://ksportsbackend.azurewebsites.net/api/"
//     : "http://localhost:5204/api/";

import { Session } from "next-auth";

export const backendHost = "https://ksportsbackend.azurewebsites.net/api/"

export const PRICE_SORT = ["price_asc", "price_desc"] as const;

export type SortType = (typeof PRICE_SORT)[number];

export type productsType = {
  itemName: string;
  authorLink?: string;
  authorName?: string;
  imageCredit?: string;
  imageSrc: string;
  price: number;
  quantity?: number;
  description: string
};

export type checkoutItemStructure = {
  PriceData: {
    Currency: string;
    ProductData: { Name: string };
    UnitAmount: number;
  },
  Quantity: number;
};

export type productsStorageType = Map<number, productsType>;

export type trackedItemsType = {
  deliveryDate: string,
  products: purchasedItemsFormat[]
}

export type purchasedItemsFormat = {
  price: number,
  name: string,
  quantity: number
};

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
  itemsForCheckout: checkoutItemStructure[],
  session: Session | null,
  checkUser: () => void
): Promise<string> {
  try {
    if (itemsForCheckout.length === 0) throw "Nothing to checkout"

    checkUser()

    const response = await fetch(`${backendHost}Checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkoutProducts: itemsForCheckout,
        email: session?.user?.email as string
      }),
    });

    const { url }: { url: string } = await response.json();

    if (url) return url
    else throw "no url"
  } catch (error) {
    console.error(error)
    throw error
  }
}


export async function fetchPurchasedItems(orderId: string, email: string): Promise<trackedItemsType> {
  try {
    const response = await fetch(`${backendHost}Checkout?orderId=${orderId}&email=${email}`)
    const items: trackedItemsType = await response.json()

    return items

  } catch (error) {
    throw error
  }
}

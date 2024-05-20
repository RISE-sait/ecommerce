export const backendHost =
  process.env.NODE_ENV === "production"
    ? "https://ksportsserver.azurewebsites.net/"
    : "http://localhost:8080/";

export const PRICE_SORT = ["LOW_TO_HIGH", "HIGH_TO_LOW"] as const;

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
  price_data: {
    currency?: string;
    product_data: { name: string };
    unit_amount: number;
  },
  quantity: number;
};

export type productsStorageType = Map<number, productsType>;

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


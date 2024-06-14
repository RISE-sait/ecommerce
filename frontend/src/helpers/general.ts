export const backendHost =
  process.env.NODE_ENV === "production"
    ? "https://ksportsbackend.azurewebsites.net/api/"
    : "http://localhost:5204/api/";

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


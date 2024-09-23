export const backendHost =
  process.env.NODE_ENV === "production"
    ? "https://ksportsbackend.azurewebsites.net/api/"
    : "http://localhost:5204/api/"

export const PRICE_SORT = ["price_asc", "price_desc"] as const
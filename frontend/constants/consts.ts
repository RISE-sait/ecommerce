export const backendHost =
  process.env.NODE_ENV === "production"
    ? "https://ksportsbackend.azurewebsites.net/api/"
    : "https://ksportsbackend.azurewebsites.net/api/"

export const PRICE_SORT = ["price_asc", "price_desc"] as const
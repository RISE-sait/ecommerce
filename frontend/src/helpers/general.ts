import { Session } from "next-auth";
import { create } from "zustand";

export const backendHost =
  process.env.NODE_ENV === "production"
    ? "https://ksportsserver.azurewebsites.net/"
    : "http://localhost:3001/";

export const PRICE_SORT = ["LOW_TO_HIGH", "HIGH_TO_LOW"] as const;

type UserPersonalInfoType = {
  email: string,
  name: string,
  image: string
}

type TOrUndefined<T> = T | undefined

enum CookieKeynames {
  Username = "username",
  Email = "email",
  Image = "image",
}

export class SessionInfo {

  public static document: Document

  private static getCookieValue(cookieName: string): TOrUndefined<String> {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const userCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));

    return userCookie ? userCookie.split('=')[1] : undefined;
  }

  public static get<T extends keyof typeof CookieKeynames>(cookieName: T): TOrUndefined<String> {
    return SessionInfo.getCookieValue(CookieKeynames[cookieName])
  }

  public static set session(session: Session) {

    const user = session.user as UserPersonalInfoType

    if (!user || !user.email || !user.name || !user.image) {
      throw new Error("Invalid user personal information");
    }

    const email = user.email
    const username = user.name
    const image = user.image

    document.cookie = `${CookieKeynames.Email} = ${email} ; ${CookieKeynames.Username} = ${username} ; ${CookieKeynames.Image} = ${image}`;
  }
}

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

  for (let j = 0; j < cookies.length; j++) {
    const cookie = cookies[j].trim();
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


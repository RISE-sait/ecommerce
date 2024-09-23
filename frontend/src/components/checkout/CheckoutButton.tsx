"use client"

import { checkoutItemStructure } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type CartType = {
    [key: string]: {
        itemName: string;
        imageSrc: string;
        quantity: number;
        price: string;
    };
}

export default function CheckoutButton() {

    const [cookies] = useCookies(["cart"]);
    const [itemsForCheckout, setItemsForCheckout] = useState<checkoutItemStructure[]>([])
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {

        if (!cookies.cart) return
        setItemsForCheckout(
            Object.values(cookies.cart as CartType).map(item => {
                const productName = item.itemName;
                const priceInCent = parseInt(item.price);
                const amount = item.quantity!!;

                // Assuming default currency is USD, modify as needed
                const currency = "USD";

                // Create the PriceData structure
                const priceData = {
                    Currency: currency,
                    ProductData: {
                        Name: productName,
                    },
                    UnitAmount: priceInCent,
                };

                // Return the item structure
                return {
                    PriceData: priceData,
                    Quantity: amount,
                };
            })
        )
    }, [cookies])

    return (
        <button
            onClick={async () => {

                const { checkout } = await import("@/helpers/helpers")
                const checkUser = () => status === "unauthenticated" && router.push(`${process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://k-sports.vercel.app/"}api/auth/signin`)

                const checkoutUrl = await checkout(itemsForCheckout, session, checkUser);
                window.location.href = checkoutUrl;
            }}
            className="ml-auto mt-[3vh] block bg-green-500 text-white text-xl py-[1vh] px-[4vw]"
        >
            Checkout
        </button>
    )
}


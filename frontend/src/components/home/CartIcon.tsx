"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaCartShopping } from "react-icons/fa6";

interface CartItem {
    itemName: string;
    imageSrc: string;
    quantity: number;
    price: number;
}

export default function CartIcon() {

    const [cookies] = useCookies(["cart"]);
    const cart: { [key: string]: CartItem } = cookies.cart || {};

    const [cartAmt, setCartAmt] = useState(0)

    useEffect(() => {
        if (cart) setCartAmt(Object.values(cart).reduce((acc, item) => acc + item.quantity, 0))
    }, [cookies.cart])

    return <Link href="/checkout">
        <div className={`fixed bottom-28 z-20 right-5 rounded-md text-3xl h-fit aspect-square pb-2 pt-7 pl-4 pr-7 bg-white shadow-2xl shadow-black border border-[rgb(229, 231, 235)]`}>
            <FaCartShopping className="fill-gray-500" />
            <p className="text-base font-semibold">Cart</p>
            <p className="absolute top-2 right-2 bg-blue-500 w-7 text-center aspect-square text-xl rounded-full">{
                cartAmt
            }</p>
        </div>
    </Link>

}
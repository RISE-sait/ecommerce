"use client"

import CheckoutButton from "@/components/checkout/CheckoutButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function CheckoutPage() {

  const [cookies, setCookie] = useCookies(["cart"]);

  const [cart, setCart] = useState<{
    [key: string]: {
      itemName: string;
      imageSrc: string;
      quantity: number;
      price: string;
    };
  }>({})

  useEffect(() => {
    setCart(cookies.cart)
  }, [cookies])

  return (
    <div className="max-w-container mx-auto px-4">
      <title>Cart</title>
      <h1 className="text-4xl font-bold my-6">Cart</h1>
      {
        !cart || Object.keys(cart).length === 0 ? <EmptyCart /> :
          <CheckoutItemsDisplay />
      }
    </div>
  );

  function CheckoutItemsDisplay() {

    const CheckoutItemsDisplay = Object.keys(cart).map(idStr => {
      const id = parseInt(idStr);
      return CheckoutItemCard({ id });
    });

    return (
      <div className="my-10 mx-8">
        {CheckoutItemsDisplay}
        <CheckoutButton />
      </div>
    )
  }

  function CheckoutItemCard({
    id,
  }: {
    id: number
  }) {

    const { imageSrc, itemName, price, quantity } = cart[id];

    const changeQuantity = (action: "Increment" | "Decrement") => {

      const newQuantity = action === "Increment" ? quantity + 1 : quantity - 1;

      setCookie("cart", {
        ...cart,
        [id]: {
          itemName: itemName,
          imageSrc: imageSrc,
          quantity: newQuantity,
          price: price,
        }
      })
    }

    return (
      <div
        key={id}
        className="flex justify-between flex-wrap gap-[2vw] mb-[2vh] py-[2vh] px-[10vw] border border-black rounded-xl"
      >
        <div className="relative w-[30vw]">
          <Image
            quality={50}
            fill={true}
            objectFit="contain"
            src={imageSrc}
            alt="Product image"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-between gap-[5vh]">
          <div>
            <p className="text-2xl m-0 mb-[2vh]">{itemName}</p>
            <p className="text-2xl">${price}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const { [id]: removedItem, ...restOfCart } = cart;

                setCookie("cart", restOfCart);
              }}
              className="bg-red-500 m-0 text-center py-0 px-[20px]"
              style={{ lineHeight: "6vh" }}
            >
              Remove
            </button>

            <div className="flex justify-evenly">
              <p
                className="w-[30px] cursor-pointer text-2xl"
                onClick={() => changeQuantity("Decrement")}>
                -
              </p>
              <p className="w-[30px] text-2xl">{quantity}</p>
              <p
                className="w-[30px] cursor-pointer text-2xl"
                onClick={() => changeQuantity("Increment")}>
                +
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function EmptyCart() {
  return <div className="shadow-lg px-3 py-6 text-center bg-white flex flex-col gap-3 max-w-[500px] mx-auto drop-shadow-2xl">
    <h3 className="text-xl font-bold">YOUR CART FEELS LONELY.</h3>
    <p>Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.</p>
    <button className="bg-black text-white rounded-md inline-block w-fit mx-auto p-3">Continue Shopping</button>
  </div>
}
"use client"

import { backendHost, checkoutItemStructure } from "@/helpers/general";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default () => (
  <SessionProvider>
    <CheckoutPage />
  </SessionProvider>
)

function CheckoutPage() {

  const router = useRouter()
  const { data: session, status } = useSession()

  const [cookies, setCookie] = useCookies(["cart"]);

  const [cart, setCart] = useState<{
    [key: string]: {
      itemName: string;
      imageSrc: string;
      quantity: number;
      price: string;
    };
  }>({})

  const checkUser = () => status === "unauthenticated" && router.push(`${process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://k-sports.vercel.app/"}api/auth/signin`)

  useEffect(() => {
    setCart(cookies.cart)
    checkUser()
  }, [cookies])

  const itemsForCheckout: checkoutItemStructure[] = cart
    ? Object.values(cart).map((item) => {
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
    : [];

  return (
    <SessionProvider>
      <div className="max-w-container mx-auto px-4">
        <h1 className="text-4xl font-bold my-6">Cart</h1>
        {
          !cart || Object.keys(cart).length === 0 ? <EmptyCart /> :
            <CheckoutItemsDisplay />
        }
      </div>
    </SessionProvider>
  );

  function CheckoutItemsDisplay() {

    const CheckoutItemsDisplay = Object.keys(cart).map(idStr => {
      const id = parseInt(idStr);
      return CheckoutItemCard({ id });
    });

    return (
      <div style={{ margin: "8vh 4vw" }}>
        {CheckoutItemsDisplay}
        <button
          onClick={async () => {
            const checkoutUrl = await checkout(itemsForCheckout);
            window.location.href = checkoutUrl;
          }}
          className="ml-auto mt-[3vh] block bg-green-500 text-white text-xl py-[1vh] px-[4vw]"
        >
          Checkout
        </button>
      </div>
    )
  }

  function CheckoutItemCard({
    id,
  }: {
    id: number
  }) {

    const { imageSrc, itemName, price, quantity } = cart[id];

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
                onClick={() => {
                  setCookie("cart", {
                    ...cart,
                    [id]: {
                      itemName: itemName,
                      imageSrc: imageSrc,
                      quantity: quantity - 1,
                      price: price,
                    },
                  });
                }}
              >
                -
              </p>
              <p className="w-[30px] text-2xl">{quantity}</p>
              <p
                className="w-[30px] cursor-pointer text-2xl"
                onClick={() => {
                  setCookie("cart", {
                    ...cart,
                    [id]: {
                      itemName: itemName,
                      imageSrc: imageSrc,
                      quantity: quantity + 1,
                      price: price,
                    },
                  });
                }}
              >
                +
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function checkout(
    itemsForCheckout: checkoutItemStructure[]
  ): Promise<string> {
    try {
      if (itemsForCheckout.length === 0) throw "Nothing to checkout"

      const response = await fetch(`${backendHost}Checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemsForCheckout),
      });
      const { url }: { url: string } = await response.json();

      if (url) return url
      throw "no url";
    } catch (error) {
      throw error;
    }
  }

}

function EmptyCart() {
  return <div className="shadow-lg px-3 py-6 text-center bg-white flex flex-col gap-3 max-w-[500px] mx-auto drop-shadow-2xl">
    <h3 className="text-xl font-bold">YOUR CART FEELS LONELY.</h3>
    <p>Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.</p>
    <button className="bg-black text-white rounded-md inline-block w-fit mx-auto p-3">Continue Shopping</button>
  </div>
}

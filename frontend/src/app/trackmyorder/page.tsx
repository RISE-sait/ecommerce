"use client";

import { backendHost } from "@/helpers/general";
import { SessionProvider, useSession } from "next-auth/react";
import { CSSProperties, useRef, useState } from "react";

type purchasedItemsFormat = {
  price: number,
  name: string,
  quantity: number
};

type trackedItemsType = {
  deliveryDate: string,
  products: purchasedItemsFormat[]
}

const styles: { [key: string]: CSSProperties } = {
  inputs: {
    border: "1px solid grey",
    borderRadius: "5px",
    width: "100%",
    lineHeight: "7vh",
    outline: "none",
    marginBottom: "2vh",
    textAlign: "center",
  },
};

export default () => <SessionProvider>
  <TrackMyOrderPage />
</SessionProvider>

function TrackMyOrderPage() {
  const [purchasedItems, setPurchasedItems] = useState<purchasedItemsFormat[]>([]);
  const orderIdInput = useRef<HTMLInputElement>(null);
  const [deliverStatus, setDeliverStatus] = useState<string>()

  const { data: session, status } = useSession()

  const getPurchasedItems = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status !== "authenticated") return

    const email = session.user?.email

    if (!email) return

    const orderIdElement = orderIdInput.current

    if (orderIdElement === null) throw "Try again"

    const { deliveryDate, products } = await fetchPurchasedItems(orderIdElement.value, session?.user?.email as string);

    if (deliveryDate && products.length > 0) {
      const deliverDate = new Date(deliveryDate)

      const today = new Date();
      const deliverDateString = deliverDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

      setDeliverStatus(() => {
        if (today < deliverDate) return `Products will be delivered at ${deliverDateString}`
        else if (today === deliverDate) return `Products will be delivered today`
        else return `Products should have been delivered. If not, please contact KSports`
      }
      )

      setPurchasedItems(products);
    }
  };

  return (
    <>
      <div className="my-[6vh] mx-[4vw]">
        <title>Track My Order</title>
        <form onSubmit={getPurchasedItems}>
          <p className="text-center my-[5vh] text-3xl">Track Order Status</p>
          <input
            ref={orderIdInput}
            name="orderId"
            type="text"
            style={styles.inputs}
            placeholder="   Order Number"
          />
          <button
            type="submit"
            className="w-full p-[2vh] bg-blue-600 text-white font-bold text-xl"
          >
            Track
          </button>
        </form>

        {purchasedItems.length > 0 ? (
          <div className="mt-14">

            <h3>{deliverStatus}</h3>
            {
              purchasedItems.map((item: purchasedItemsFormat, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-evenly items-center rounded-md mx-0 my-[2vh] py-[3vh] border border-black"
                  >
                    <p className="text-xl">{item.name}</p>
                    <p className="text-xl">
                      Price: ${item.price / 100}
                    </p>
                    <p className="text-xl">Quantity: {item.quantity}</p>
                  </div>
                );
              })
            }
          </div>
        ) : (
          <h3>No data</h3>
        )}
      </div>
    </>
  );
}

async function fetchPurchasedItems(orderId: string, email: string): Promise<trackedItemsType> {
  try {
    const response = await fetch(`${backendHost}Checkout?orderId=${orderId}&email=${email}`)
    const items: trackedItemsType = await response.json()

    return items

  } catch (error) {
    throw error
  }
}

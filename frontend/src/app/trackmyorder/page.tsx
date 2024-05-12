"use client";

import { fetchPurchasedItems } from "@/helpers/general";
import { useSession } from "next-auth/react";
import { CSSProperties, useRef, useState } from "react";

type purchasedItemsFormat = {
  itemName: string,
  quantity: number,
  price: number,
};

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

export default function TrackMyOrderPage() {
  const [purchasedItems, setPurchasedItems] = useState<any[]>([]);
  const [deliverDate, setDeliverDate] = useState<Date>();
  const form = useRef<HTMLFormElement>(null);
  const { data: session } = useSession()


  let deliverStatus;

  const today = new Date();

  if (deliverDate) {
    const deliverDateString = deliverDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    deliverStatus = (today < deliverDate) ? `Products will be delivered at ${deliverDateString}` :
      (today === deliverDate) ? `Products will be delivered today` :
        `Products have been delivered`;
  }

  const getPurchasedItems = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const orderNumber = form.current?.elements.namedItem(
      "number"
    ) as HTMLInputElement;

    console.log(session?.user?.email)
    const { purchase } = await fetchPurchasedItems(orderNumber.value, session?.user?.email as string);

    if (purchase) {
      setDeliverDate(new Date(purchase["deliverDate"]))

      setPurchasedItems(purchase.items);
    }
  };

  return (
    <>
      <div className="my-[6vh] mx-[4vw]">
        <form ref={form} onSubmit={getPurchasedItems}>
          <p className="text-center my-[5vh] text-3xl">Track Order Status</p>
          <input
            name="number"
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
                    <p className="text-xl">{item.itemName}</p>
                    <p className="text-xl">
                      Price: ${item.price}
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

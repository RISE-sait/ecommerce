"use client"

import { useCookies } from "react-cookie";
import { AddOrReduceEnum } from "./Display/DisplayItems";
import { productsType } from "@/helpers/general";

export default ({ productsInfo, display, show }: {
    productsInfo: productsType & {
        id: number
    }
} & (
        {
            display: "grid",
            show: boolean
        } | {
            display: "list"
            show?: never
        })

) => {

    const {
        id,
        itemName,
        price,
        imageSrc
    } = productsInfo

    const [cookies, setCookie] = useCookies(["cart"]);
    const cart = cookies.cart as {
        [key: string]: {
            itemName: string;
            imageSrc: string;
            quantity: number;
            price: number;
        };
    };

    const { quantity = 0 } = (cart && cart[id]) || {};

    function AddOrReduce(action: AddOrReduceEnum) {

        let newQuantity;
        if (quantity) {
            newQuantity = quantity + (action === AddOrReduceEnum.ADD ? 1 : -1);
        } else {
            newQuantity = action === AddOrReduceEnum.ADD ? 1 : 0;
        }

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

    function setNewQty(qty: number) {
        setCookie("cart", {
            ...cart,
            [id]: {
                itemName: itemName,
                imageSrc: imageSrc,
                quantity: qty,
                price: price,
            }
        })
    }


    return display === "list" ? <div className="flex absolute bottom-0 right-0 gap-2">
        <button onClick={() => AddOrReduce(AddOrReduceEnum.REDUCE)}>-</button>
        <input type="number" onChange={event => setNewQty(event.target.valueAsNumber)} min={0} defaultValue={quantity} className="w-12 text-center border border-black" />
        <button onClick={() => AddOrReduce(AddOrReduceEnum.ADD)}>+</button>
    </div> :
        <div className={`absolute bottom-0 overflow-hidden transition-all duration-300 bg-white left-0 right-0 w-full ${show ? "h-max py-5" : "h-0"}`}>
            <div className="h-full flex justify-center">
                <button className="border border-r-0 border-black size-10 text-xl text-center font-semibold" onClick={() => AddOrReduce(AddOrReduceEnum.REDUCE)}>-</button>
                <input type="number" min={0} value={quantity} className="w-12 text-center border border-black" onChange={event => setNewQty(event.target.valueAsNumber)} />
                <button className="border border-l-0 border-black size-10 text-xl px-3 text-center font-semibold" onClick={() => AddOrReduce(AddOrReduceEnum.ADD)}>+</button>
            </div>
        </div>
}
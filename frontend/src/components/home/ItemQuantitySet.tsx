"use client"

import { useCookies } from "react-cookie";
import { AddOrReduceEnum } from "./Display/DisplayItems";
import { ActionType, Notifications } from "../AddedItemNotifications";
import { productsType } from "@/types/types";

interface CartItem {
    itemName: string
    imageSrc: string
    quantity: number
    price: number
}

interface Props {
    productsInfo: productsType & { id: number }
    display: "grid" | "list"
    show?: boolean
}

export default ({ productsInfo, display, show }: Props) => {

    const { id, itemName, price, imageSrc } = productsInfo

    const [cookies, setCookie] = useCookies(["cart"]);
    const cart: { [key: string]: CartItem } = cookies.cart || {}

    const { quantity = 0 } = (cart && cart[id]) || {}

    const setNewQty = (newQuantity: number) => {
        setCookie("cart", {
            ...cart,
            [id]: { itemName, imageSrc, quantity: newQuantity, price },
        });
    }

    const addOrReduce = (action: AddOrReduceEnum) => {
        const newQuantity = Math.max(0, quantity + (action === AddOrReduceEnum.ADD ? 1 : -1))
        Notifications.updateNotificationQueue(action === AddOrReduceEnum.ADD ? ActionType.ADD : ActionType.REMOVE)
        setNewQty(newQuantity)
    };

    return display === "list" ? <div className="flex gap-2">
        <button onClick={() => addOrReduce(AddOrReduceEnum.REDUCE)}>-</button>
        <input type="number" onChange={event => setNewQty(event.target.valueAsNumber)} value={quantity} min={0} className="w-12 text-center border border-black" />
        <button onClick={() => addOrReduce(AddOrReduceEnum.ADD)}>+</button>
    </div> :
        <div className={`absolute bottom-0 overflow-hidden transition-all duration-300 bg-white left-0 right-0 w-full ${show ? "h-max py-5" : "h-0"} flex justify-center text-sm md:text-xl`}>
            <button className="border border-r-0 border-black size-10 text-center font-semibold" onClick={() => addOrReduce(AddOrReduceEnum.REDUCE)}>-</button>
            <input type="number" min={0} value={quantity} className="w-12 text-center border border-black" onChange={event => setNewQty(event.target.valueAsNumber)} />
            <button className="border border-l-0 border-black size-10 px-3 text-center font-semibold" onClick={() => addOrReduce(AddOrReduceEnum.ADD)}>+</button>
        </div>
}
import { useState } from "react"
import Image from "next/image";
import { productsType } from "@/helpers/general";
import { AddOrReduceEnum } from "./DisplayItems";
import { useCookies } from "react-cookie";

const GridItem = ((productsInfo: productsType & {
    id: number
}) => {

    const {
        id,
        itemName,
        price,
        imageSrc,
        authorLink,
        authorName,
        imageCredit,
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
        const globalQuant = quantity

        setCookie("cart", {
            ...cart,
            [id]: {
                itemName: itemName,
                imageSrc: imageSrc,
                quantity: quantity ? globalQuant + (action === AddOrReduceEnum.ADD ? 1 : -1) : (action === AddOrReduceEnum.ADD ? 1 : 0),
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

    const [show, displayShow] = useState(false)

    return (
        <div className="flex flex-col py-5 px-3" onMouseEnter={() => displayShow(true)} onMouseLeave={() => displayShow(false)}>
            <div className="relative basis-[40%] min-h-[40vh] ">
                <Image
                    quality={50}
                    fill={true}
                    sizes="100%"
                    alt="product"
                    src={imageSrc}
                />
            </div>
            <div className="flex mt-5 justify-between basis-[60%] items-stretch ">

                <div className="flex flex-col basis-[70%] justify-between flex-shrink-0 flex-grow-0">
                    <h4 className="mx-0 text-xl font-bold basis-[20%] flex-shrink-0">{itemName}</h4>

                    {authorLink !== null && authorName !== null && imageCredit !== null &&
                        <div className="text-base relative">
                            <h6 className="m-0 block">
                                Image by:{" "}
                                <a
                                    href={authorLink}
                                    className="text-[rgb(0, 0, 238)]"
                                    style={{ textDecoration: "none" }}
                                >
                                    {authorName}
                                </a>
                            </h6>
                            <a
                                href={imageCredit}
                                className="block font-bold text-sm"
                                style={{
                                    textDecoration: "none",
                                    color: "rgb(0, 0, 238)",
                                }}
                            >
                                Image source
                            </a>

                        </div>
                    }
                </div>
                <div className="flex flex-col justify-between items-center basis-[20%] overflow-hidden flex-shrink-0 flex-grow-0">
                    <h3 className="font-bold text-xl">${price}</h3>
                </div>
            </div>
            <div className={`absolute bottom-0 overflow-hidden transition-all duration-300 bg-white left-0 right-0 w-full ${show ? "h-max py-5" : "h-0"}`}>
                <div className="h-full flex justify-center">
                    <button className="border border-r-0 border-black size-10 text-xl text-center font-semibold" onClick={() => AddOrReduce(AddOrReduceEnum.REDUCE)}>-</button>
                    <input type="number" min={0} value={quantity} className="w-12 text-center border border-black" onChange={event => setNewQty(event.target.valueAsNumber)} />
                    <button className="border border-l-0 border-black size-10 text-xl px-3 text-center font-semibold" onClick={() => AddOrReduce(AddOrReduceEnum.ADD)}>+</button>
                </div>
            </div>
        </div>
    )
})

export default GridItem
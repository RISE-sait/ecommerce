import { productsType } from "@/helpers/general";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { AddOrReduceEnum } from "./DisplayItems";

const ListItem = ((productsInfo: productsType & {
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
        description,
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

    return (
        <div className="flex gap-6 relative mb-10">
            <div className="relative min-h-[30vh] max-h-[35vh] aspect-square basis-[20%]">
                <Image
                    className="rounded-md"
                    quality={50}
                    fill={true}
                    sizes="100%"
                    alt={imageSrc}
                    src={imageSrc}
                />
            </div>
            <div className="basis-[60%] text-2xl flex flex-col justify-between relative">
                <div>
                    <h4 className="font-bold">{itemName}</h4>
                    <h4 className="text-base font-normal" >{description}</h4>
                </div>
                <h3>
                    ${price.toString().includes('.') ? price : price.toFixed(2)}
                </h3>

                {authorLink && authorName && imageCredit &&
                    <div className="flex flex-col">
                        <h6 className="m-0 text-sm">
                            Image by:{" "}
                            <a
                                href={authorLink}
                                className="text-[rgb(0, 0, 238)]"
                                style={{ textDecoration: "none" }}
                            >
                                {authorName}
                            </a>
                        </h6>
                        <Link
                            href={imageCredit}
                            className="font-bold text-xs"
                            style={{
                                textDecoration: "none",
                                color: "rgb(0, 0, 238)",
                            }}
                        >
                            Image source
                        </Link>
                    </div>
                }
                <div className="flex absolute bottom-0 right-0 gap-2">
                    <button onClick={() => AddOrReduce(AddOrReduceEnum.REDUCE)}>-</button>
                    <input type="number" min={0} defaultValue={quantity} className="w-12 text-center border border-black" />
                    <button onClick={() => AddOrReduce(AddOrReduceEnum.ADD)}>+</button>
                </div>
            </div>

        </div>
    )
})

export default ListItem
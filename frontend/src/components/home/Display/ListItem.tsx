import Image from "next/image";
import Link from "next/link";
import ItemQuantitySet from "../ItemQuantitySet";
import { productsType } from "@/types/types";

export default function ListItem({ productsInfo }: {
    productsInfo: productsType & {
        id: number
    }
}) {

    const {
        itemName,
        price,
        imageSrc,
        authorLink,
        authorName,
        imageCredit,
        description,
    } = productsInfo

    return (
        <div className="flex gap-6 my-5 justify-center">
            <div className="relative ml-2 md:ml-0 max-h-[35vh] md:min-h-[30vh] basis-[30%] md:basis-[20%]">
                <div className="max-h-[90%] relative aspect-square">
                    <Image
                        className="rounded-md"
                        quality={50}
                        fill={true}
                        sizes="100%"
                        alt={itemName}
                        src={imageSrc}
                    />
                </div>
                {authorLink && authorName && imageCredit &&

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
                }
            </div>
            <div className="basis-[60%] md:basis-[60%] text-2xl flex flex-col justify-between">
                <h4 className="font-bold">{itemName}</h4>
                <h4 className="text-base font-normal line-clamp-4" >{description}</h4>
                <div className="flex justify-between">
                    <h3>
                        ${price.toString().includes('.') ? price : price.toFixed(2)}
                    </h3>
                    <ItemQuantitySet productsInfo={productsInfo} display={"list"} />
                </div>
            </div>

        </div>
    )
}
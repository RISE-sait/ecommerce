import { productsType } from "@/helpers/general";
import Image from "next/image";
import Link from "next/link";
import ItemQuantitySet from "../ItemQuantitySet";

export default function ListItem({ productsInfo }: {
    productsInfo: productsType & {
        id: number
    }
}) {

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
                <ItemQuantitySet productsInfo={productsInfo} display={"list"} />
            </div>

        </div>
    )
}
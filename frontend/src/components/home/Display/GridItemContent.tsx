import { productsType } from "@/types/types"
import Image from "next/image"

export default function ({ productsInfo }: {
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
    } = productsInfo

    return (
        <>
            <div className="relative min-h-[35vh] ">
                <Image
                    quality={50}
                    fill={true}
                    objectFit="contain"
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
        </>
    )
}
"use client"

import { PRICE_SORT } from "@/helpers/general";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";

export type TypeIsDisplayGrid = "true" | "false" | null

export default function ShopOptions() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();

    return <div className="flex justify-between items-center">
        <DisplayOrientationSelections />
        <div className="flex items-center gap-5 text-xl">
            <div>
                <label>Sort by: </label>
                <select className="border-2 border-black" onChange={event => {
                    const current = new URLSearchParams(Array.from(searchParams.entries()))
                    current.set("sortType", event.target.value)

                    router.push(`${pathname}?${current.toString()}`)
                }}>
                    <option value={PRICE_SORT[0]}>
                        Price: Low to High
                    </option>
                    <option value={PRICE_SORT[1]}>
                        Price: High to Low
                    </option>
                </select>
            </div>

            <div>
                <label>Show: </label>
                <select className="border-2 border-black" onChange={event => {
                    const current = new URLSearchParams(Array.from(searchParams.entries()))
                    current.set("showAmt", event.target.value)

                    router.push(`${pathname}?${current.toString()}`)
                }}>
                    <option>
                        10
                    </option>
                    <option>
                        20
                    </option>
                    <option>
                        30
                    </option>
                </select>
            </div>
        </div>
    </div>
}


function DisplayOrientationSelections() {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const isDisplayGrid = (current.get('displayGrid') as TypeIsDisplayGrid) ?? "true"

    return <div className="flex gap-6 items-center">
        <BsGridFill onClick={() => updateDisplayGrid("true")} className={`box-content ${isDisplayGrid ? "text-white bg-black" : "text-black bg-white"} border border-gray-500 p-3 text-2xl`} />

        <ImList onClick={() => updateDisplayGrid("false")} className={`box-content ${!isDisplayGrid ? "text-white bg-black" : "text-black bg-white"} border border-gray-500 p-3 text-2xl`} />
    </div>

    function updateDisplayGrid(displayGrid: "true" | "false") {
        current.set('displayGrid', displayGrid)

        const search = current.toString();
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);
    }
}


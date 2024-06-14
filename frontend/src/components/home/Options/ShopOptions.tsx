"use client"

import { PRICE_SORT } from "@/helpers/general";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export type TypeIsDisplayGrid = "true" | "false" | null

export default function ShopOptions() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();

    return <div className="flex items-center gap-5 text-xl">
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
                current.set("limit", event.target.value)

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
}
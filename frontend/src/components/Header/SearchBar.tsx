"use client"

import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import { useProductAndWordsContext } from "@/contexts/ProductsAndWordsContext";

export default function SearchBar() {

    const pathname = usePathname()

    return pathname === "/" ? <div className="flex w-3/5 border border-black items-center p-2 rounded-md ml-3">
        <SearchProductInput />
        <FaSearch className="w-5 h-5 text-xl" />
    </div> : <></>
}

function SearchProductInput() {
    const [searchTerm, setSearchTerm] = useState<string>();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname()
    const { startTransition } = useProductAndWordsContext()

    const updateUrlQuery = () => {
        startTransition(() => {
            const current = new URLSearchParams(Array.from(searchParams.entries()));
            if (searchTerm) {
                current.set("contains", searchTerm);
            } else {
                current.delete("contains");
            }
            router.push(`${pathname}?${current.toString()}`)
        })
    }

    useEffect(() => {
        const contains = searchParams.get('contains')

        if (typeof(contains) === "string") setSearchTerm(contains)
    }, [searchParams])

    useEffect(() => {

        const handler = setTimeout(updateUrlQuery, 500)

        return () => clearTimeout(handler);
    }, [searchTerm])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && updateUrlQuery()

    return (
        <input
            className="bg-transparent h-full flex-grow outline-none placeholder:text-black placeholder:text-md md:placeholder:text-xl "
            type="text"
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            value={searchTerm}
            placeholder="Search products here"
        />
    )
}
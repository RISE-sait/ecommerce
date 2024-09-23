"use client"

import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";

export default function SearchProductInput() {
    const [searchTerm, setSearchTerm] = useState<string>();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname()

    const updateUrlQuery = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (searchTerm) {
            current.set("contains", searchTerm);
        } else {
            current.delete("contains");
        }
        router.push(`${pathname}?${current.toString()}`);
    }

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
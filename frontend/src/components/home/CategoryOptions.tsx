"use client"

import client from "@/helpers/apollo";
import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SSRCategoryOptions from "./SSRCategoryOptions";

export default function CategoryOptions({ children }: { children: JSX.Element }) {
    return <>
        <h3 className="text-2xl  font-semibold">Shop by Category</h3>
        <CategoriesListing parentSubtypes={[]} ssrElement={children} />
    </>
}

function CategoriesListing({ parentSubtypes, ssrElement }: { parentSubtypes: string[], ssrElement?: JSX.Element }) {
    const [subtypes, setSubtypes] = useState<string[]>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        try {
            (async () => {
                const subtypesQuery = parentSubtypes.length > 0
                    ? `(subtypes: [${parentSubtypes.map(subtype => `"${subtype}"`).join(',')}])`
                    : '';

                const GetProductsQuery: DocumentNode =
                    gql`
                        query  {
                            info${subtypesQuery}
                    {
                        subtypes
                    }
                }
            `
                const { data, networkStatus, error } = await client.query({
                    query: GetProductsQuery,
                });

                setSubtypes(data.info.subtypes);
            })()
        }
        catch (error) {
            setError(error);

        }
    }, []);

    if (!ssrElement) return <>{subtypes.map(subtype => <CategoriesListItem parentSubtypes={parentSubtypes} subtype={subtype} />)}</>

    return subtypes.length > 0 ? <>{subtypes.map(subtype => <CategoriesListItem parentSubtypes={parentSubtypes} subtype={subtype} />)}</> : <>{ssrElement}</>
}

function CategoriesListItem({ subtype, parentSubtypes }: { subtype: string, parentSubtypes: string[] }) {

    const [isClosed, setIsClosed] = useState<boolean>(true)
    const [isHovered, setIsHovered] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams();
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const pathname = usePathname()

    return <div className={`my-3 text-gray-500 cursor-pointer text-xl relative`}>
        <div className="flex justify-between" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <h2 style={{ paddingLeft: `${parentSubtypes.length * 25}px` }} onClick={() => setIsClosed(!isClosed)}>{isClosed ? "+" : "-"} {subtype}</h2>
            {
                isHovered && <button className="text-white bg-green-800 px-3 mr-0 absolute top-0 right-0" onClick={() => {
                    current.set("subtypes", parentSubtypes.concat(subtype).join(','))

                    router.push(`${pathname}?${current.toString()}`)
                }}>Search</button>
            }
        </div>

        {!isClosed && <CategoriesListing parentSubtypes={parentSubtypes.concat(subtype)} />
        }
    </div>
}
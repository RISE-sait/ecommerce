"use client"

import { useProductAndWordsContext } from "@/contexts/ProductsAndWordsContext";

export default function ({count}:{count: number}) {
  const { isPending } = useProductAndWordsContext()

  return <h3 className="font-semibold text-xl mb-4">{isPending ? "Loading" : count + " items"}</h3>
}
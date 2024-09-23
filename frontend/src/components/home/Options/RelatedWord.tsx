import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TransitionStartFunction } from "react"

export default function RelatedWord({ word, productCount, startTransition }: {startTransition: TransitionStartFunction, word: string, productCount: number }) {

    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()

    const newSearchParams = new URLSearchParams(searchParams)
    const keywords = newSearchParams.get('keywords')

    const isSelected = keywords?.includes(word) ?? false

    return <div onClick={() => {
        startTransition(() => {
            if (keywords === null) {
                newSearchParams.set('keywords', `${word}`)
                router.push(path + '?' + newSearchParams.toString())
                return
            }

            const keywordsList = keywords.split(',')

            if (keywordsList.includes(word)) {
                if (keywordsList.length === 1) newSearchParams.delete('keywords')
                else newSearchParams.set('keywords', `${keywordsList.filter(item => item !== word)}`)
            }
            else newSearchParams.set('keywords', `${keywordsList.concat(word)}`)

            router.push(path + '?' + newSearchParams.toString())

        })
    }} className={`cursor-pointer relative border rounded-md border-black px-2 ${isSelected ? "bg-blue-700 text-white" : ""}`}>
        <p>{word}</p>
        <p className="absolute -top-3 -right-3 border border-white bg-black text-white rounded-full px-2 text-sm">{productCount}</p>
    </div>

}
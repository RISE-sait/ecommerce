import { backendHost } from "@/helpers/general";
import RelatedWord from "./RelatedWord"

type WordType = {
    id: number,
    word: string,
    productCount: number
}

export default async function RelatedWordsOptions({ searchParams }: { searchParams: any }) {

    const { contains, keywords } = searchParams

    const queryParams = {
        contains: contains && `contains=${contains}`,
        keywords: keywords && `keywords=${keywords}`
    };

    let queryString = Object.values(queryParams)
        .filter(param => param)
        .join('&');

    queryString = `${queryString.length > 0 ? '?' : ''}${queryString}`

    const response = await fetch(`${backendHost}Words${queryString}`, { cache: "no-cache" })
    const data: WordType[] = await response.json()

    return <>
        <h3 className="text-2xl  font-semibold mt-4">Shop by related keywords</h3>
        <div className="flex flex-wrap gap-x-7 gap-y-5 mb-16 mt-4">
            {
                data.map(item => <RelatedWord word={item.word} count={item.productCount} key={item.id} />)
            }
        </div>
    </>
}
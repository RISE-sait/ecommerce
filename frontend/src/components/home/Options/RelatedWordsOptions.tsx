import { backendHost, fetchData } from "@/helpers/general";
import RelatedWord from "./RelatedWord"

type WordType = {
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

    const data: WordType[] = await fetchData(`Words${queryString}`)

    return <>
        <h3 className="text-2xl  font-semibold mt-4">Shop by related keywords</h3>
        <div className="flex flex-wrap gap-x-7 gap-y-5 mb-16 mt-4">
            {
                data.map(item => <RelatedWord word={item.word} count={item.productCount} key={item.word} />)
            }
        </div>
    </>
}
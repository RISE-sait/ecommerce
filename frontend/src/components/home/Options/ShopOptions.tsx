import { SearchParams } from "@/types/types";
import { useRouter } from "next/navigation";
import { PRICE_SORT } from "../../../../constants/consts";
import { useProductAndWordsContext } from "@/contexts/ProductsAndWordsContext";

export default function ShopOptions({ searchParams }: { searchParams: SearchParams }) {

    const { startTransition } = useProductAndWordsContext()

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const current = new URLSearchParams(searchParams as Record<string, string>);
        current.set("sort", event.target.value);
        return `/?${current.toString()}`;
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const current = new URLSearchParams(searchParams as Record<string, string>);
        current.set("limit", event.target.value);
        return `/?${current.toString()}`;
    }

    const router = useRouter()

    return (
        <div className="flex items-center gap-5 text-xl">
            <div>
                <label>Sort by: </label>
                <select className="border-2 border-black"
                    value={searchParams.sort}
                    onChange={event => {
                        startTransition(() => {
                            const url = handleSortChange(event);
                            router.push(url)
                        })
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
                <select className="border-2 border-black"
                    value={searchParams.limit}
                    onChange={event => startTransition(() => {
                        const url = handleLimitChange(event);
                        router.push(url)
                    })
                    }>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </div>
    );
}

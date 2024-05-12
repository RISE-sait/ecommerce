import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { Dispatch, SetStateAction } from "react";

export default function DisplayOrientationSelections({ isDisplayGrid, setIsDisplayGrid }: {
    isDisplayGrid: boolean,
    setIsDisplayGrid: Dispatch<SetStateAction<boolean>>
}) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const current = new URLSearchParams(Array.from(searchParams.entries()));

    return <div className="flex gap-6 items-center">
        <BsGridFill onClick={() => setIsDisplayGrid(true)} className={`box-content ${isDisplayGrid ? "text-white bg-black" : "text-black bg-white"} border border-gray-500 p-3 text-2xl`} />

        <ImList onClick={() => setIsDisplayGrid(false)} className={`box-content ${!isDisplayGrid ? "text-white bg-black" : "text-black bg-white"} border border-gray-500 p-3 text-2xl`} />
    </div>

    function updateDisplayGrid(displayGrid: "true" | "false") {
        current.set('displayGrid', displayGrid)

        const search = current.toString();
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);
    }
}


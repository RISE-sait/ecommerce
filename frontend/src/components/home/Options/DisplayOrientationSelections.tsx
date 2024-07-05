import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { Dispatch, SetStateAction } from "react";

export default function DisplayOrientationSelections({ isDisplayGrid, setIsDisplayGrid }: {
    isDisplayGrid: boolean,
    setIsDisplayGrid: Dispatch<SetStateAction<boolean>>
}) {

    return <div className="gap-6 items-center hidden md:flex">
        <BsGridFill onClick={() => setIsDisplayGrid(true)} className={`box-content ${isDisplayGrid ? "text-white bg-black" : "text-black bg-white"} border border-gray-500 p-3 text-2xl`} />

        <ImList onClick={() => setIsDisplayGrid(false)} className={`box-content ${!isDisplayGrid ? "text-white bg-black" : "text-black bg-white"} border border-gray-500 p-3 text-2xl`} />
    </div>
}


"use client"

import { useEffect, useState } from "react"
import BannerItems from "./BannerItems"

export default function Banner() {

    const [transformX, setTransformX] = useState(0);

    useEffect(() => {
        setTimeout(() => {

            if (transformX !== -200 && transformX !== 0) {
                if (Math.random() < 0.5) handleGoRight()
                else handleGoLeft()
            }
            else if (transformX !== 0) handleGoLeft()
            else handleGoRight()
        }, 2000);
    })

    const handleGoLeft = () => transformX !== 0 && setTransformX(transformX + 100);
    const handleGoRight = () => transformX !== -200 && setTransformX(transformX - 100);

    return BannerItems.length > 0 ? (
        <div className="overflow-hidden whitespace-nowrap w-full h-[25vh] sm:h-[30vh] lg:h-[40vh] ssm:w-[90%] sm:w-[70%] mx-auto md:w-[55%] xl:w-[45%]">
            {BannerItems.map((item, id) => {
                return <div key={id}
                    className="inline-block h-full w-full my-0 mx-auto transition-transform duration-500 ease-in-out transform"
                    style={{ transform: `translateX(${transformX}%)` }}>
                    <div className="w-[90%] h-full mx-auto relative">
                        {item}
                    </div>
                </div>
            }
            )}
        </div>) : <h1>Nothing to show</h1>
}
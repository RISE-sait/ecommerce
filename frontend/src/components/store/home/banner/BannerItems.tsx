import Image from "next/image";

const BannerProductsInfo:
    Map<number, string> = new Map([
        [2, 'https://klintstorage.blob.core.windows.net/klintstorage/grailify-ju4-jsQ8jmk-unsplash.jpg'],
        [3, 'https://klintstorage.blob.core.windows.net/klintstorage/usama-akram-kP6knT7tjn4-unsplash.jpg'],
        [8, 'https://klintstorage.blob.core.windows.net/klintstorage/eddie-palmore-XwWGyrVidZE-unsplash.jpg']])

const BannerItems: JSX.Element[] = []


BannerProductsInfo.forEach(value => {
    BannerItems.push(<div className="flex items-center h-full w-[80%] mx-auto relative">
        <Image priority loading="eager" fill={true} alt="image" src={value} style={{objectFit:"contain"}}/>
    </div>)
})

export default BannerItems;
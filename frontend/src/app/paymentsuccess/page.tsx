import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Payment Success',
}

export default ({ searchParams }: { searchParams: { orderID: string } }) => {

    const orderId = searchParams.orderID

    return <div className="text-center">

        <div className="my-[5vh] px-[5vw]">
            <h1>Payment Success</h1>
            <h3 className="my-[5vh] break-words">Order ID: {orderId}</h3>
            <h3>Your order ID allows you to keep track of your order at</h3>
            <a className="underline hover:cursor-pointer" href="/trackmyorder">Track your order</a>
        </div>
    </div>
}


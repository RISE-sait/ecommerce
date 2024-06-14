"use client"

import { DocumentNode } from "graphql";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default ({ searchParams }: { searchParams: { orderID: string } }) => {
    const { data: session } = useSession()

    const orderId = searchParams.orderID

    // useEffect(() => {

    //     if (!session?.user?.email) return

    //     const email = session.user.email;

    //     (async () => {
    //         const query: DocumentNode = gql`
    //     mutation {
    //   addPurchase(orderId:"${orderId}", email:"${email}") 
    // }
    // `
    //         const { data, errors } = await client.mutate({
    //             mutation: query,
    //         })

    //         if (errors) console.error(errors)

    //     })()


    // }, [session?.user?.email])


    return <div className="text-center">

        <div className="my-[5vh] px-[5vw]">
            <h1>Payment Success</h1>
            <h3 className="my-[5vh] break-words">Order ID: {orderId}</h3>
            <h3>Your order ID allows you to keep track of your order at</h3>
            <a className="underline hover:cursor-pointer" href="/trackmyorder">Track your order</a>
        </div>
    </div>
}


"use client"

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaCaretDown } from "react-icons/fa";

export default function UserOptions() {

    const [showUserOptions, setShowUserOptions] = useState(false)

    const { data: session, status } = useSession()
    const router = useRouter()

    function checkUser() {

        if (status === 'loading') return

        status === "unauthenticated" && router.push(`${process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://k-sports.vercel.app/"}api/auth/signin`)
    }

    return (
        <div className="relative font-medium text-center text-base px-3 cursor-pointer text-[#767676]">
            <div onClick={() => setShowUserOptions(curr => !curr)} className="items-center hidden md:flex">
                <FaUser />
                <FaCaretDown />
            </div>
            <div className={`absolute top-7 right-0 text-center w-40 mx-auto ${showUserOptions ? "block" : "hidden"} bg-white border border-black px-1 py-3`}>
                {
                    session?.user ?
                        <>
                            <h4>{session.user.name}</h4>
                            <button onClick={() => signOut()} className="bg-white text-black">Sign out</button>
                        </>
                        :
                        <>
                            <h5>You're not signed in</h5>
                            <button onClick={checkUser} className="bg-white text-black">Sign in with Google</button>
                        </>
                }
            </div>
        </div>
    )
}
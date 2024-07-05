"use client"

import React, { ChangeEvent, useEffect, useState } from "react";
import { FaSearch, FaUser, FaCaretDown, FaHamburger } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";

type NavLinkProp = {
  title: string,
  link: string
}

export const NavLinks: NavLinkProp[] = [
  {
    link: '/',
    title: "Home"
  },
  {
    link: '/trackmyorder',
    title: "Track My Order"
  }
]

function Header(
  { setIsSideNavOpen }
    : {
      setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) {
  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()

  const [searchTerm, setSearchTerm] = useState<string>();
  const [showUserOptions, setShowUserOptions] = useState(false)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    const handler = setTimeout(() => {
      if (searchTerm) current.set("contains", searchTerm)
      else if (searchTerm === undefined || searchTerm === "") current.delete("contains")

      router.push(`${pathname}?${current.toString()}`)
    }, 500)

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div className="w-full bg-[#F5F5F3] sticky top-0 z-10">
      <div className="max-w-container mx-auto">
        <div className="flex items-center justify-between px-4 pb-4 lg:pb-0 h-24">
          <Link href="/">
            <h3 className="bg-blue-500 text-white font-bold text-md md:text-xl px-3 py-2">KSPORTS</h3>
          </Link>
          <div className="flex w-[55vw] border border-black items-center p-2 rounded-md ml-3">
            <input
              className="bg-transparent h-full flex-grow outline-none placeholder:text-black placeholder:text-md md:placeholder:text-xl "
              type="text"
              onChange={handleSearchChange}
              value={searchTerm}
              placeholder="Search products here"
            />
            <FaSearch className="w-5 h-5 text-xl" />
          </div>
          {NavLinks.map(({ title, link }) => (
            <Link
              key={title}
              className="font-semibold h-6 justify-center items-center flex-grow text-center text-base text-[#767676] hover:underline underline-offset-[4px] 
              decoration-[2px] hover:text-[#262626] border-r-[2px] px-3 border-r-gray-300 last:border-r-0 hidden md:inline"
              href={link}
            >
              <li className="list-none text-nowrap">{title}</li>
            </Link>
          ))}

          {/* phone display */}
          <div className="relative flex-grow text-center">
            <div onClick={() => setShowUserOptions(curr => !curr)} className="font-normal text-[#767676] h-6 px-6 justify-center items-center hidden md:flex">
              <FaUser />
              <FaCaretDown />
            </div>
            <div className={`absolute top-7 left-0 right-0 text-center w-40 mx-auto ${showUserOptions ? "block" : "hidden"} bg-white border border-black px-1 py-3`}>
              {
                session?.user ?
                  <>
                    <h4>{session.user.name}</h4>
                    <button onClick={() => signOut()} className="bg-white text-black">Sign out</button>
                  </>
                  :
                  <>
                    <h5>You're not signed in</h5>
                    <button onClick={() => signIn('google')} className="bg-white text-black">Sign in with Google</button>
                  </>
              }
            </div>
          </div>

          {/* larger devices display */}
          <GiHamburgerMenu onClick={() => setIsSideNavOpen(true)} className="inline md:hidden text-3xl" />
        </div>
      </div>


    </div>
  );
};

export default ({
  setIsSideNavOpen }
  : {
    setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) => (
  <SessionProvider>
    <Header setIsSideNavOpen={setIsSideNavOpen} />
  </SessionProvider>
)
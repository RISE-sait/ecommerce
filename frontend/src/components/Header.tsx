"use client"

import React, { ChangeEvent, useEffect, useState } from "react";
import { FaSearch, FaUser, FaCaretDown } from "react-icons/fa";
import Link from "next/link";
import { NavLinks } from "@/helpers/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionInfo } from "@/helpers/general";

export default function Header() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()

  const [searchTerm, setSearchTerm] = useState<string>();
  const [showUserOptions, setShowUserOptions] = useState(false)

  // Update searchTerm state on user input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  // Apply debouncing effect
  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    if (!SessionInfo.get("Email") && session?.user) {
      SessionInfo.session = session
    }

    const handler = setTimeout(() => {
      if (searchTerm) current.set("itemName", searchTerm)
      else if (searchTerm === undefined || searchTerm === "") current.delete("itemName")

      router.push(`${pathname}?${current.toString()}`)
    }, 500)

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div className="w-full bg-[#F5F5F3] sticky top-0 z-10">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <Link href="/">
            <h3 className="bg-blue-500 text-white font-bold text-xl px-3 py-2">KSPORTS</h3>
          </Link>
          <div className="flex w-full border border-black items-center p-2 rounded-md ml-3">
            <input
              className="bg-transparent h-full flex-grow outline-none placeholder:text-black placeholder:text-xl"
              type="text"
              onChange={handleSearchChange}
              value={searchTerm}
              placeholder="Search for products here"
            />
            <FaSearch className="w-5 h-5" />
          </div>
          {NavLinks.map(({ title, link }) => title !== "Cart" && (
            <Link
              key={title}
              className="font-semibold h-6 justify-center items-center px-8 text-base text-[#767676] hover:underline underline-offset-[4px] 
              decoration-[2px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 last:border-r-0"
              href={link}
            >
              <li className="list-none text-nowrap">{title}</li>
            </Link>
          ))}
          <div className="relative">
            <div onClick={() => { }} className="flex font-normal text-[#767676] h-6 px-6 items-center">
              <FaUser />
              <FaCaretDown />
            </div>
            <div className="absolute top-7 left-0 right-0 text-center">
              {
                session?.user ?
                  <h4>{session.user.name}</h4>
                  :
                  <>
                    <h5>You're not signed in</h5>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
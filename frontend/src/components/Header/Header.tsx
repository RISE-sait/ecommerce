import React from "react";
import Link from "next/link";
import HamburgerMenuIcon from "./HamburgerMenuIcon";
import UserOptions from "./UserOptions";
import { NavLinkProp } from "@/types/types"
import SearchBar from "./SearchBar";

const NavLinks: NavLinkProp[] = [
  {
    link: '/',
    title: "Home"
  },
  {
    link: '/trackmyorder',
    title: "Track My Order"
  }
]

export default function Header() {

  return (
    <header className="w-full bg-[#F5F5F3] sticky top-0 z-10">
      <div className="max-w-container mx-auto flex items-center justify-between px-4 pb-4 lg:pb-0 h-24">
        <Link href="/">
          <h3 className="bg-blue-500 text-white font-bold text-md md:text-xl px-3 py-2">KSPORTS</h3>
        </Link>
        <SearchBar/>
        <div className="w-1/3 flex items-center">
          {NavLinks.map(({ title, link }) => (
            <Link
              key={title}
              className="font-semibold text-center text-base text-[#767676] hover:underline underline-offset-[4px] 
              decoration-[2px] hover:text-[#262626] border-r-[2px] px-7 border-r-gray-300 last:border-r-0 hidden md:inline"
              href={link}
            >
              <p>{title}</p>
            </Link>
          ))}

          {/* Larger devices display */}
          <UserOptions />
          {/* Phones display */}
          <HamburgerMenuIcon />
        </div>
      </div>
    </header>
  );

}
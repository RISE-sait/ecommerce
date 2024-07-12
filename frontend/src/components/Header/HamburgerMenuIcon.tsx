"use client"

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SideNav from "../SideNav";

export default function HamburgerMenuIcon() {

    const [isSideNavOpen, setIsSideNavOpen] = useState(false)

    return (
        <>
            <GiHamburgerMenu onClick={() => {
                setIsSideNavOpen(true)
                document.body.classList.add('sidenav-open');
            }} className="inline md:hidden text-3xl" />
            <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
        </>
    )
}
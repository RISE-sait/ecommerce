import Link from "next/link";

export default function SideNav(
    {
        isSideNavOpen, setIsSideNavOpen }
        : {
            isSideNavOpen: boolean,
            setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>
        }) {

    return <nav className={`inset-0 bg-blue-500 z-20 text-white text-2xl pl-6 pt-16 flex flex-col gap-10 transition-all duration-200 ${isSideNavOpen ? "absolute" : "hidden"}`}>
        <Link className="hover:underline" href={"/"} onClick={() => setIsSideNavOpen(false)}><p>HOME</p></Link>
        <Link href={"/trackmyorder"} className="hover:underline" onClick={() => setIsSideNavOpen(false)}> <p>TRACK MY ORDER</p></Link>
    </nav >
}
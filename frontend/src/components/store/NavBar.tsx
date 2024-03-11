"use client";

import { useIsSideNavOpened } from "@/helpers/general";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useCookies } from "react-cookie";

function NavBar() {
  const { setIsSideNavOpened } = useIsSideNavOpened();

  const router = useRouter();

  const [cookies] = useCookies(["cart"]);

  const cart = cookies.cart as {
    [key: string]: {
      itemName: string;
      imageSrc: string;
      quantity: number;
      price: string;
    };
  };

  const totalQuantity = useMemo(() => {
    if (!cart) return 0;

    return Object.values(cart).reduce(
      (total, curr) => total + curr.quantity,
      0
    );
  }, [cart]);

  return (
    <nav className="flex justify-between items-center py-4 pt-6 px-0">
      <img
        className="navIcons"
        width={500}
        height={500}
        alt="menu-button"
        onClick={() => setIsSideNavOpened(true)}
        src={"/icons/hamburger.png"}
      />

      <h3
        onClick={() => router.push("/")}
        className="cursor-pointer bg-blue-600 absolute left-1/2 px-4 py-2 text-white transform -translate-x-1/2"
      >
        K Sports
      </h3>

      <div className="flex items-center gap-[2vw]">
        <div>
          <img
            alt="cart"
            className="navIcons"
            src="/icons/cart.png"
            onClick={() => router.push("/checkout")}
          />
          <div
            className="flex items-center justify-center text-lg top-1 absolute right-[-20px] bg-blue-500
               p-1 h-8 w-8 text-center aspect-square rounded-full"
          >
            {totalQuantity}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default dynamic(() => Promise.resolve(NavBar), {
  ssr: false,
});

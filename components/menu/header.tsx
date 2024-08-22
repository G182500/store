import SidebarMenu from "./sidebar-menu";
import Image from "next/image";
import { LogOut, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex bg-[#1d1d1d] items-center justify-around py-3 w-full fixed z-10">
      <div className="flex items-center gap-3">
        <SidebarMenu />
        <Link href="/">
          <Image
            src="/next.svg"
            alt="Next Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </Link>
      </div>
      <div className="flex gap-6">
        <Link href="/cart">
          <ShoppingCart size={25} />
        </Link>
        <User2 size={25} />
        <LogOut size={25} />
      </div>
    </div>
  );
}

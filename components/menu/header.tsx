import SidebarMenu from "./sidebar-menu";
import Image from "next/image";
import { LogOut, User2 } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex bg-[#1d1d1d] items-center justify-around py-3 w-full fixed z-10">
      <div className="flex flex-row items-center gap-3">
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
      <div className="flex flex-row items-center gap-6">
        <div className="flex font-medium gap-1 text-lg ">
          <User2 size={24} />
          Gabriel
        </div>
        <LogOut size={23} />
      </div>
    </div>
  );
}

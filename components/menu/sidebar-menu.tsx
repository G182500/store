"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchInput from "../search-input";
import {
  HomeIcon,
  MenuIcon,
  ShoppingCart,
  TextSearch,
  SquarePlus,
  User2,
  X,
  Instagram,
  Linkedin,
  Settings,
  GalleryVerticalEnd,
} from "lucide-react";

export default function SidebarMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const changeStatus = () => setIsOpen(!isOpen);

  const isAdmin = true;

  const buttonStyle = "text-gray-300 hover:text-white hover:cursor-pointer";
  const animation = isOpen ? "py-3 px-4 w-80" : "w-0 p-0 pointer-events-none";

  const opacityEffect = isOpen
    ? "opacity-100 duration-1000"
    : "opacity-0 duration-0";

  return (
    <div className="flex">
      <MenuIcon
        id="trigger"
        className={buttonStyle}
        size={32}
        onClick={changeStatus}
      />
      <div
        id="content-bg"
        className={`fixed bg-[#505050] h-screen top-0 left-0 z-20 duration-300 ${animation}`}
      >
        <div
          id="content"
          className={`flex flex-col px-1 space-y-4 transition ${opacityEffect}`}
        >
          <X
            size={28}
            strokeWidth={3}
            className={`${buttonStyle} self-end`}
            onClick={changeStatus}
          />

          <SearchInput />

          <div id="navigation">
            <p className="font-medium text-sm text-gray-300 md:text-base">
              Navigation
            </p>
            <div className="h-0.5 border-t border-gray-400 mb-2" />
            <div id="nav-content" className="space-y-2">
              <Link
                href="/"
                onClick={changeStatus}
                className={`flex font-medium gap-2 items-center text-lg ${
                  pathname === "/"
                    ? "text-green-400 hover:cursor-default"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <HomeIcon size={20} />
                Home
              </Link>

              <Link
                href="/cart"
                onClick={changeStatus}
                className={`flex font-medium gap-2 items-center text-lg ${
                  pathname === "/cart"
                    ? "text-green-400 hover:cursor-default"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <ShoppingCart size={20} />
                Cart
              </Link>

              <Link
                href="/profile"
                onClick={changeStatus}
                className={`flex font-medium gap-2 items-center text-lg ${
                  pathname === "/profile"
                    ? "text-green-400 hover:cursor-default"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <User2 size={20} />
                Profile
              </Link>

              <Link
                href="/about"
                onClick={changeStatus}
                className={`flex font-medium gap-2 items-center text-lg ${
                  pathname === "/about"
                    ? "text-green-400 hover:cursor-default"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <TextSearch size={21} />
                About
              </Link>
            </div>
          </div>

          {isAdmin && (
            <div id="administrator">
              <p className="font-medium text-sm text-gray-300 md:text-base">
                Administrator
              </p>
              <div className="h-0.5 border-t border-gray-400 mb-2" />
              <div id="nav-content" className="space-y-2">
                <Link
                  href="/product/new"
                  className="flex font-medium gap-2 items-center text-lg text-gray-300 hover:text-white"
                >
                  <SquarePlus size={22} /> New
                </Link>

                <Link
                  href="/product/all"
                  className="flex font-medium gap-2 items-center text-lg text-gray-300 hover:text-white"
                >
                  <GalleryVerticalEnd size={22} />
                  Products
                </Link>

                <Link
                  href="/settings"
                  className="flex font-medium gap-2 items-center text-lg text-gray-300 hover:text-white"
                >
                  <Settings size={22} />
                  Settings
                </Link>
              </div>
            </div>
          )}

          <div id="administrator">
            <p className="font-medium text-sm text-gray-300 md:text-base">
              Developer
            </p>
            <div className="h-0.5 border-t border-gray-400 mb-2" />
            <div id="nav-content" className="space-y-2">
              <Link
                href="https://www.instagram.com/o_californiaa/?next=%2F"
                className="flex font-medium gap-2 items-center text-lg text-gray-300 hover:text-white"
              >
                <Instagram size={20} />
                Instagram
              </Link>

              <Link
                href=""
                className="flex font-medium gap-2 items-center text-lg text-gray-300 hover:text-white"
              >
                <Linkedin size={20} />
                Linkedin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

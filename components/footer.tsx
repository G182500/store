import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  //const linkStyle = "flex font-medium gap-2 items-center text-xl text-gray-300 hover:text-white";

  return (
    <footer className="flex flex-col bg-[#1d1d1d] items-center px-2 py-6 w-full">
      {/*<div className="flex justify-around">
        <Link
          href="https://www.instagram.com/o_californiaa/?next=%2F"
          className={linkStyle}
        >
          <Instagram size={20} />
          Instagram
        </Link>
        <Link
          href="https://www.linkedin.com/in/gabriel-santos-20b4b8197"
          className={linkStyle}
        >
          <Linkedin size={20} />
          Linkedin
        </Link>
      </div>*/}
      <p className="italic opacity-65 text-xs text-center max-w-80">
        Developed by Gabriel Santos Bueno, using TypeScript, Tailwind CSS and
        Neon (PostgreSQL).
      </p>
    </footer>
  );
};

export default Footer;

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Skeleton from "./skeleton";

interface ImageProps {
  src: string;
  size: string;
  alt: string;
  isLoading: boolean;
}

export default function ImageComponent({
  src,
  size,
  alt,
  isLoading,
}: ImageProps) {
  return (
    <>
      {isLoading ? (
        <Skeleton className={`bg-[#4e4e4e] animate-pulse ${size}`} />
      ) : (
        <>
          {src ? (
            <div
              className={`relative self-center border-2 border-[#4e4e4e] ${size}`}
            >
              <Image
                fill
                src={src}
                alt={alt}
                className="absolute object-cover rounded-md"
              />
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center border-2 border-[#4e4e4e] ${size}`}
            >
              <ImageIcon className="w-[70%]" size={200} color="#9c9c9c" />
              <p className="font-medium text-xl text-[#9c9c9c]">
                No image available
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}

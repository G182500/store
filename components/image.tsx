import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Skeleton from "./skeleton";

interface ImageProps {
  src: string;
  imgSize: string;
  fontSize: string;
  alt: string;
  isLoading: boolean;
}

export default function ImageComponent(props: ImageProps) {
  return (
    <>
      {props.isLoading ? (
        <Skeleton className={`bg-[#4e4e4e] animate-pulse ${props.imgSize}`} />
      ) : (
        <>
          {props.src ? (
            <div
              className={`relative self-center border-2 border-[#4e4e4e] ${props.imgSize}`}
            >
              <Image
                fill
                src={props.src}
                alt={props.alt}
                className="absolute object-cover rounded-md"
              />
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center border-2 border-[#4e4e4e] ${props.imgSize}`}
            >
              <ImageIcon className="h-[50%] w-[50%]" color="#9c9c9c" />
              <p className={`font-medium text-[#9c9c9c] ${props.fontSize}`}>
                No image available
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}

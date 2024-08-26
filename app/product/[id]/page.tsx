"use client";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useGetProductById } from "@/services/product/use-get-by-id";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const getProduct = useGetProductById(params.id, {
    enabled: true,
  });

  const product = getProduct.data?.product;

  //Futuramente um serviço como Google Cloud Service, para salvar as imagens
  const coverImage = product?.images_url
    ? product.images_url.split(";")[0]
    : "";

  const imgSize = "h-80 w-80 border-2 border-[#4e4e4e] rounded-lg";

  return (
    <div className="flex flex-col bg-[#1d1d1d] p-4 gap-4 w-full sm:rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-xl md:text-2xl">Product Detail</p>
        <span className="font-semibold bg-orange-600 h-fit text-sm rounded-md p-1.5">
          {product?.category}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        {coverImage && product ? (
          <div className={`relative self-center ${imgSize}`}>
            <Image
              fill
              src={`/imgs/products/${coverImage}`}
              alt={product.title}
              className="absolute object-cover rounded-md"
            />
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center ${imgSize}`}
          >
            <ImageIcon size={200} color="#9c9c9c" />
            <p className="font-medium text-xl text-[#9c9c9c]">
              No image available
            </p>
          </div>
        )}
        <div className="flex items-center justify-between w-full">
          <p className="font-medium opacity-80 text-xl text-white">
            {product?.title} AAAAAAA AAAAAA AAAAA
          </p>
          <p className="font-semibold text-2xl text-green-400">
            R$ {product?.price}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import { ImageIcon, Loader2 } from "lucide-react";
import { useGetProductById } from "@/services/product/use-get-by-id";
import ContentArea from "@/components/content-area";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const getProduct = useGetProductById(params.id, {
    enabled: true,
  });

  const product = getProduct.data?.product;

  //Futuramente um serviço como Google Cloud Service, para salvar as imagens
  const coverImage = product?.images_url;

  const imgSize = "h-80 w-80 border-2 border-[#4e4e4e] rounded-lg";

  const header = (
    <>
      <p className="font-semibold text-xl md:text-2xl">Product Detail</p>
      <span className="font-semibold bg-orange-600 h-fit text-sm rounded-md p-1.5">
        {product?.category}
      </span>
    </>
  );

  return (
    <ContentArea header={header}>
      <div className="flex flex-col items-center justify-center space-y-2">
        {!product || getProduct.isFetching ? (
          <div className="flex h-28 items-center justify-center space-x-2 w-full">
            <Loader2 color="#4ade80" strokeWidth={3} className="animate-spin" />
            <p className="font-medium opacity-80 text-xl text-white">
              Carregando produto...
            </p>
          </div>
        ) : (
          <>
            {coverImage ? (
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
            <p className="font-medium text-center opacity-80 text-xl text-white">
              {product?.title} AAAAAAA AAAAAA AAAAA
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold text-2xl text-green-400">
                R$ {product?.price}00
              </p>
              <p>Disponíveis: {product?.quantity}</p>
            </div>
          </>
        )}
      </div>
    </ContentArea>
  );
}

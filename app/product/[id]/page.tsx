"use client";
import Image from "next/image";
import { ImageIcon, Loader2 } from "lucide-react";
import { useGetProductById } from "@/services/product/use-get-by-id";
import formatToCurrency from "@/utils/format-currency";
import ContentArea from "@/components/content-area";
import Skeleton from "@/components/skeleton";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const getProduct = useGetProductById(params.id, {
    enabled: true,
  });

  const product = getProduct.data?.product;

  //Futuramente um serviço como Google Cloud Service, para salvar as imagens
  const coverImage = product?.images_url;

  const imgSize = "h-80 w-80 rounded-lg";

  const header = (
    <>
      <p className="font-semibold text-xl md:text-2xl">Product Detail</p>
      {product?.category && (
        <span className="font-semibold bg-orange-600 text-sm rounded-md p-1.5">
          {product?.category}
        </span>
      )}
    </>
  );

  return (
    <ContentArea header={header}>
      <div className="flex flex-col items-center justify-center md:flex-row">
        {!product || getProduct.isFetching ? (
          <>
            <Skeleton className={`bg-[#4e4e4e] animate-pulse ${imgSize}`} />
            <div className="flex h-28 items-center justify-center space-x-2 w-full">
              <Loader2
                color="#4ade80"
                strokeWidth={3}
                className="animate-spin"
              />
              <p className="font-medium opacity-80 text-lg text-white">
                Carregando dados do produto...
              </p>
            </div>
          </>
        ) : (
          <>
            {coverImage ? (
              <div
                className={`relative self-center border-2 border-[#4e4e4e] ${imgSize}`}
              >
                <Image
                  fill
                  src={`/imgs/products/${coverImage}`}
                  alt={product.title}
                  className="absolute object-cover rounded-md"
                />
              </div>
            ) : (
              <div
                className={`flex flex-col items-center justify-center border-2 border-[#4e4e4e] ${imgSize}`}
              >
                <ImageIcon size={200} color="#9c9c9c" />
                <p className="font-medium text-xl text-[#9c9c9c]">
                  No image available
                </p>
              </div>
            )}
            <div className="grid grid-cols-3 space-x-2 mt-4 w-full">
              <p className="font-medium col-span-2 text-left opacity-80 text-xl text-white">
                {product?.title}
              </p>
              <p className="font-semibold text-right text-2xl text-green-400">
                R$ {formatToCurrency(product?.price)}
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p>AAA</p>
              <p className="font-semibold italic text-sm">
                Disponíveis: {product?.quantity}
              </p>
            </div>
          </>
        )}
      </div>
    </ContentArea>
  );
}

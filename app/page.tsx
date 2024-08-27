"use client";
import ContentArea from "@/components/content-area";
import ProductCard from "@/components/product-card";
import { useGetProductsByCategory } from "@/services/product/use-get-by-category";
import { Loader2 } from "lucide-react";

export default function Home() {
  const getProducts = useGetProductsByCategory("Compact Disc", {
    enabled: true,
  });

  const products = getProducts.data?.products;

  const header = (
    <p className="font-semibold text-xl md:text-2xl">Compact Disc</p>
  );

  return (
    <ContentArea header={header}>
      {getProducts.isFetching || !products ? (
        <div className="flex h-28 items-center justify-center space-x-2 w-full">
          <Loader2 color="#4ade80" strokeWidth={3} className="animate-spin" />
          <p className="font-medium opacity-80 text-xl text-white">
            Carregando produtos...
          </p>
        </div>
      ) : (
        <>
          {products && products.length ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <p className="font-medium opacity-80 text-xl text-white self-center">
              {getProducts.data?.message}
            </p>
          )}
        </>
      )}
    </ContentArea>
  );
}

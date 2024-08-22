"use client";
import React, { Suspense } from "react";
import { useEffect } from "react";
import { Loader2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useGetProductsByName } from "@/services/product/use-get-by-name";
import Link from "next/link";
import ProductCard from "./product-card";

interface SearchResultProps {
  children: React.ReactNode; //layout's children
}

const Search = ({ children }: SearchResultProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const searchText = searchParams.get("search");
  const getProducts = useGetProductsByName(searchText ? searchText : "", {
    enabled: false,
  });

  const products = getProducts.data?.products;

  useEffect(() => {
    if (searchText) getProducts.refetch();
  }, [searchParams]);

  return (
    <>
      {!searchText ? (
        children
      ) : (
        <div className="flex flex-col bg-[#1d1d1d] p-4 gap-4 w-full sm:rounded-lg">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl md:text-2xl">Search Results</p>
            <Link
              href="/"
              className="flex font-semibold items-center bg-orange-600 gap-1 text-sm rounded-md p-1.5"
              onClick={() => params.delete("search")}
            >
              <X size={22} />
              {searchText}
            </Link>
          </div>
          {getProducts.isFetching ? (
            <div className="flex gap-2 justify-center w-full">
              <Loader2
                color="#4ade80"
                strokeWidth={3}
                className="animate-spin"
              />
              <p className="font-medium opacity-80 text-xl text-white mb-5">
                Buscando produtos...
              </p>
            </div>
          ) : (
            <>
              {products?.length ? (
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
        </div>
      )}
    </>
  );
};

export default function SearchResult({ children }: SearchResultProps) {
  return (
    <Suspense>
      <Search>{children}</Search>
    </Suspense>
  );
}

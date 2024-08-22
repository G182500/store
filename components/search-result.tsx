"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface SearchResultProps {
  children: React.ReactNode; //layout's children
}

export default function SearchResult({ children }: SearchResultProps) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search");

  useEffect(() => {}, [searchParams]);

  return (
    <>
      {searchText ? (
        <div className="flex flex-col bg-[#1d1d1d] p-4 space-y-4 sm:rounded-lg">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-lg md:text-2xl">Search Results</p>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

/*getProducts.isFetching ? (
        <div className="flex pb-4 gap-2 self-center">
          <Loader2 color="#4ade80" strokeWidth={3} className="animate-spin" />
          <p className="font-medium opacity-80 text-white">
            Buscando produtos...
          </p>
        </div>
      ) : products?.length ? (
        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {products?.map((item) => (
            <Product {...item} key={item._id} />
          ))}
        </div>
      ) : (
        <p className="pb-4 font-medium opacity-65 self-center">
          {getProducts.data?.message}
        </p>
      )*/

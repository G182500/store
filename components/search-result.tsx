"use client";
import { useEffect } from "react";
import { Loader2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useGetProductsByName } from "@/services/product/use-get-by-name";
import Link from "next/link";

interface SearchResultProps {
  children: React.ReactNode; //layout's children
}

export default function SearchResult({ children }: SearchResultProps) {
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
      {searchText ? (
        <div className="flex flex-col bg-[#1d1d1d] p-4 gap-4 w-full sm:rounded-lg">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl md:text-2xl">Search Results</p>
            {searchText && (
              <Link
                href="/"
                className="flex font-semibold items-center bg-orange-600 gap-1 text-sm rounded-md p-1.5"
                onClick={() => params.delete("search")}
              >
                <X size={22} />
                {searchText}
              </Link>
            )}
          </div>
          <div className="flex justify-center">
            {getProducts.isFetching ? (
              <div className="flex gap-2">
                <Loader2
                  color="#4ade80"
                  strokeWidth={3}
                  className="animate-spin"
                />
                <p className="font-medium opacity-80 text-xl text-white">
                  Buscando produtos...
                </p>
              </div>
            ) : products && products.length ? (
              <>
                {products.map((product) => (
                  <p
                    className="font-medium opacity-80 text-xl text-white"
                    key={product._id}
                  >
                    {product.title}
                  </p>
                ))}
              </>
            ) : (
              <p className="font-medium opacity-80 text-xl text-white">
                {getProducts.data?.message}
              </p>
            )}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

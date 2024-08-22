"use client";
import { useEffect } from "react";
import { Loader2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useGetProductsByName } from "@/services/product/use-get-by-name";

interface SearchResultProps {
  children: React.ReactNode; //layout's children
}

export default function SearchResult({ children }: SearchResultProps) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search");

  const getProducts = useGetProductsByName(searchText ? searchText : "", {
    enabled: false,
  });
  const products = getProducts.data?.products;

  useEffect(() => {
    if (searchText) {
      getProducts.refetch();
    }
  }, [searchParams]);

  return (
    <>
      {searchText ? (
        <div className="flex flex-col bg-[#1d1d1d] p-4 gap-4 w-full sm:rounded-lg">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-lg md:text-2xl">Search Results</p>
            {searchText && (
              <button
                className="flex font-semibold bg-orange-600 gap-1 text-sm rounded-md p-1.5"
                onClick={() => {
                  console.log("Remover busca");
                }}
              >
                <X size={20} />
                {searchText}
              </button>
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

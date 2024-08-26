import { IProduct } from "@/interfaces/product";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface GetProductsByNameOutput {
  message: string;
  products: IProduct[];
}

export const useGetProductsByCategory = (
  category: string,
  options?: Omit<
    UseQueryOptions<GetProductsByNameOutput>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    ...options,
    queryKey: ["ProductsByCategory"],
    queryFn: async () => {
      const resp = await fetch(`/api/product/get-by-category/${category}`, {
        method: "GET",
      });
      const { message, products }: GetProductsByNameOutput = await resp.json();
      return { message, products };
    },
  });
};

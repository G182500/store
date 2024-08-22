import { IProduct } from "@/interfaces/product";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface GetProductsByNameOutput {
  message: string;
  products: IProduct[];
}

export const useGetProductsByName = (
  name: string,
  options?: Omit<
    UseQueryOptions<GetProductsByNameOutput>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    ...options,
    queryKey: ["ProductsByName"],
    queryFn: async () => {
      const resp = await fetch(`/api/product/get-by-name/${name}`, {
        method: "GET",
      });
      const { message, products }: GetProductsByNameOutput = await resp.json();
      return { message, products };
    },
  });
};

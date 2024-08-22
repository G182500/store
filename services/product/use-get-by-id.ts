import { IProduct } from "@/interfaces/product";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface GetProductByIdOutput {
  message: string;
  product: IProduct;
}

export const useGetProductById = (
  id: string,
  options?: Omit<UseQueryOptions<GetProductByIdOutput>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: ["ProductById"],
    queryFn: async () => {
      const resp = await fetch(`/api/product/${id}`, {
        method: "GET",
      });
      const { message, product }: GetProductByIdOutput = await resp.json();
      return { message, product };
    },
  });
};

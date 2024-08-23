import { IProduct } from "@/interfaces/product";
import { useMutation } from "@tanstack/react-query";

interface GenerateProductInput {
  product: IProduct;
}

interface GenerateProductOutput {
  message: string;
}

export const useGenerateProduct = () =>
  useMutation({
    mutationFn: async ({ product }: GenerateProductInput) => {
      if (!product.images_url)
        product.images_url = "freddyjason.jpg;";

      const resp = await fetch(`/api/product/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      return await resp.json();
    },
  });
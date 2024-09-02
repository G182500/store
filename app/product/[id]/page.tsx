"use client";
import { Loader2, ShoppingCart } from "lucide-react";
import { useGetProductById } from "@/services/product/use-get-by-id";
import formatToCurrency from "@/utils/format-currency";
import ContentArea from "@/components/content-area";
import { useForm } from "react-hook-form";
import QuantityInput from "@/components/form/quantity-input";
import ImageComponent from "@/components/image";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const getProduct = useGetProductById(params.id, {
    enabled: true,
  });
  const { register, handleSubmit, getValues, setValue } = useForm<{
    quantity: number;
  }>();

  const product = getProduct.data?.product;
  //Futuramente um serviço como Google Cloud Service, para salvar as imagens
  const coverImage = product?.images_url;
  const imgSize = "h-80 w-80 rounded-lg";

  const header = (
    <>
      <p className="font-semibold text-xl md:text-2xl">Product Detail</p>
      {product?.category && !getProduct.isFetching && (
        <span className="font-semibold bg-orange-600 text-sm rounded-md p-1.5">
          {product?.category}
        </span>
      )}
    </>
  );

  return (
    <ContentArea header={header}>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <ImageComponent
          alt={product ? product.title : ""}
          fontSize="text-xl"
          imgSize={imgSize}
          isLoading={!product || getProduct.isFetching}
          src={`/imgs/products/${coverImage}`}
        />
        {!product || getProduct.isFetching ? (
          <>
            <div className="flex h-14 items-center justify-center space-x-2 w-full">
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
            <div className="flex flex-col space-y-1 w-full">
              <p className="font-medium opacity-80 text-left text-white text-xl">
                {product?.title}
              </p>
              <div className="flex flex-col items-start">
                <p className="font-semibold text-3xl text-green-400">
                  R$ {formatToCurrency(product?.price)}
                </p>
                <p className="font-semibold text-xs">
                  Disponíveis: {product?.quantity}
                </p>
              </div>
            </div>

            <div className="flex space-x-4 w-full">
              <QuantityInput
                register={register("quantity", {
                  min: 1,
                  max: product?.quantity,
                })}
              />
              <button
                className="flex bg-[#1b5a8d] items-center justify-center gap-2 py-3 rounded-md w-full"
                type="submit"
              >
                <ShoppingCart size={24} />
                <p className="font-semibold">ADD TO CART</p>
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-xs">DESCRIPTION</p>
              <div className="bg-[#3a3a3a] p-2 rounded-lg min-h-36 font-semibold opacity-70 text-justify text-xs whitespace-pre-line">
                {product?.description}
              </div>
            </div>
          </>
        )}
      </div>
    </ContentArea>
  );
}
//whitespace-pre-line -> Navegador interprete '\n' no layout

"use client";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { IProduct } from "@/interfaces/product";
import { useGenerateProduct } from "@/services/product/use-generate-product";
import { Loader2 } from "lucide-react";

export default function ProductForm() {
  const {
    formState,
    register,
    reset,
    handleSubmit,
    setError,
    setValue,
    getValues,
  } = useForm<IProduct>();

  const generateProductMutation = useGenerateProduct();

  const inputStyle =
    "bg-[#686868] font-medium py-1.5 pl-2 rounded-lg text-white placeholder-gray-300";

  const formErrorMessages = Object.keys(formState.errors).map(
    (key) => formState.errors[key as keyof IProduct]?.message
  );

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      const resp = await generateProductMutation.mutateAsync({
        product: data,
      });
      if (resp.status == "success") reset();
      /*toast({
        variant: resp.status,
        title: resp.message,
      });*/
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-[#1d1d1d] p-4 gap-4 w-full sm:rounded-lg">
      <div className="flex items-center space-x-2">
        <p className="font-semibold text-xl md:text-2xl">New Product</p>
        <Loader2
          className={
            generateProductMutation.isPending ? "animate-spin" : "hidden"
          }
          color="#4ade80"
          strokeWidth={3}
        />
      </div>

      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className={inputStyle}
          placeholder="Title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />

        <div className="flex space-x-2">
          <input
            className={`${inputStyle} w-40`}
            placeholder="R$"
            type="number"
            {...register("price", {
              required: "Price is required",
              min: 1,
              max: 999,
            })}
          />

          <select
            className={`border-r-4 border-[#686868] w-full ${inputStyle}`}
            {...register("category", { required: true })}
          >
            <option value="Compact Disc">Compact Disc</option>
            <option value="Movie">Movie</option>
          </select>
        </div>

        <textarea
          className={`${inputStyle} h-40 overflow-auto`}
          {...register("description")}
          placeholder="Description"
        />

        <input
          className={inputStyle}
          placeholder="Quantity"
          type="number"
          {...register("quantity")}
        />

        <button
          disabled={!formState.isValid}
          className="flex bg-[#1b5a8d] font-semibold items-center justify-center py-2 rounded-lg w-full disabled:opacity-60"
          type="submit"
        >
          SUBMIT
        </button>

        <div className="flex space-x-1">
          {formErrorMessages.map((message, index) => (
            <p
              className="font-medium ml-1 text-sm text-red-500"
              key={`error${index}`}
            >
              {message}.
            </p>
          ))}
        </div>
      </form>
    </div>
  );
}

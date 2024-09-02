"use client";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { IProduct } from "@/interfaces/product";
import { useGenerateUser } from "@/services/user/use-generate-user";
import { Loader2 } from "lucide-react";
import PasswordInput from "./password-input";

export default function UserForm() {
  const {
    formState,
    register,
    reset,
    handleSubmit,
    setError,
    setValue,
    getValues,
  } = useForm<any>();

  const generateUserMutation = useGenerateUser();

  const inputStyle =
    "bg-[#686868] font-medium py-1.5 pl-2 rounded-lg text-white placeholder-gray-300";

  const formErrorMessages = Object.keys(formState.errors).map(
    (key) => formState.errors[key as keyof IProduct]?.message as string
  );

  //const onSubmit: SubmitHandler<IProduct> = async (data) => {
  const onSubmit = async (data) => {
    try {
      const resp = await generateUserMutation.mutateAsync({
        user: data,
      });
      if (resp.status == "success") reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-[#1d1d1d] p-4 gap-4 w-full sm:rounded-lg">
      <div className="flex items-center space-x-2">
        <p className="font-semibold text-xl md:text-2xl">New User</p>
        <Loader2
          className={generateUserMutation.isPending ? "animate-spin" : "hidden"}
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
          placeholder="E-mail"
          type="text"
          {...register("email", { required: "E-mail is required." })}
        />

        <div className="flex space-x-2">
          <input
            className={`${inputStyle} w-[50%]`}
            placeholder="First Name"
            type="text"
            {...register("first_name", { required: "First Name is required." })}
          />
          <input
            className={`${inputStyle} w-[50%]`}
            placeholder="Last Name"
            type="text"
            {...register("last_name", { required: "Last Name is required." })}
          />
        </div>

        <PasswordInput
          className={`${inputStyle} w-full`}
          register={register("password")}
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
              {message}
            </p>
          ))}
        </div>
      </form>
    </div>
  );
}

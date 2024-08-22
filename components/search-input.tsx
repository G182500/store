"use client";
import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface InputProps {
  submitComplement?: Function;
}

const Input = ({ submitComplement }: InputProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm();

  const onSubmit: SubmitHandler<any> = async ({ item }) => {
    if (item) {
      params.set("search", item);
      router.push("/?" + params.toString()); //Comeback HomePage
    } else {
      params.delete("search");
      router.push(pathname);
    }
    reset(); //Clear form-input text
    if (submitComplement) submitComplement(); //Example: close sidebar-menu
  };

  return (
    <form
      className="relative flex items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="bg-[#686868] font-medium py-1.5 pl-2 rounded-lg w-full text-white placeholder-gray-300"
        placeholder="Search item"
        type="text"
        {...register("item")}
      />
      <Search
        color="white"
        className="absolute end-[5%]"
        size={20}
        strokeWidth={3}
      />
    </form>
  );
};

export default function SearchInput({ submitComplement }: InputProps) {
  return (
    <Suspense>
      <Input submitComplement={submitComplement} />
    </Suspense>
  );
}

"use client";
import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();
  const router = useRouter();
  const { handleSubmit, register } = useForm();

  const onSubmit: SubmitHandler<any> = async ({ item }) => {
    if (item) {
      params.set("search", item);
      router.push("/?" + params.toString()); //Comeback HomePage
    } else {
      params.delete("query");
      router.push(pathname);
    }
  };

  return (
    <form
      className="relative flex items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="bg-[#686868] font-medium py-1 pl-2 rounded-lg w-[94%] text-white placeholder-gray-300"
        placeholder="Search item"
        type="text"
        {...register("item")}
      />
      <Search
        color="white"
        className="absolute end-[6%]"
        size={20}
        strokeWidth={3}
      />
    </form>
  );
}

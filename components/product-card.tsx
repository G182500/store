import { IProduct } from "@/interfaces/product";
import { useRouter } from "next/navigation";
import { ImageIcon, ArrowRightCircle } from "lucide-react";
import formatToCurrency from "@/utils/format-currency";
import Image from "next/image";

export default function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();

  //Futuramente um serviço como Google Cloud Service, para salvar as imagens
  const coverImage = product.images_url;
  const imgSize = "h-40 w-72";

  const price = formatToCurrency(product.price);
  const fees = formatToCurrency(
    Math.round(product.price / 2) + product.price * 0.06
  );

  return (
    <div
      title={product.title}
      className="flex bg-[#353535] rounded-md hover:opacity-70 hover:cursor-pointer w-full"
      onClick={() => router.push(`/product/${product._id}`)}
    >
      {coverImage ? (
        <div className={`relative ${imgSize}`}>
          <Image
            fill
            src={`/imgs/products/${coverImage}`}
            alt={product.title}
            className="absolute rounded-l-md object-cover"
          />
        </div>
      ) : (
        <div className={`flex items-center justify-center ${imgSize}`}>
          <ImageIcon className="size-24" color="#9c9c9c" />
        </div>
      )}
      <div className="flex flex-col px-3 py-2 justify-around w-full">
        <p className="font-semibold text-sm line-clamp-2">{product.title}</p>
        <div id="prices">
          <p className="font-semibold text-2xl text-green-400">R$ {price}</p>
          <p className="font-medium ml-1 opacity-75 text-white text-xs">
            ou 2x de R$ {fees}
          </p>
        </div>
        <button className="flex gap-2 items-center justify-end">
          <p className="font-semibold italic text-sm">View details</p>
          <ArrowRightCircle size={16} />
        </button>
      </div>
    </div>
  );
}

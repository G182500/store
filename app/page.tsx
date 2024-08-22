import { Loader2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex gap-2">
        <Loader2 color="#4ade80" strokeWidth={3} className="animate-spin" />
        <p className="font-medium opacity-80 text-xl text-white">
          Buscando produtos...
        </p>
      </div>
    </div>
  );
}

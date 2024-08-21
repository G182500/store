import Header from "@/components/menu/header";

interface HomeProps {
  children: React.ReactNode;
}

//container does not center itself automatically (mx-auto)
export default function Home({ children }: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <div className="container flex mx-auto">{children}</div>
    </main>
  );
}

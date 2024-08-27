interface ContentAreaProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function ContentArea({ header, children }: ContentAreaProps) {
  return (
    <div className="flex flex-col bg-[#1d1d1d] p-4 gap-4 w-full sm:rounded-lg">
      <div className="flex items-center justify-between">{header}</div>
      {children}
    </div>
  );
}

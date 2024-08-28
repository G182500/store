interface SkeletonProps {
  className: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={`${className} animate-pulse`} />;
}

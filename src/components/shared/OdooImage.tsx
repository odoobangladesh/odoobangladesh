import Image from "next/image";
import { cn } from "@/lib/utils";

type OdooImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
  onError?: () => void;
};

export function OdooImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  unoptimized,
  onError,
}: OdooImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
      priority={priority}
      unoptimized={unoptimized ?? (src.endsWith(".svg") || src.endsWith(".gif"))}
      onError={onError}
    />
  );
}

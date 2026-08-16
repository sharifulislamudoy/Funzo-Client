import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  onClick?: () => void;
  className?: string;
};

export default function BrandLogo({ onClick, className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Funzo home"
      className={`group inline-flex shrink-0 items-center gap-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bdff11] ${className}`}
    >
      <span className="grid size-10 place-items-center overflow-hidden">
        <Image
          src="/logo.png"
          alt=""
          width={52}
          height={52}
          priority
          className="size-10 object-contain transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105"
        />
      </span>
      <span className="-ml-6 mt-2 text-[1.35rem] font-black italic leading-none tracking-[-0.075em] text-[#f4f7ef] sm:text-[1.55rem]">
        unzo
      </span>
    </Link>
  );
}

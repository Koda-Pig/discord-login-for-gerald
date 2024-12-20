import Image from "next/image";

interface ContainerProps {
  bg: number;
  children: React.ReactNode;
}

export function Container({ children, bg }: Readonly<ContainerProps>) {
  return (
    <div className={`relative`}>
      <Image
        src={`/images/gerald-bg-${bg}.webp`}
        alt="decorative"
        fill
        sizes="100vw"
        className="aspect-square object-center object-cover h-auto -z-10"
      />
      <div className="bg-black/80 min-h-svh grid h-full place-items-center p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}

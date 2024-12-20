interface ContainerProps {
  bgImgClass: string;
  children: React.ReactNode;
}

export function Container({ children, bgImgClass }: Readonly<ContainerProps>) {
  return (
    <div className={`${bgImgClass} bg-cover bg-center`}>
      <div className="bg-black/75 min-h-svh grid h-full place-items-center p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}

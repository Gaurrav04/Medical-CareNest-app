import React from "react";

export type Brand = {
  imageSrc: string;
  lightImageSrc: string;
  altText: string; // This is used as the brand name
  link: string;
};

export type SingleImageProps = {
  brand: Brand;
};

const brandsData: Brand[] = [
  {
    imageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids-white.svg",
    altText: "graygrids", // This is the brand name
    link: "#",
  },
  {
    imageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/lineicons.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/lineIcons-white.svg",
    altText: "lineicons", // This is the brand name
    link: "#",
  },
  {
    imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck-white.svg",
    altText: "uideck", // This is the brand name
    link: "#",
  },
  {
    imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui-white.svg",
    altText: "ayroui", // This is the brand name
    link: "#",
  },
];

export default function Brand() {
  return (
    <section className="bg-slate-100 text-slate-800 dark:text-slate-200 py-10 lg:py-[60px] dark:bg-slate-800">
      <h3 className="text-center pb-6 scroll-m-20 text-2xl font-semibold tracking-tight">Trusted By</h3>
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap mx-4">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center">
              {brandsData.map((brand, i) => (
                <SingleImage key={i} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Updated SingleImage Component
const SingleImage: React.FC<SingleImageProps> = ({ brand }) => {
  const { link, imageSrc, lightImageSrc, altText } = brand;
  return (
    <a
      href={link}
      className="mx-3 flex w-[140px] items-center justify-center py-2 2xl:w-[160px]"
    >
      <div className="text-center">
        <img src={imageSrc} alt={altText} className="h-8 w-full dark:hidden" />
        <img
          src={lightImageSrc}
          alt={altText}
          className="hidden h-8 w-full dark:block"
        />
        <p className="text-sm mt-1">{altText}</p> {/* Displaying the brand name */}
      </div>
    </a>
  );
};



interface BrandProps {
    id: number;
    name: string;
    href: string;
    image: string;
    imageLight?: string;
  
}

export const brandsData: BrandProps[] = [
  {
    id: 1,
    name: "Agents",
    href: "/",
    image: "/images/brands/formbold.svg",
    imageLight: "/images/brands/formbold-light.svg",
  },
  {
    id: 2,
    name: "Video",
    href: "/",
    image: "/images/brands/formbold.svg",
    imageLight: "/images/brands/formbold-light.svg",
  },
  {
    id: 3,
    name: "Image",
    href: "/",
    image: "/images/brands/uideck.svg",
    imageLight: "/images/brands/uideck-light.svg",
  },
  {
    id: 4,
    name: "Voice",
    href: "https://tailgrids.com",
    image: "/images/logo/petrolage_logo.png",
    imageLight: "/images/brands/tailgrids-light.svg",
  },
  {
    id: 5,
    name: "Speech",
    href: "https://lineicons.com",
    image: "/images/logo/logo.svg",
    imageLight: "/images/logo/logo.svg",
  },

  
];

export default brandsData;

/** Product catalog — data transcribed from the Figma design. */

import { asset } from "../lib/utils";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  rating: number; // e.g. 4.5
  image: string;
  category: "tshirts" | "shirts" | "shorts" | "hoodie" | "jeans";
  dressStyles: Array<"casual" | "formal" | "party" | "gym">;
  colors?: string[]; // hex swatches for the detail page
  badge?: string;
}

export const products: Product[] = [
  {
    id: "tshirt-with-tape-details",
    name: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    image: asset("assets/products/tshirt-tape.png"),
    category: "tshirts",
    dressStyles: ["casual"],
  },
  {
    id: "skinny-fit-jeans",
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    discountLabel: "-20%",
    rating: 3.5,
    image: asset("assets/products/skinny-jeans.png"),
    category: "jeans",
    dressStyles: ["casual"],
  },
  {
    id: "checkered-shirt",
    name: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    image: asset("assets/products/checkered-shirt.png"),
    category: "shirts",
    dressStyles: ["casual", "formal"],
  },
  {
    id: "sleeve-striped-t-shirt",
    name: "Sleeve Striped T-shirt",
    price: 130,
    originalPrice: 160,
    discountLabel: "-30%",
    rating: 4.5,
    image: asset("assets/products/sleeve-striped-tee.png"),
    category: "tshirts",
    dressStyles: ["casual", "gym"],
  },
  {
    id: "vertical-striped-shirt",
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    discountLabel: "-20%",
    rating: 5.0,
    image: asset("assets/products/vertical-striped-shirt.png"),
    category: "shirts",
    dressStyles: ["formal", "casual"],
  },
  {
    id: "courage-graphic-t-shirt",
    name: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0,
    image: asset("assets/products/courage-graphic-tee.png"),
    category: "tshirts",
    dressStyles: ["casual"],
  },
  {
    id: "loose-fit-bermuda-shorts",
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    image: asset("assets/products/bermuda-shorts.png"),
    category: "shorts",
    dressStyles: ["casual", "gym"],
  },
  {
    id: "faded-skinny-jeans",
    name: "Faded Skinny Jeans",
    price: 210,
    rating: 4.5,
    image: asset("assets/products/faded-skinny-jeans.png"),
    category: "jeans",
    dressStyles: ["casual"],
  },
  {
    id: "gradient-graphic-t-shirt",
    name: "Gradient Graphic T-shirt",
    price: 145,
    rating: 3.5,
    image: asset("assets/products/gradient-graphic-tee.png"),
    category: "tshirts",
    dressStyles: ["casual", "party"],
  },
  {
    id: "polo-with-tipping-details",
    name: "Polo with Tipping Details",
    price: 180,
    rating: 4.5,
    image: asset("assets/products/polo-tipping.png"),
    category: "tshirts",
    dressStyles: ["casual", "formal"],
  },
  {
    id: "black-striped-t-shirt",
    name: "Black Striped T-shirt",
    price: 120,
    originalPrice: 160,
    discountLabel: "-30%",
    rating: 5.0,
    image: asset("assets/products/black-striped-tee.png"),
    category: "tshirts",
    dressStyles: ["casual"],
  },
  {
    id: "polo-with-contrast-trims",
    name: "Polo with Contrast Trims",
    price: 212,
    originalPrice: 242,
    discountLabel: "-10%",
    rating: 4.0,
    image: asset("assets/products/polo-contrast-trims.png"),
    category: "tshirts",
    dressStyles: ["formal", "casual"],
  },
  {
    id: "one-life-graphic-t-shirt",
    name: "One Life Graphic T-shirt",
    price: 260,
    originalPrice: 300,
    discountLabel: "-40%",
    rating: 4.5,
    image: asset("assets/products/one-life-main.png"),
    category: "tshirts",
    dressStyles: ["casual"],
    colors: ["#4f4631", "#314f4a", "#1d1d1d"],
  },
];

export const productById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const newArrivals: Product[] = [
  "tshirt-with-tape-details",
  "skinny-fit-jeans",
  "checkered-shirt",
  "sleeve-striped-t-shirt",
].map((id) => productById(id)!) as Product[];

export const topSelling: Product[] = [
  "vertical-striped-shirt",
  "courage-graphic-t-shirt",
  "loose-fit-bermuda-shorts",
  "faded-skinny-jeans",
].map((id) => productById(id)!) as Product[];

export const casualProducts: Product[] = [
  "gradient-graphic-t-shirt",
  "polo-with-tipping-details",
  "black-striped-t-shirt",
  "skinny-fit-jeans",
  "checkered-shirt",
  "sleeve-striped-t-shirt",
  "vertical-striped-shirt",
  "courage-graphic-t-shirt",
  "loose-fit-bermuda-shorts",
].map((id) => productById(id)!) as Product[];

export const youMayAlsoLike: Product[] = [
  "polo-with-contrast-trims",
  "gradient-graphic-t-shirt",
  "polo-with-tipping-details",
  "black-striped-t-shirt",
].map((id) => productById(id)!) as Product[];

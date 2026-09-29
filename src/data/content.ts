/** Static content transcribed from the Figma design. */

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
}

export const productReviews: Review[] = [
  {
    name: "Samantha D.",
    rating: 5,
    verified: true,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "Posted on August 14, 2023",
  },
  {
    name: "Alex M.",
    rating: 5,
    verified: true,
    text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "Posted on August 15, 2023",
  },
  {
    name: "Ethan R.",
    rating: 4,
    verified: true,
    text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    date: "Posted on August 16, 2023",
  },
  {
    name: "Olivia P.",
    rating: 5,
    verified: true,
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. The fabric is soft, and the design speaks to me. It's no wonder the designer poured their creativity into making this t-shirt stand out!",
    date: "Posted on August 17, 2023",
  },
  {
    name: "Liam K.",
    rating: 5,
    verified: true,
    text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    date: "Posted on August 18, 2023",
  },
  {
    name: "Ava H.",
    rating: 4,
    verified: true,
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: "Posted on August 19, 2023",
  },
];

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  verified?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    rating: 5,
    verified: true,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 5,
    verified: true,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    rating: 5,
    verified: true,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: "Mooen",
    rating: 5,
    verified: false,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

export interface DressStyle {
  label: string;
  slug: string;
  image: string;
  /** grid placement on desktop */
  span: "wide" | "tall";
}

export const dressStyles: DressStyle[] = [
  { label: "Casual", slug: "casual", image: "/assets/style/casual.png", span: "wide" },
  { label: "Formal", slug: "formal", image: "/assets/style/formal.png", span: "tall" },
  { label: "Party", slug: "party", image: "/assets/style/party.png", span: "tall" },
  { label: "Gym", slug: "gym", image: "/assets/style/gym.png", span: "wide" },
];

export const footerColumns: Array<{ title: string; links: string[] }> = [
  { title: "Company", links: ["About", "Features", "Works", "Career"] },
  {
    title: "Help",
    links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  },
  { title: "FAQ", links: ["Account", "Manage Deliveries", "Orders", "Payments"] },
  {
    title: "Resources",
    links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
  },
];

export const filterColors: string[] = [
  "#00c12b",
  "#f50606",
  "#f5dd06",
  "#f57906",
  "#06caf5",
  "#063af5",
  "#7d06f5",
  "#f506a4",
  "#ffffff",
  "#000000",
];

export const filterSizes: string[] = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

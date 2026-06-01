// Mock in-memory "database" for the training lab.
export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  // Bio is rendered as raw HTML (XSS sink)
  bioHtml: string;
  ordersTotal: number;
  joined: string;
};

export const CURRENT_SESSION_USER_ID = "1001";

export const users: Record<string, User> = {
  "1001": {
    id: "1001",
    name: "Alex Rivera",
    email: "alex@aperture.io",
    role: "customer",
    bioHtml: "Product designer & coffee snob. <em>Always shipping.</em>",
    ordersTotal: 4280,
    joined: "2023-04-12",
  },
  "1002": {
    id: "1002",
    name: "Morgan Chen",
    email: "morgan@aperture.io",
    role: "customer",
    bioHtml: "<strong>VIP</strong> — internal billing notes: card ending 4242.",
    ordersTotal: 19840,
    joined: "2022-01-03",
  },
  "1003": {
    id: "1003",
    name: "Admin Root",
    email: "root@aperture.io",
    role: "admin",
    bioHtml: "Platform admin. <script>alert('pwned')</script>",
    ordersTotal: 0,
    joined: "2021-08-19",
  },
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: string;
};

export const products: Product[] = [
  { id: "p1", name: "Aperture Field Jacket", tagline: "Weatherproof shell, merino lined.", price: 480, category: "Outerwear" },
  { id: "p2", name: "Halcyon Wool Knit", tagline: "Japanese wool, ribbed cuffs.", price: 220, category: "Knitwear" },
  { id: "p3", name: "Meridian Selvedge Denim", tagline: "14oz Kaihara, raw indigo.", price: 285, category: "Denim" },
  { id: "p4", name: "Cirrus Tech Pant", tagline: "4-way stretch, hidden zip.", price: 195, category: "Trousers" },
  { id: "p5", name: "Lumen Crewneck", tagline: "Heavyweight loopback fleece.", price: 140, category: "Tops" },
  { id: "p6", name: "Strata Leather Boot", tagline: "Goodyear welt, oiled suede.", price: 540, category: "Footwear" },
];

export type Review = { id: string; product: string; author: string; bodyHtml: string };

export const reviews: Review[] = [
  { id: "r1", product: "Aperture Field Jacket", author: "Jamie L.", bodyHtml: "Cut is <b>impeccable</b>. Lining is buttery." },
  { id: "r2", product: "Meridian Selvedge Denim", author: "Sam K.", bodyHtml: "Fades are <i>insane</i> after 6 months." },
];

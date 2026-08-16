import { notFound } from "next/navigation";

type RouteContent = { title: string; description: string };

const routeContent: Record<string, RouteContent> = {
  shop: {
    title: "Shop",
    description: "Explore Funzo RC cars, accessories and racing essentials.",
  },
  categories: {
    title: "Categories",
    description: "Browse drift cars, off-road vehicles, monster trucks and more.",
  },
  orders: {
    title: "Your orders",
    description: "Track current orders and review your Funzo order history.",
  },
  wishlist: {
    title: "Wishlist",
    description: "Keep your favourite RC machines ready for the next race.",
  },
  "about-us": {
    title: "About Funzo",
    description: "Learn about the people and passion powering Funzo.",
  },
  "contact-us": {
    title: "Help & contact",
    description: "Our support team is ready to help with products and orders.",
  },
  faq: {
    title: "Common questions",
    description: "Quick answers about shopping, products, payments and delivery.",
  },
  "return-refund-policy": {
    title: "Return & refund policy",
    description: "Everything you need to know about returns and refunds.",
  },
  "delivery-information": {
    title: "Delivery information",
    description: "Delivery areas, expected timelines and shipping information.",
  },
  "privacy-policy": {
    title: "Privacy policy",
    description: "How Funzo collects, protects and uses your information.",
  },
  "terms-and-conditions": {
    title: "Terms & conditions",
    description: "The terms that apply when you browse and shop with Funzo.",
  },
  account: {
    title: "My account",
    description: "Manage your account information and preferences.",
  },
  checkout: {
    title: "Checkout",
    description: "Complete your Funzo order securely.",
  },
};

type ContentPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = await params;
  const content = routeContent[slug.join("/")];

  if (!content) notFound();

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#101310] px-6 py-14 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:px-12 sm:py-20">
        <div className="absolute -right-12 -top-16 size-52 rounded-full bg-[#bdff11]/14 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#bdff11]/45 to-transparent" />
        <p className="relative text-xs font-black uppercase tracking-[0.18em] text-[#bdff11]">Funzo</p>
        <h1 className="relative mt-3 max-w-3xl text-4xl font-black tracking-[-0.045em] text-[#f4f7ef] sm:text-6xl">
          {content.title}
        </h1>
        <p className="relative mt-5 max-w-2xl text-base leading-7 text-[#9ba39a] sm:text-lg">
          {content.description}
        </p>
      </div>
    </section>
  );
}

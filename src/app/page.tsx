import { createClient } from "@/prismicio";
import Hero from "@/components/Hero";
import { Metadata } from "next";
import HoldingPage from "@/components/HoldingPage";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: home.data.meta_title || "Home",
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return (
    <>
      <HoldingPage />
    </>
  );
}

import { Metadata } from "next";
import ClientLayout from "@/components/layout/ClientLayout";
import HomeClient from "@/components/home/HomeClient";

export const metadata: Metadata = {
  title: "The Manna Snacks — All Time Favourite",
  description:
    "Premium organic snacks crafted with tradition. Explore our wholesale and retail range of The Manna Snacks by Vel Brothers Food Products — Tasty & Delicious since generations.",
};

export default function Home() {
  return (
    <ClientLayout>
      <HomeClient />
    </ClientLayout>
  );
}

import Hero from "@/components/Frontend/Hero";
import Brands from "@/components/Frontend/Brands";
import React from "react";
import TabbedSection from "@/components/Frontend/TabbedSection";

export default function Home() {
  return (
    <section className="">
      <Hero />
      <Brands/>
      <TabbedSection />
    </section>
  );
}
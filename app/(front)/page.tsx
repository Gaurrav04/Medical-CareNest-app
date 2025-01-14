import Hero from "@/components/Frontend/Hero";
import Brands from "@/components/Frontend/Brands";
import React from "react";
import TabbedSection from "@/components/Frontend/TabbedSection";
import DoctorsList from "@/components/DoctorsList";

export default function Home() {
  return (
    <section className="">
      <Hero />
      <Brands/>
      <TabbedSection />
      <DoctorsList/>
      <DoctorsList className="bg-green-100 py-8 lg:py-24" title="In-Person Doctor visit" isInPerson={true}/>
    </section>
  );
}
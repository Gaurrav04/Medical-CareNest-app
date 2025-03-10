import Hero from "@/components/Frontend/Hero";
import Brands from "@/components/Frontend/Brands";
import React from "react";
import TabbedSection from "@/components/Frontend/TabbedSection";
import DoctorsList from "@/components/DoctorsList";
import { getDoctors } from "@/actions/users";

export default async function Home() {
  const doctors = await getDoctors() || []
  
  const telhealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth Visit"
  );

  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-Person Doctor visit"
  );

  return (
    <section className="">
      <Hero />
      <Brands/>
      <TabbedSection />

      {/* Telehealth Doctors Section */}
      <section id="telehealth" className="py-20">
        <DoctorsList doctors={telhealthDoctors} title="Telehealth Visit"/>
      </section>

      {/* In-Person Doctors Section */}
      <section id="inperson" className="bg-blue-100 dark:bg-slate-900 py-8 lg:py-24">
        <DoctorsList 
          title="In-Person Doctor visit"
          isInPerson={true}
          doctors={inpersonDoctors}
        />
      </section>
    </section>
  );
}

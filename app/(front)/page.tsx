import Hero from "@/components/Frontend/Hero";
import Brands from "@/components/Frontend/Brands";
import React from "react";
import TabbedSection from "@/components/Frontend/TabbedSection";
import DoctorsList from "@/components/DoctorsList";
import { getDoctors } from "@/actions/users";

export default async function Home() {
  const doctors = await getDoctors() || []
  console.log(doctors);

  const telhealthDoctors = doctors.filter(
    (doctor)=>doctor.doctorProfile?.operationMode==="Telehealth Visit"
  );

  const inpersonDoctors = doctors.filter(
    (doctor)=>doctor.doctorProfile?.operationMode==="In-Person Doctor visit"
  );
  console.log(telhealthDoctors);
  return (
    <section className="">
      <Hero />
      <Brands/>
      <TabbedSection />
      <DoctorsList doctors={telhealthDoctors}  title="Telehealth Visit"/>
      <DoctorsList 
      className="bg-blue-100 dark:bg-slate-900 py-8 lg:py-24"
      title="In-Person Doctor visit"
      isInPerson={true}
      doctors={inpersonDoctors}
      />
    </section>
  );
}
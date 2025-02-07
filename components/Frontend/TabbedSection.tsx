import React from "react";
import TabbedItems from "./TabbedItems";
import { getServices } from "@/actions/services";
import { getspecialties } from "@/actions/specialities";
import { getSymptoms } from "@/actions/symptom";

const TabbedSection = async () => {
  const services = (await getServices()).data ||[];
  const specialties = (await getspecialties()).data ||[];
  const symptoms = (await getSymptoms()).data ||[];

  return (
    <section className="pb-16 pt-24 bg-gradient-to-r from-gray-100 to-gray-300 lg:py-[60px] ">
  <div className="container mx-auto">
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4">
        <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
          <h2 className="mb-4 text-3xl font-semibold leading-[1.3] text-gray-900 sm:text-4xl md:text-[40px] 
          scroll-m-20 pb-2 tracking-tight first:mt-0">
            <span className="block">Browse your Doctors by</span>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg dark:text-gray-600">
            Whether you're looking for a consultation or seeking specialized treatment,our team of medical professionals are here to provide trusted and expert care.
          </p>
        </div>
      </div>
    </div>
    {/* TABS */}
    <div className="mx-auto max-w-6xl">
      <TabbedItems services={services} specialties={specialties} symptoms={symptoms}/>
    </div>
  </div>
</section>

  );
};

export default TabbedSection;

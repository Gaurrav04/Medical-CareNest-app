import React from "react";
import TabbedItems from "./TabbedItems";

const TabbedSection = () => {
  return (
    <section className="pb-16 pt-24 bg-gradient-to-r from-white to-gray-100 lg:py-[60px]">
  <div className="container mx-auto">
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4">
        <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
          <h2 className="mb-4 text-3xl font-semibold leading-[1.3] text-gray-900 sm:text-4xl md:text-[42px]">
            <span className="block">Browse your Doctors by</span>
          </h2>
          <p className="text-lg text-gray-600">
            Whether you're looking for a consultation or seeking specialized treatment,our team of medical professionals are here to provide trusted and expert care.
          </p>
        </div>
      </div>
    </div>
    {/* TABS */}
    <div className="mx-auto max-w-6xl">
      <TabbedItems/>
    </div>
  </div>
</section>

  );
};

export default TabbedSection;

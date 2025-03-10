import React from "react";
import DoctorsList from "@/components/DoctorsList";
import { getDoctors } from "@/actions/users";
import DoctorCard from "@/components/DoctorCard";

export default async function NewAppointment() {
  const doctors = await getDoctors() || [];
  console.log(doctors);

  const telhealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth Visit"
  );

  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-Person Doctor visit"
  );

  console.log(telhealthDoctors);

  return (
    <section className="">
      {telhealthDoctors && telhealthDoctors.length > 0 && (
        <div className="py-4">
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">
            Telehealth Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
            {telhealthDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} isInPerson={false} doctor={doctor} />
            ))}
          </div>
        </div>
      )}

      {inpersonDoctors && inpersonDoctors.length > 0 && (
        <div className="py-4">
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">
            In-Person Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
            {inpersonDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} isInPerson={true} doctor={doctor} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

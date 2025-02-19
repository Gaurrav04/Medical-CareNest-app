import React from 'react';
import OnboardingSteps from "@/components/Onboarding/OnboardingSteps"
import { getspecialties } from '@/actions/specialities';
import { getDoctorProfileById } from '@/actions/onboarding';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;  

  //Get existing doctor profile
  const specialties = (await getspecialties()).data|| []
  const doctorProfile = (await getDoctorProfileById(id))?.data;
  // console.log(doctorProfile)
  console.log("params", id); 
  return (
    <div className="bg-teal-600 dark:bg-gray-800">
      {doctorProfile && doctorProfile.id && <div className="max-w-5xl mx-auto py-8 min-h-screen">
        <OnboardingSteps doctorProfile={doctorProfile} id={id} specialties={specialties}/> 
      </div>}
    </div>
  );
}

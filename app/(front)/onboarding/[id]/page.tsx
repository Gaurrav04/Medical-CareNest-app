import React from 'react';
import OnboardingSteps from "@/components/Onboarding/OnboardingSteps"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;  

  console.log("params", id); 
  return (
    <div className="bg-teal-600 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto py-8 min-h-screen">
        <OnboardingSteps id={id}/> 
      </div>
    </div>
  );
}

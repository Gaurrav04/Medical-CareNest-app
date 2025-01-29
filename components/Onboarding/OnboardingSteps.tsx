"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import BioDataForm from "./BioDataForm"
import ContactInfo from "./ContactInfo"
import ProfessionInfo from "./ProfessionInfo"
import ProfileInfoForm from './ProfileInfoForm';

export default function OnboardingSteps({id}:{id:string}){
    const params = useSearchParams();
    const page = params.get("page")??"bio-data";
    console.log(page);
    const steps = [
        {
            title: "Bio Data",
            page: "bio-data",
            component: <BioDataForm page={page}/>
        },
        {
            title: "Profile Information",
            page: "profile",
            component: <ProfileInfoForm page={page}/>
        },
        {
            title: "Contact Information",
            page: "contact",
            component: <ContactInfo/>
        },
        {
            title: "Profession Information",
            page: "profession",
            component: <ProfessionInfo/>
        },
        {
            title: "Education Information",
            page: "education",
            component: <></>
        },
        {
            title: "Practice Information",
            page: "practice",
            component: <></>
        },
        {
            title: "Additional Information",
            page: "additional",
            component: <></>
        },
        {
            title: "Availability",
            page: "availability",
            component: <></>
        },
    ];
    const currentStep = steps.find((steps)=>steps.page===page)
    console.log(currentStep)
    return (
        <div className="grid grid-cols-12 mx-auto rounded-lg shadow-inner
        overflow-hidden border border-slate-300 min-h-screen bg-slate-100">
          <div className="col-span-full sm:col-span-3 divide-y-2 divide-gray-200">

      
          {
            steps.map((step,i)=>{
                return (
                    <Link  
                    key={i}
                    href={`/onboarding/${id}?page=${step.page}`} 
                    className={cn("block py-3 px-4 bg-gray-200 text-gray-800 shadow-inner uppercase text-sm", 
                        step.page === page?"bg-teal-800 text-gray-100":"")}
                    >
                       {step.title}
                    </Link>
                )
            })
          }
         </div>
         <div className="col-span-full sm:col-span-9 p-4">
            {currentStep?.component}
        </div>

          </div>
    )
}
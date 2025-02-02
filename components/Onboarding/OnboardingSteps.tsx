"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import BioDataForm from "./BioDataForm"
import ContactInfo from "./ContactInfo"
import ProfileInfoForm from './ProfileInfoForm';
import EducationInfo from './EducationInfo';
import PracticeInfo from './PracticeInfo';
import AdditionalInfo from './AdditionalInfo';
import { useOnboardingContext } from '@/context/context';

export default function OnboardingSteps({id}:{id:string}){
    const params = useSearchParams();
    const page = params.get("page")??"bio-data";
    const { truckingNumber,doctorProfileId, savedDBData} = useOnboardingContext();
    console.log(page);
    const steps = [
        {
            title: "Bio Data",
            page: "bio-data",
            component: ( <BioDataForm 
            userId={id}
            title="Bio Data" 
            description="Please fill in your Bio Data Info"
            page={page}
            nextPage = "profile"
            formId={doctorProfileId?doctorProfileId:savedDBData.id}
            />
            ),
        },
        {
            title: "Profile Information",
            page: "profile",
            component: (<ProfileInfoForm 
            title="Profile Information" 
            description="Please fill in your Profile Info"
            page={page}
            nextPage = "contact"
            formId={doctorProfileId?doctorProfileId:savedDBData.id}
            userId={id}
            />
            ),
        },
        {
            title: "Contact Information",
            page: "contact",
            component: (<ContactInfo
            title="Contact Information" 
            description="Please fill in your Contact Info"
            page={page}
            nextPage = "education"
            formId={doctorProfileId?doctorProfileId:savedDBData.id}
            userId={id}
            />
            ),
        },
        {
            title: "Education Information",
            page: "education",
            component: ( <EducationInfo
            title="Education Information" 
            description="Please fill in your Education Info"
            page={page}
            nextPage = "practice"
            formId={doctorProfileId?doctorProfileId:savedDBData.id}
            userId={id}
            />
            ),
        },
        {
            title: "Practice Information",
            page: "practice",
            component: ( <PracticeInfo
            title="Practice Information" 
            description="Please fill in your Practice Info"
            page={page}
            nextPage = "additional"
            formId={doctorProfileId?doctorProfileId:savedDBData.id}
            userId={id}
            />
            ),
        },
        {
            title: "Additional Information",
            page: "additional",
            component: (<AdditionalInfo
            title="Additional Information" 
            description="Please fill in your Additional Info"
            page={page}
            nextPage = "final"
            formId={doctorProfileId?doctorProfileId:savedDBData.id}
            userId={id}
            />
            ),
        },
        // {
        //     title: "Availability",
        //     page: "availability",
        //     component: (
        //     <AvailabilityForm
        //     title="Availability Information" 
        //     description="Please fill in your Availability Info"
        //     page={page}
        //     formId={doctorProfileId}
        //     userId={id}
        //     />
        //     ),
        // },
    ];
    const currentStep = steps.find((steps)=>steps.page===page)
    console.log(currentStep)
    return (
        <div className="grid grid-cols-12 mx-auto rounded-lg shadow-inner
        overflow-hidden border border-slate-200 dark:border-slate-600 min-h-screen bg-slate-100 dark:bg-slate-900">
          <div className="col-span-full sm:col-span-3 divide-y-2 divide-gray-200 
           bg-gray-300 h-full dark:bg-slate-900">

      
          {
            steps.map((step,i)=>{
                return (
                    <Link  
                    key={i}
                    href={`/onboarding/${id}?page=${step.page}`} 
                    className={cn("block py-3 px-4 bg-gray-200 text-gray-800 shadow-inner uppercase text-sm", 
                        step.page === page?"bg-teal-800 text-gray-100 ":"")}
                    >
                       {step.title}
                    </Link>
                )
            })
          }
         </div>
         <div className="col-span-full sm:col-span-9 p-4">
           {truckingNumber || savedDBData.id &&  (<p className="border-b border-gray-200 dark:border-slate-600
            text-teal-500 dark:text-white-400 pb-2">
                Your Trucking Number is {" "}
                <span className="font-bold">
                    {truckingNumber ? truckingNumber : savedDBData.trackingNumber}
                </span>{" "}
                <span className="text-xs">
                (Use this to check the status or resume application)</span>
                </p>
                )}
            {currentStep?.component}
        </div>

          </div>
    )
}
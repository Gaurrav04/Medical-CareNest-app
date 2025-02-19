"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import BioDataForm from "./BioDataForm"
import ContactInfo from "./ContactInfo"
import ProfileInfoForm from './ProfileInfoForm';
import EducationInfo from './EducationInfo';
import PracticeInfo from './PracticeInfo';
import AdditionalInfo from './AdditionalInfo';
import { useOnboardingContext } from '@/context/context';
import { DoctorProfile, Speciality } from '@prisma/client';

export default function OnboardingSteps({
    id,
    specialties,
    doctorProfile,
}:{
    id:string,
    specialties:Speciality[];
    doctorProfile:DoctorProfile;
}){
    const params = useSearchParams();
    const pathname = usePathname();
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
            formId={doctorProfile.id ? doctorProfileId:savedDBData.id}
            doctorProfile={doctorProfile}
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
            formId={doctorProfile.id ?doctorProfileId:savedDBData.id}
            userId={id}
            doctorProfile={doctorProfile}
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
            formId={doctorProfile.id ?doctorProfileId:savedDBData.id}
            userId={id}
            doctorProfile={doctorProfile}
            />
            ),
        },
        {
            title: "Education Information",
            page: "education",
            component: ( <EducationInfo
            specialties = {specialties}
            title="Education Information" 
            description="Please fill in your Education Info"
            page={page}
            nextPage = "practice"
            formId={doctorProfile.id ?doctorProfileId:savedDBData.id}
            userId={id}
            doctorProfile={doctorProfile}
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
            formId={doctorProfile.id ?doctorProfileId:savedDBData.id}
            userId={id}
            doctorProfile={doctorProfile}
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
            formId={doctorProfile.id ?doctorProfileId:savedDBData.id}
            userId={id}
            doctorProfile={doctorProfile}
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
        border border-slate-200 dark:border-slate-600 min-h-screen bg-slate-100 dark:bg-slate-900">
          <div className="col-span-full sm:col-span-3 divide-y-2 divide-gray-200 
           bg-gray-300 h-full dark:bg-slate-900">

      
          {
            steps.map((step,i)=>{
                return (
                    <Link  
                    key={i}
                    href={`${pathname}?page=${step.page}`} 
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
         {((truckingNumber || savedDBData?.trackingNumber) && (
            <p className="border-b border-gray-200 dark:border-slate-600
            text-green-500 dark:text-white-400 pb-2">
                Your Trucking Number is {" "}
                <span className="font-bold">
                    {truckingNumber ? truckingNumber : savedDBData.trackingNumber}
                </span>{" "}
                <span className="text-xs">
                (Use this to check the status or resume application)</span>
            </p>
            ))}

            {currentStep?.component}
        </div>

          </div>
    )
}
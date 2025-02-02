"use client"

import {BioDataFormProps } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import RadioInput from "../FormInputs/RadioInput";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { createDoctorProfile, updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export type StepFormProps={
    page:string;
    title:string;
    description:string;
    userId?:string;
    nextPage?:string;
    formId?: string;

}
export default function BioDataForm({
  page,
  title,
  description,
  userId,
  nextPage,
  formId="",
}:StepFormProps){
// Get context data
const { truckingNumber,
  setTruckingNumber,
  doctorProfileId,
  setDoctorProfileId} = useOnboardingContext();
console.log(truckingNumber,doctorProfileId);
  const [isloading, setIsLoading]=useState(false)
  const {bioData,savedDBData,setBioData} = useOnboardingContext()
  const initialDOB = bioData.dob ? new Date(bioData.dob) : undefined || savedDBData.dob;
  const [dob, setDOB] = useState<Date | undefined>(initialDOB);
  const defaultData = bioData || savedDBData
  console.log(savedDBData)

 
  const genderOptions = [
    {
        label: "Male",
        value: "male",
    },
    {
        label: "Female",
        value: "female",
    },
];

  // console.log(date);

  const {register,handleSubmit,reset, formState:{errors}}=useForm<BioDataFormProps>({
    defaultValues:  { 
    firstName: bioData.firstName || savedDBData.firstName,
    lastName: bioData.lastName || savedDBData.lastName,
    middleName: bioData.middleName || savedDBData.middleName,
    dob: bioData.dob || savedDBData.dob,
    gender: bioData.gender || savedDBData.gender,
    page: bioData.page || savedDBData.page,
    trackingNumber: bioData.trackingNumber || savedDBData.trackingNumber,
    },
  });
  const router = useRouter()
  async function onSubmit(data: BioDataFormProps) {
    setIsLoading(true);
    
    if (!dob) {
      toast.error("Please select your date of birth");
      setIsLoading(false);
      return;
    }
  
    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }
  
    data.userId = userId as string;
    
    data.dob = dob.toISOString(); 
    data.trackingNumber = generateTrackingNumber().toString();
    data.page = page;
  
    console.log("Form data:", data);
  
    try {
      const requestPayload = {
        ...data,
        userId: parseInt(data.userId,10), 
      };
     if(formId){
      const res = await updateDoctorProfile(formId,data);
      if (res && res.status === 201) {
        setIsLoading(false);
        toast.success("Bio Data Updated Successfully");   
        setTruckingNumber(res.data?.trackingNumber?.toString() ?? "");
        setDoctorProfileId(res.data?.id?.toString() ?? "");
             
        //Route to the Next Form
        router.push(`/onboarding/${userId}?page=${nextPage}`);
        } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
        }
     }else {
      const res = await createDoctorProfile(requestPayload);

      //save data to the context api
      setBioData(data)
      if (res.status === 201) {
      setIsLoading(false);
      toast.success("Doctor Profile Created");
     
      setTruckingNumber(res.data?.trackingNumber?.toString() ?? "");
      setDoctorProfileId(res.data?.id?.toString() ?? "");
           
      //Route to the Next Form
      router.push(`/onboarding/${userId}?page=${nextPage}`);
      } else {
      setIsLoading(false);
      throw new Error("Something went wrong");
      }
     }
   
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  
  
    return (
      <div className="w-full">
      <div className="text-center border-b border-gray-200 dark:border-slate-600 pb-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 ">
        {title}
      </h1>        
        <p className="text-muted-foreground text-balance">
          {description}
        </p>
      </div>
      <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-2">
        
      <TextInput 
      label="Full Name" 
      register={register} 
      name="firstName" 
      errors={errors}
      placeholder="Eg John "
      className="col-span-full sm:col-span-1"

      />

       <TextInput 
        label="Last Name" 
        register={register}
         name="lastName" 
         errors={errors} 
         placeholder="Eg Doe"
         className="col-span-full sm:col-span-1"
        />

        <TextInput 
        label="Middle Name(optional)" 
        register={register}
         name="middleName" 
         errors={errors} 
         isRequired={false}
         placeholder="Eg A"
         className="col-span-full sm:col-span-1"
         />

         <DatePickerInput  
         className="col-span-full sm:col-span-1"
         date={dob} 
         setDate={setDOB}
         title="Date of Birth"
         />

        <RadioInput 
        radioOptions={genderOptions}
        errors={errors} 
        name="gender"
        title="Gender" 
        register={register}/>

      </div>

        <div className="mt-8 flex justify-center items-center">
        <SubmitButton
        title="Save and Continue" 
        isloading={isloading} 
        loadingTitle="Saving please wait..."/>
        </div>

      </form>
    </div>
    )
  }
  
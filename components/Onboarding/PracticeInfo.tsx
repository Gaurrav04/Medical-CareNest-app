"use client"

import {PracticeFormProps } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import ShadSelectInput from "../FormInputs/ShadSelectInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export default function BioDataForm({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
}:StepFormProps){

  const [isloading, setIsLoading]=useState(false)
  const{practiceData,savedDBData, setPracticeData } = useOnboardingContext()


  const insuranceOptions = [
    {
        label: "Yes",
        value: "yes",
    },
    {
        label: "No",
        value: "no",
    },
];
const initialServices = 
practiceData.servicesOffered.length>0 ? practiceData.servicesOffered: savedDBData.servicesOffered;
const initialLanguages = 
practiceData.languagesSpoken.length>0 ? practiceData.languagesSpoken: savedDBData.languagesSpoken;
const initialInsuranceStatus = practiceData.insuranceAccepted || savedDBData.insuranceAccepted;
const [services,setServices] = useState(initialServices);
console.log(services,initialServices)
const [languages,setLanguages] = useState(initialLanguages);
const [insuranceAccepted,setInsuranceAccepted] = useState(initialInsuranceStatus);


  // console.log(date);

  const {register,handleSubmit,reset, formState:{errors}}=useForm<PracticeFormProps>({
    defaultValues:{
      hospitalName: practiceData.hospitalName || savedDBData.hospitalName,
      hospitalAddress: practiceData.hospitalAddress || savedDBData.hospitalAddress,
      hospitalContactNumber: practiceData.hospitalContactNumber || savedDBData.hospitalContactNumber,
      hospitalEmailAddress: practiceData.hospitalEmailAddress || savedDBData.hospitalEmailAddress,
      hospitalWebsite: practiceData.hospitalWebsite || savedDBData.hospitalWebsite,
      hospitalHoursOfOperation:practiceData.hospitalHoursOfOperation || savedDBData.hospitalHoursOfOperation,
      insuranceAccepted: practiceData.insuranceAccepted || savedDBData.insuranceAccepted,
      languagesSpoken:practiceData.languagesSpoken || savedDBData.languagesSpoken,
      page: practiceData.page || savedDBData.page,
    },
  });
  const router = useRouter()
  async function onSubmit (data: PracticeFormProps) {
    data.page = page;
    data.servicesOffered = services;
    data.languagesSpoken = languages;
    data.insuranceAccepted = insuranceAccepted;
  
    if (data.hospitalHoursOfOperation) {
      data.hospitalHoursOfOperation = Number(data.hospitalHoursOfOperation);
    }
  
    console.log("Form data:", data);
    setIsLoading(true);
  
    try {
      const res = await updateDoctorProfile(formId, data);
      setPracticeData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Practice Info Updated Succesfully")

        router.push(`/onboarding/${userId}?page=${nextPage}`);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error updating profile");
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
      <form className="py-4 pxinsuranceAccepted-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-2">

      <TextInput 
      label="Hospital Name" 
      register={register} 
      name="hospitalName" 
      errors={errors}
      placeholder="Enter Hospital Name "
      className="col-span-full sm:col-span-1"

      />

     <TextInput 
      label="Hourly Charge" 
      register={register} 
      name="hourlyWage" 
      type="number"
      errors={errors}
      placeholder="Enter Charge per Hour"
      className="col-span-full sm:col-span-1"

      />

       <TextInput 
        label="Hospital Address" 
        register={register}
         name="hospitalAddress" 
         errors={errors} 
         placeholder="Enter Hospital Address"
         className="col-span-full sm:col-span-1"
        />

        <TextInput 
        label="Hospital Contact Number" 
        register={register}
         name="hospitalContactNumber" 
         errors={errors} 
         placeholder="Enter Contact Number"
         className="col-span-full sm:col-span-1"
         />
         
         <TextInput 
        label="Hospital Email Address" 
        register={register}
         name="hospitalEmailAddress" 
         errors={errors} 
         placeholder="Eg Enter Hospital Email Address"
         className="col-span-full sm:col-span-1"
         />
         
       <TextInput 
        label="Hospital Website (optional)" 
        register={register}
         name="hospitalWebsite" 
         errors={errors} 
         placeholder="Enter Hospital Website"
         className="col-span-full sm:col-span-1"
         isRequired={false}
         />

        <TextInput 
        label="Hospital Hours Of Operation" 
        register={register}
        name="hospitalHoursOfOperation" 
        errors={errors} 
        placeholder="Enter Hours Of Operation"
        className="col-span-full sm:col-span-1"
        />
          
      <ShadSelectInput
      label="Do you accept Insurance?"
      optionTitle="Insurance Acceptable"
      options={insuranceOptions}
      selectedOption={insuranceAccepted}
      setSelectedOption={setInsuranceAccepted}
      />

       <ArrayItemsInput
        setItems={setServices}
        items={services} 
        itemTitle="Add Hospital Services" 
        />

        <ArrayItemsInput
        setItems={setLanguages}
        items={languages} 
        itemTitle="Add Languages Spoken at the Hospital" 
        />
          

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
  
"use client"

import {AdditionalFormProps, PracticeFormProps } from "@/types/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import TextAreaInput from "../FormInputs/TextAreaInput";
import MultipleFileUpload from "../FormInputs/MultipleFileUpload";
import { StepFormProps } from "./BioDataForm";
import { CompleteProfile, updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";
import { File } from "@/components/FormInputs/MultipleFileUpload"; 

export default function AdditionalInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  doctorProfile,
}:StepFormProps){
  const {additionalData,savedDBData,setAdditionalData} = useOnboardingContext()
  const pathname = usePathname();
  const initialDocs = additionalData.additionalDocs || savedDBData.additionalDocs;

  const isOnboarding = pathname.split("/").includes("onboarding")
  const [isloading, setIsLoading]=useState(false);
  const [additionalDocs, setAdditionalDocs] = useState<File[]>([initialDocs]);
  console.log(formId)


  // console.log(date);

  const {register,handleSubmit,reset, formState:{errors}}=useForm<AdditionalFormProps>({
    defaultValues:{
      educationHistory: doctorProfile.educationHistory || savedDBData.educationHistory,
      research: doctorProfile.research || savedDBData.research,
      accomplishments: doctorProfile.accomplishments || savedDBData.accomplishments,
      page: doctorProfile.page || savedDBData.page,
    }
  });
  const router = useRouter()
  async function onSubmit(data: AdditionalFormProps) {
    data.page = page;
    data.additionalDocs = additionalDocs.map((doc: any) => doc.url || doc.name);
    console.log("Form data:", data);
    setIsLoading(true);
  
    try {
      if (isOnboarding) {
        const res = await CompleteProfile(String(doctorProfile.id), data);
        setAdditionalData(data);
        if (res?.status === 201) {
          setIsLoading(false);
          toast.success("Profile Completed Successfully");
  
          if (isOnboarding) {
            router.push("/login");
          }
        } else {
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      } else {
        const res = await updateDoctorProfile(String(doctorProfile.id), data);
        setAdditionalData(data);
        if (res?.status === 201) {
          setIsLoading(false);
          toast.success("Profile Updated Successfully");

          if (isOnboarding) {
            router.push("/login");
          }
        } else {
          setIsLoading(false)
          throw new Error("Something went wrong");
        }
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

      <TextAreaInput 
      label="Education History" 
      register={register} 
      name="educationHistory" 
      errors={errors}
      placeholder="Enter your Education History"
      />

     <TextAreaInput 
      label="Published Works or Research" 
      register={register} 
      name="research" 
      errors={errors}
      placeholder="Enter any Published Works or Research "
      />

      <TextAreaInput 
      label="Any Special Accomplishments or Awards" 
      register={register} 
      name="accomplishments" 
      errors={errors}
      placeholder="Enter any Special Accomplishments or Awards"
      />

       <MultipleFileUpload
        label="Any Additional Documents (CV, Medical Certifications, etc.) Upload"
        files={additionalDocs}
        setFiles={setAdditionalDocs}
        endpoint="additionalDocs"
        />

      </div>

        <div className="mt-8 flex justify-center items-center">
        <SubmitButton
        title={isOnboarding?"Complete":"Save"}
        isloading={isloading} 
        loadingTitle="Saving please wait..."/>
        </div>

      </form>
    </div>
    )
  }

  
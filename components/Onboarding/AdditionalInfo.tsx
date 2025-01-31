"use client"

import {AdditionalFormProps, PracticeFormProps } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import TextAreaInput from "../FormInputs/TextAreaInput";
import RadioInput from "../FormInputs/RadioInput";
import ImageInput from "../FormInputs/ImageInput";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import SelectInput from "../FormInputs/SelectInput";
import ShadSelectInput from "../FormInputs/ShadSelectInput";
import MultipleFileUpload from "../FormInputs/MultipleFileUpload";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function AdditionalInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
}:StepFormProps){

  const [isloading, setIsLoading]=useState(false);
  const [additionalDocs, setAdditionalDocs] = useState([]);


  // console.log(date);

  const {register,handleSubmit,reset, formState:{errors}}=useForm<AdditionalFormProps>();
  const router = useRouter()
  async function onSubmit(data: AdditionalFormProps) {
    data.page = page;
    data.additionalDocs = additionalDocs.map((doc: any) => doc.url || doc.name);
    console.log("Form data:", data);
    setIsLoading(true);
  
    try {
      const res = await updateDoctorProfile(formId, data);
      if (res?.status === 201) {
        setIsLoading(false);
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
      <div className="text-center border-b border-gray-200 pb-4">
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
        title="Save and Continue" 
        isloading={isloading} 
        loadingTitle="Saving please wait..."/>
        </div>

      </form>
    </div>
    )
  }

  
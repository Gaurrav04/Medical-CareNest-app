"use client"

import {EducationFormProps } from "@/types/types";
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
import { StepFormProps } from "./BioDataForm";
import SelectInput from "../FormInputs/SelectInput";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import MultipleImageInput from "../FormInputs/MultipleImageInput";
import MultipleFileUpload from "../FormInputs/MultipleFileUpload";
import ShadSelectInput from "../FormInputs/ShadSelectInput";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function EducationInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
}:StepFormProps){

  const [isloading, setIsLoading]=useState(false);
  const specialities = [
    {
        label: "Medicine",
        value: "medicine",
    }, 
    {
      label: "Health",
      value: "health",
  },
];
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


  // console.log(date);
  const [otherSpecialties, setOthereSpecialities] = useState([])
  const [docs, setDocs] = useState([])
  const [primarySpecializations,setPrimarySpecializations] = useState("")

  
  const {register,handleSubmit,reset, formState:{errors}}=useForm<EducationFormProps>();
  const router = useRouter()
  async function onSubmit(data: EducationFormProps) {
    data.page = page;
    data.primarySpecializations = primarySpecializations;
    data.otherSpecialties = otherSpecialties;
  
    data.boardCerticates = docs.map((doc: any) => doc.url || doc.name); 
  
    if (data.graduationYear) {
      data.graduationYear = Number(data.graduationYear); 
    }
  
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
      <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-2">

        <TextInput 
        label="Medical School" 
        register={register}
         name="medicalSchool" 
         errors={errors} 
         placeholder="Enter your Grad School Name"
         />
        
        <TextInput 
        label="Graduation Year" 
        register={register}
         name="graduationYear" 
         errors={errors} 
         placeholder="Enter your Grad Year"
         className="col-span-full sm:col-span-1"
         />
           
        <ShadSelectInput
        label="Select Your Primary Specializations"
        optionTitle="Primary Specializations"
        options={specialities}
        selectedOption={primarySpecializations}
        setSelectedOption={setPrimarySpecializations}
        />

        <ArrayItemsInput
        setItems={setOthereSpecialities}
        items={otherSpecialties} 
        itemTitle="Add Other Specialties" 
        />

        <MultipleFileUpload
        label="Upload your Academic Documents (Max of 4 Documents)"
        files={docs}
        setFiles={setDocs}
        endpoint="doctorProfessionDocs"
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
  
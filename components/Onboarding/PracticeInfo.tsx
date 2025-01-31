"use client"

import {PracticeFormProps } from "@/types/types";
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
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function BioDataForm({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
}:StepFormProps){

  const [isloading, setIsLoading]=useState(false)
  const [dob, setDOB] = useState<Date>()
  const [expiry, setExpiry] = useState<Date>()
  const [profileImage,setProfileImage] = useState("")

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

const [services,setServices] = useState([])
const [languages,setLanguages] = useState([])
const [insuranceAccepted,setInsuranceAccepted] = useState("")


  // console.log(date);

  const {register,handleSubmit,reset, formState:{errors}}=useForm<PracticeFormProps>();
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

      <TextInput 
      label="Hospital Name" 
      register={register} 
      name="hospitalName" 
      errors={errors}
      placeholder="Enter Hospital Name "
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
  
"use client"

import {BioDataFormProps, ContactFormProps } from "@/types/types";
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
import { updateDoctorProfile } from "@/actions/onboarding";

export default function ContactInfo({
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

  const {register,handleSubmit,reset, formState:{errors}}=useForm<ContactFormProps>();
  const router = useRouter()
  async function onSubmit (data: ContactFormProps){
    setIsLoading(true);
    
    data.page = page;
    console.log("Form data:", data);
    // setIsLoading(true);

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
        label="Email Address" 
        register={register}
         name="email" 
         errors={errors} 
         placeholder="Eg Johndos@gmail.com"
         />
        
        <TextInput 
        label="Phone" 
        register={register}
         name="phone" 
         errors={errors} 
         placeholder="Eg 9289890909"
         className="col-span-full sm:col-span-1"
         />

       <TextInput 
        label="Country" 
        register={register}
         name="country" 
         errors={errors} 
         placeholder="Enter Your Country"
         className="col-span-full sm:col-span-1"
         />

       <TextInput 
        label="City" 
        register={register}
         name="city" 
         errors={errors} 
         placeholder="Enter Your City"
         className="col-span-full sm:col-span-1"
         />
      
        <TextInput 
        label="State" 
        register={register}
         name="state" 
         errors={errors} 
         placeholder="Enter Your State"
         className="col-span-full sm:col-span-1"
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

  
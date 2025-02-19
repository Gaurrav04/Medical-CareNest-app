"use client"

import {BioDataFormProps, ContactFormProps } from "@/types/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export default function ContactInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  doctorProfile,
}:StepFormProps){
  const {contactData,savedDBData,setContactData} = useOnboardingContext()
  const [isloading, setIsLoading]=useState(false)
  const pathname = usePathname();

  // console.log(date);

  const {register,handleSubmit,reset, formState:{errors}}=useForm<ContactFormProps>({
    defaultValues:{
      email: doctorProfile.email || savedDBData.email,
      phone: doctorProfile.phone || savedDBData.phone,
      country: doctorProfile.country || savedDBData.country,
      city: doctorProfile.city || savedDBData.city,
      state: doctorProfile.state || savedDBData.state,
      page: doctorProfile.page || savedDBData.page,
    }
  });
  const router = useRouter()
  async function onSubmit (data: ContactFormProps){
    setIsLoading(true);
    
    data.page = page;
    console.log("Form data:", data);
    // setIsLoading(true);

    try {
      const res = await updateDoctorProfile(String(doctorProfile.id), data);
      setContactData(data)
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Contact Info Updated Succesfully")


        router.push(`${pathname}?page=${nextPage}`);
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

  
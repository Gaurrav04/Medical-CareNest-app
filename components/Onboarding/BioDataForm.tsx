"use client"

import {type RegisterInputProps } from "@/types/types";
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

export default function BioDataForm(){

  const [isloading, setIsLoading]=useState(false)
  const {register,handleSubmit,reset, formState:{errors}}=useForm<RegisterInputProps>();
  const router = useRouter()
  async function onSubmit (data: RegisterInputProps){
    // console.log(data);
    setIsLoading(true);
 
  }
    return (
      <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 ">
        Bio Data
      </h1>        
        <p className="text-muted-foreground text-balance">
          Enter your information to create an account
        </p>
      </div>
      <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-2">
      <TextInput 
      label="Full Name" 
      register={register} 
      name="fullName" 
      errors={errors}
      placeholder="Eg John Doe"
      />

       <TextInput 
        label="Email Address" 
        register={register}
         name="email" 
         type="email" 
         errors={errors} 
         placeholder="Eg Johndoe@gmail.com"
         className="col-span-full sm:col-span-1"
        />

        <TextInput 
        label="Email Address" 
        register={register}
         name="email" 
         type="email" 
         errors={errors} 
         placeholder="Eg Johndoe@gmail.com"
         className="col-span-full sm:col-span-1"
         />

        <TextInput 
        label="Email Address" 
        register={register}
         name="email" 
         type="email" 
         errors={errors} 
         placeholder="Eg Johndoe@gmail.com"
         className="col-span-full sm:col-span-1"
         />

        <TextInput
         label="Phone Number" 
         register={register}
         name="phone" 
         type="tel" 
         errors={errors} 
         placeholder="Eg 7808089090"
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
  
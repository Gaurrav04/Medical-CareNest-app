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

export default function RegisterWithBg({
  role="USER",
  plan="",
}:{
  role?: string | string[] | undefined; 
  plan?: string | string[] | undefined;
}) {

  const [isloading, setIsLoading]=useState(false)
  const {register,handleSubmit,reset, formState:{errors}}=useForm<RegisterInputProps>();
  const router = useRouter()
  async function onSubmit (data: RegisterInputProps){
    // console.log(data);
    setIsLoading(true);
   
    data.role = role;
    data.plan = plan;
    try {
      const user = await createUser(data);
      if(user && user.status === 200) {
        console.log("User Created Successfully"); 
        reset();
        setIsLoading(false);
        toast.success("User Created Successfully");
        router.push(`/verify-account/${user.data?.id}`)
        console.log(user.data);

      } else {
        console.log(user.error)
      }
    } catch (error) {
      console.log(error);
    }
  }
    return (
        <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-muted-foreground text-balance">
                Enter your information to create an account
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
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
               />

              <TextInput
               label="Phone Number" 
               register={register}
               name="phone" 
               type="tel" 
               errors={errors} 
               placeholder="Eg 7808089090"
               />

              <TextInput 
              label="Password" 
              register={register}
               name="password" 
               type="password" 
               errors={errors} 
               placeholder="********"
               />
      
              <SubmitButton
              title="Sign Up" 
              isloading={isloading} 
              loadingTitle="Creating Account please wait..."/>
      
              <Button variant="outline" className="w-full">Sign with Google</Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline"> Login </a>
            </div>
          </div>
        </div>
        <div className="bg-muted hidden lg:block">
          <Image
            src="/Doctorl.png"
            alt="placeholder"
            width="1170"
            height="848"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    )
  }
  
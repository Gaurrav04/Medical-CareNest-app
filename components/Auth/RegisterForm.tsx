"use client"

import {type RegisterInputProps } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";

export default function RegisterForm() {
  const [isloading, setIsLoading]=useState(false)
  const {register,handleSubmit,reset, formState:{errors}}=useForm<RegisterInputProps>();
  async function onSubmit (data: RegisterInputProps){
    console.log(data);
  }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput label="Full Name" register={register} name="fullName" errors={errors}/>
              
          <TextInput label="Email Address" register={register} name="email" type="email" errors={errors}/>

          <TextInput label="Phone Number" register={register} name="phone" type="tel" errors={errors}/>

          <TextInput label="Password" register={register} name="password" type="password" errors={errors}/>

            <div>
             <SubmitButton title="Create Account" isloading={isloading} loadingTitle="Creating please wait..."/>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-800">
             Already have Account?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    )
  }
  
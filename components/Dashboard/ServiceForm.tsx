"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ImageInput from "../FormInputs/ImageInput";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import { createManyServices, createService } from "@/actions/services";

export type ServiceProps={
    title: string,
    imageUrl: string,
    slug: string,
}

export default function ServiceForm() {
  const [isloading, setIsLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceProps>();
  const router = useRouter();

  async function onSubmit(data: ServiceProps) {
    setIsLoading(true)
    const slug = generateSlug(data.title)
    data.imageUrl = imageUrl;
    data.slug = slug
    console.log(data);
    await createService(data)
    toast.success("Service Created Successfully")
    reset()
    router.push("/dashboard/services")
  }
  async function handleCreateMany(){
    setIsLoading(true)
    try{
      await createManyServices()
      setIsLoading(false)
  }catch (error) {
    console.log(error)
  }
}
  return (
    <div className="w-full max-w-2xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="text-center border-b border-gray-200 dark:border-slate-600 py-4">
        <div className="flex items-center justify-between px-6">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
          Create Service
        </h1>
        {/* <Button tyep="button" onClick={handleCreateMany}>
          {isloading?"Creating...":"Create Many"}
        </Button> */}

        <Button type="button" asChild variant={"outline"}>
          <Link href="/dashboard/services">
          <X className="w-4 h-4"/>
          </Link>
        </Button>
        </div>
      </div>
      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="Service Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter Service Title"
          />

          <ImageInput
            label="Professional Profile Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="serviceImage"
          />
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
        <Button type="button" asChild variant={"outline"}>
          <Link href="/dashboard/services">
           Cancel
          </Link>
        </Button>
            <SubmitButton
            title="Create Service"
            isloading={isloading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}

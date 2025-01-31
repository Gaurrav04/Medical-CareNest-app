"use client"

import {BioDataFormProps, ProfileFormProps } from "@/types/types";
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
import { useOnboardingContext } from "@/context/context";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function ProfileInfoForm({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
}: StepFormProps) {
  const [isloading, setIsLoading] = useState(false);
  const [dob, setDOB] = useState<Date>();
  const [expiry, setExpiry] = useState<Date>();
  const [profileImage, setProfileImage] = useState("");
  const { truckingNumber, doctorProfileId } = useOnboardingContext();
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormProps>();
  const router = useRouter();

  async function onSubmit(data: ProfileFormProps) {
    setIsLoading(true);
    if (!expiry) {
      toast.error("Please select your License Expiry Date");
      return;
    }
    data.page = page;
    data.medicalLicenseExpiry = expiry;
    data.yearOfExperience = Number(data.yearOfExperience);
    data.profilePicture = profileImage;

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
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground text-balance">
          {description}
        </p>
      </div>
      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="Medical License"
            register={register}
            name="medicalLicense"
            errors={errors}
            placeholder="Enter Medical License"
            className="col-span-full sm:col-span-1"
          />

          <TextInput
            label="Years of Experience"
            register={register}
            name="yearOfExperience"
            errors={errors}
            placeholder="Enter Years of Experience"
            className="col-span-full sm:col-span-1"
          />

          <DatePickerInput
            className="col-span-full sm:col-span-1"
            date={expiry}
            setDate={setExpiry}
            title="Medical License Expiry"
          />

          <TextAreaInput
            label="Enter your Biography"
            register={register}
            name="bio"
            errors={errors}
            placeholder="Enter your Biography"
          />

          <ImageInput
            label="Professional Profile Image"
            imageUrl={profileImage}
            setImageUrl={setProfileImage}
            endpoint="doctorProfileImage"
          />
        </div>

        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Save and Continue"
            isloading={isloading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}

"use client"

import { EducationFormProps } from "@/types/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { StepFormProps } from "./BioDataForm";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import ShadSelectInput from "../FormInputs/ShadSelectInput";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";
import { File } from "@/components/FormInputs/MultipleFileUpload"; // Import the File type
import MultipleFileUpload from "@/components/FormInputs/MultipleFileUpload"; 

export default function EducationInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  specialties,
  doctorProfile,
}: StepFormProps) {

  const { educationData,savedDBData, setEducationData } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const allSpecialties = specialties?.map((item)=>{
    return {
      label:item.title,
      value: String(item.id),
    }
  }) || [];
  // Ensure otherSpecialties is an array of strings
  const initialSpecialities = 
  doctorProfile.otherSpecialties.length> 0 ? doctorProfile.otherSpecialties: savedDBData.otherSpecialties;
  const [otherSpecialties, setOtherSpecialties] = useState<string[]>(initialSpecialities); 
  const initialDocs = educationData.boardCerticates || savedDBData.boardCerticates;
  const [docs, setDocs] = useState<File[]>(initialDocs); 

  const [primarySpecializations, setPrimarySpecializations] = useState<string>(
    doctorProfile.primarySpecializations || savedDBData.primarySpecializations || "");
  console.log(docs);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EducationFormProps>({
    defaultValues: {
      medicalSchool: doctorProfile.medicalSchool || savedDBData.medicalSchool,
      graduationYear:doctorProfile.graduationYear || savedDBData.graduationYear,
      primarySpecializations: doctorProfile.primarySpecializations || savedDBData.primarySpecializations,
      page: doctorProfile.page || savedDBData.page,
    },
  });
  const router = useRouter();

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
      const res = await updateDoctorProfile(String(doctorProfile.id), data);
      setEducationData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Education Info Updated Successfully");

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
            options={allSpecialties}
            selectedOption={primarySpecializations}
            setSelectedOption={setPrimarySpecializations}
          />

          <ArrayItemsInput
            setItems={setOtherSpecialties} 
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
            isloading={isLoading}
            loadingTitle="Saving please wait..."
          />
        </div>

      </form>
    </div>
  );
}

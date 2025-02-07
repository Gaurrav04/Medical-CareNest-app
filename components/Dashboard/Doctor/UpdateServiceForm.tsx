"use client"

import { updateDoctorProfileWithService } from '@/actions/services';
import CustomMultiSelect from '@/components/FormInputs/CustomMultiSelect';
import ShadSelectInput, { SelectOption } from '@/components/FormInputs/ShadSelectInput'
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { DoctorProfile } from '@prisma/client';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function UpdateServiceForm({
    services,
    specialties,
    symptoms,
    profile,
}:{
    services:SelectOption[];
    specialties:SelectOption[];
    symptoms:SelectOption[];
    profile:DoctorProfile | undefined | null;

}) {
    // const {data:session,status} = useSession();
    console.log(profile)
    const profileId = profile?.id !== undefined ? String(profile.id) : undefined;
    if(status==="loading"){
        return <div className="flex items-center">
            <Loader className="mr-1 w-4 h-4 animate-spin"/>
            <span>Loading a User...</span>
        </div>
    }
    // const user = session?.user
    const [selectedServiceId,setSelectedServiceId] = useState();
    const [specialtyId,setSpecialtyId] = useState();
    const [symptomIds,setSymptomIds] = useState<SelectOption[]>([]);
    const [loading,setLoading] = useState(false);

    async function handleUpdateService(){
        setLoading(true)
        const data = {
            serviceId: selectedServiceId,
            specialtyId,
            symptomIds:symptomIds.map((item)=>item.value),
        };
        try{
         await updateDoctorProfileWithService(profileId,data)
         toast.success("Profile Updated Successfully")
         setLoading(false)
        } catch (error){
            console.log(error)
            setLoading(false)
        }
        console.log(data);
    }

  return (
       <>
        <CardContent className="space-y-3">
         <ShadSelectInput
            label="Select Service"
            optionTitle="Service" 
            options={services} 
            selectedOption={selectedServiceId} 
            setSelectedOption={setSelectedServiceId}/>

        <ShadSelectInput
            label="Select Specialty"
            optionTitle="Specialty" 
            options={specialties} 
            selectedOption={specialtyId} 
            setSelectedOption={setSpecialtyId}/>

        <CustomMultiSelect
            label="Select Symptoms"
            optionTitle="Symptom" 
            options={symptoms} 
            selectedOption={symptomIds} 
            setSelectedOption={setSymptomIds}/>      
       </CardContent>
      <CardFooter className="border-t px-6 py-4">
      <Button disabled={loading} onClick={handleUpdateService}>
        {loading? "Saving Please wait...":"Save"}
      </Button>
    </CardFooter>
       </>
  )
}

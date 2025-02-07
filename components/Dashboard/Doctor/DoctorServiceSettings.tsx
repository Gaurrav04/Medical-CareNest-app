import React from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import ShadSelectInput, { SelectOption } from '@/components/FormInputs/ShadSelectInput'
import UpdateServiceForm from './UpdateServiceForm'
import { getServices } from '@/actions/services'
import { getspecialties } from '@/actions/specialities'
import { getSymptoms } from '@/actions/symptom'
import { DoctorProfile } from '@prisma/client'

export default async function DoctorServiceSettings({
  profile,
}:{
  profile:DoctorProfile | undefined | null;
}) {
 const allServices = (await getServices()).data
 const allSpecialties = (await getspecialties()).data
 const allSymptoms = (await getSymptoms()).data

 const services: SelectOption[] = 
  allServices?.map((item)=>{
    return {
        label:item.title,
        value: String(item.id),
    }
  }) || []

  const specialties: SelectOption[] = 
   allSpecialties?.map((item)=>{
    return {
        label:item.title,
        value: String(item.id),
    }
  }) || []

  const symptoms: SelectOption[] = 
  allSymptoms?.map((item)=>{
   return {
       label:item.title,
       value: String(item.id),
   }
 }) || []

  return (
    <div className="grid gap-6 w-full">
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Choose Service</CardTitle>
        <CardDescription>
          Used to identify your store in the marketplace.
        </CardDescription>
      </CardHeader>
      <UpdateServiceForm
      profile={profile}
       services={services} 
       specialties={specialties} 
       symptoms={symptoms}/>
     
    </Card>

  </div>
  )
}

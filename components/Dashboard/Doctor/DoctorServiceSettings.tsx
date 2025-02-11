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
 const services = (await getServices()).data
 const specialties = (await getspecialties()).data
 const symptoms = (await getSymptoms()).data

  return (
    <div className="grid gap-6 w-full">
    <Card className="w-full">
      {/* <CardHeader>
        <CardTitle>Choose Service</CardTitle>
        <CardDescription>
          Used to identify your store in the marketplace.
        </CardDescription>
      </CardHeader> */}
      <UpdateServiceForm
       profile={profile}
       services={services} 
       specialties={specialties} 
       symptoms={symptoms}/>
     
    </Card>

  </div>
  )
}

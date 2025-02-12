"use client"

import { updateAppointmentById } from '@/actions/appointments'
import RadioInput from '@/components/FormInputs/RadioInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import TextInput from '@/components/FormInputs/TextInput'
import { Button } from '@/components/ui/button'
import { Appointment } from '@prisma/client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export type AppointmentUpdateProps = {
  status: string;
  meetingLink: string;
  meetingProvider: string;
}
export default function UpdateAppointmentForm({
    appointment,
}:{
    appointment:Appointment;
}) {
    const [loading,setLoading] = useState(false)
    const statusOptions = [
        {
            label:"Pending",
            value:"pending",
        },
        {
            label:"Approve",
            value:"approved",
        },
        {
            label:"Reject",
            value:"rejected",
        },
    ];

    const meetingProviders = [
        {
            label:"Zoom",
            value:"zoom",
        },
        {
            label:"Google Meet",
            value:"google-meet",
        },
        {
            label:"Microsoft Teams",
            value:"microsoft-teams",
        },
    ];
    const {register,handleSubmit,reset, formState:{errors}}=useForm<AppointmentUpdateProps>({
        defaultValues:{
            meetingLink:appointment.meetingLink,
            meetingProvider:appointment.meetingProvider,
            status:appointment.status,
        }
    });

    async function handleUpdate(data:AppointmentUpdateProps){
        setLoading(true)
        try {
        //Update the Appointment
        await updateAppointmentById(appointment.id.toString(), data);
        setLoading(false);
        toast.success("Appointment Updated Successfully")
        } catch (error) {
        setLoading(false)  
        console.log(error);
        }
    }
  return (
    <form className="border-2 border-blue-600 shadow rounded-md p-4 mx-4 my-4"
     onSubmit={handleSubmit(handleUpdate)}>
      <div className="sm:col-span-4">
    <div className="flex items-center justify-between border-b">
       <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
          Update Appointment
       </h2>
       <Button disabled={loading}>
         {loading ? "Saving Please wait..." : "Update Appointment"}
       </Button>
     </div>
         <div className="mt-2">
         {/* <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 
         focus-within:ring-inset focus-within:ring-purple-600 sm:max-w-md">
             <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
             ₹</span>
             <input
               id="price"
               name="price"
               type="number"
               value={price}
               onChange={(e)=> setPrice(+e.target.value)}
               autoComplete="price"
               placeholder="200"
               className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
             />
           </div> */}
          <div className="py-2">
          <TextInput 
            label="Add Meeting Link" 
            register={register}
            name="meetingLink" 
            errors={errors} 
            placeholder="https://meet.google.com/uvb-zzei-vmg"
          />
          </div>
          <div className="py-2">
            <div className="grid grid-cols-2 gap-6">
            <SelectInput
                label="Meeting Provider"
                name="meetingProvider"
                register={register}
                options={meetingProviders}
                className="col-span-1"
                />
            <RadioInput
                title="Approve the Appointment"
                name="status"
                errors={errors}
                register={register}
                radioOptions={statusOptions}
                className="col-span-1"
                />
            </div>
          </div>
         </div>
      </div>
    </form>
  )
}

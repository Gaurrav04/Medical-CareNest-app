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
    appointment: Appointment;
}) {
    const [loading, setLoading] = useState(false)

    const statusOptions = [
        {
            label: "Pending",
            value: "PENDING", 
        },
        {
            label: "Approve",
            value: "APPROVED",  
        },
        {
            label: "Reject",
            value: "REJECTED",  
        },
    ];

    const meetingProviders = [
        {
            label: "Zoom",
            value: "zoom",
        },
        {
            label: "Google Meet",
            value: "google-meet",
        },
        {
            label: "Microsoft Teams",
            value: "microsoft-teams",
        },
    ];

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentUpdateProps>({
        defaultValues: {
            meetingLink: appointment.meetingLink,
            meetingProvider: appointment.meetingProvider,
            status: appointment.status,
        }
    });

    async function handleUpdate(data: AppointmentUpdateProps) {
        setLoading(true)
        try {
            const updatedData = {
                ...data,
                status: data.status.toUpperCase() as "PENDING" | "APPROVED" | "REJECTED", 
            };

            // Update the appointment
            await updateAppointmentById(appointment.id.toString(), updatedData);
            setLoading(false);
            toast.success("Appointment Updated Successfully");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <form className="border-2 border-blue-600 shadow rounded-md p-4 mx-4 my-4" onSubmit={handleSubmit(handleUpdate)}>
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
    );
}

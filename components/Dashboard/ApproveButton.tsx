"use client"
import { updateDoctorProfile } from '@/actions/onboarding';
import { cn } from '@/lib/utils'
import { DoctorStatus } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import ShadSelectInput from '../FormInputs/ShadSelectInput';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function ApproveButton({
  status,
  profileId,
}:{
  status:DoctorStatus;
  profileId: string;
}) {
  const router = useRouter();
  const options = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
  ];

  const initialOption = status;
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [loading, setLoading] = useState(false);

  async function updateStatus(){
    setLoading(true);
    const data = { status: selectedOption };

    try {
      const res = await updateDoctorProfile(profileId, data);
      if (res?.status === 201) {
        toast.success("Doctor Status Changed Successfully");
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "py-1.5 px-3 rounded-md text-xs",
            status === "Approved" ? "bg-green-500 text-white" :
            status === "Pending" ? "bg-orange-400" :
            "bg-red-500 text-white"
          )}
        >
          {status}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve the Doctor</DialogTitle>
          <DialogDescription>
            <div className="py-4">
              <ShadSelectInput
                label="Status"
                optionTitle="Status"
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={updateStatus} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

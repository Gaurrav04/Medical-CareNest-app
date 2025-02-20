"use client"

import React from 'react' 
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { Check,Mail, MapPin, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { DoctorDetail } from '@/types/types'
import { getInitials } from '@/utils/generateInitials'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ApproveButton from '../ApproveButton'


export default function DoctorPanel({
  doctors,
  role,
}:{
  doctors: DoctorDetail[];
  role: string;
}) {
  const pathname = usePathname()
  return (
    <ScrollArea className="h-96 w-full">
     {
          doctors && doctors.map((doctor)=>{
            const status =  doctor?.doctorProfile?.status??"Pending";
            const initials = getInitials(doctor.name);
            return (
              <Link href={`/dashboard/doctors/view/${doctor.id}`} 
              key={doctor.id} 
              className="flex items-center gap-4 mb-6">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={doctor.doctorProfile?.profilePicture??""} alt="Avatar" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{doctor.name}</p>
                <p className="text-muted-foreground text-sm">{doctor.email}</p>
              </div>
              <div className="ml-auto font-medium">
              <ApproveButton 
                status={status} 
                profileId={doctor.doctorProfile?.id?.toString() ?? ""} 
              />

              </div>
            </Link>
            )
          })
         }
  </ScrollArea>
  );
}

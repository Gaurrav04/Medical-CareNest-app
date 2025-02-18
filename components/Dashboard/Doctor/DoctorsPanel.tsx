"use client"

import React from 'react' 
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { Check,Mail, MapPin, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { DoctorProps } from '@/app/(back)/dashboard/user/doctors/layout'
import generateSlug from '@/utils/generateSlug'


export default function DoctorsPanel({
  doctors,
  role,
}:{
  doctors: DoctorProps[];
  role: string;
}) {
  const pathname = usePathname()
  return (
    <ScrollArea className="h-96 w-full">
       {doctors.map((item,i) => {
        const slug = generateSlug(item.doctorName);
        return (
          <Link 
          key={i}
          href={`/doctors/${slug}?id=${item.doctorId}`} 
          className={cn(
           "border mb-2 border-gray-300 shadow-sm text-xs bg-white dark:text-slate-900 py-3 px-2 inline-block w-full rounded-md",
          pathname===`/dashboard/doctor/patients/view/${item.doctorId}` && 
          "border-green-700 border-2 bg-green-50")}>
 
         <div className="flex justify-between items-center pb-2">
            <h2>{item.doctorName}</h2>
         </div>
        </Link>
        )
       })}
  </ScrollArea>
  );
}

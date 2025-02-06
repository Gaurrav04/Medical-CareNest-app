"use client"

import { Dot, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SpecialtyProps } from './SpecialtyForm'
import { deleteSpecialty } from '@/actions/specialities'
import toast from 'react-hot-toast'
import { Speciality } from '@prisma/client'
import { DeletePopup } from './DeletePopup'

export default function SpecialtyCard({ 
  specialty 
}: { 
  specialty: Speciality ;
}) {

  async function handleDelete(id: string) {
    if (id) {
      await deleteSpecialty(id);
      toast.success("Specialty Deleted Successfully");
    } else {
      toast.error("Invalid Specialty ID");
    }
  }
  
  return (
     <div 
        className="border mb-2 border-gray-100 shadow-sm text-xs 
          bg-white dark:text-slate-900 py-3 px-4 w-full rounded-md flex items-center gap-4 justify-between">
      
        <h2>{specialty.title}</h2>
        <div className="flex">
          <Link className="text-blue-600" href={`/dashboard/specialties/update/${specialty.slug}`}>
          <Pencil className="w- h-4"/>
          </Link>

          <DeletePopup title="Specialty" id={specialty.id.toString()} handleDelete={handleDelete} />


        </div>
     </div>
  )
}

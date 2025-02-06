"use client"

import { Dot, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SpecialtyProps } from './SpecialtyForm'
import { deleteSpecialty } from '@/actions/specialities'
import toast from 'react-hot-toast'
import { Symptom } from '@prisma/client'
import { DeletePopup } from './DeletePopup'
import { deleteSymptom } from '@/actions/symptom'

export default function SymptomCard({ 
  symptom 
}: { 
  symptom: Symptom ;
}) {

  async function handleDelete(id: string) {
    if (id) {
      await deleteSymptom(id);
      toast.success("Symptom Deleted Successfully");
    } else {
      toast.error("Invalid Symptom ID");
    }
  }
  
  return (
     <div 
        className="border mb-2 border-gray-100 shadow-sm text-xs 
          bg-white dark:text-slate-900 py-3 px-4 w-full rounded-md flex items-center gap-4 justify-between">
      
        <h2>{symptom.title}</h2>
        <div className="flex">
        <Link className="text-blue-600" href={`/dashboard/symptoms/update/${symptom.slug}`}>
          <Pencil className="w- h-4"/>
          </Link>

          <DeletePopup title="service" id={symptom.id.toString()} handleDelete={handleDelete} />


        </div>
     </div>
  )
}

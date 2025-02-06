"use client"

import { deleteService } from '@/actions/services'
import { ServiceProps } from '@/types/types'
import { Service } from '@prisma/client'
import { Dot, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { DeletePopup } from './DeletePopup'

export default function ServiceCard({service}:{service:Service}) {

  async function handleDelete(id: string) {
    if (id) {
      await deleteService(id);
      toast.success("Specialty Deleted Successfully");
    } else {
      toast.error("Invalid Specialty ID");
    }
  }

  return (
     <div 
        className="border mb-2 border-gray-100 shadow-sm text-xs 
          bg-white dark:text-slate-900 py-3 px-2 w-full rounded-md flex items-center gap-4 justify-between">
        
       <div className="flex items-center gap-3">
       <Image 
         src={service.imageUrl} 
         width={512} 
          height={512} 
          alt={service.title} 
         className="w-14 h-auto"
          />

        <h2>{service.title}</h2>
       </div>
        <div className="flex">
          <Link className="text-blue-600" href={`/dashboard/services/update/${service.slug}`}>
          <Pencil className="w- h-4"/>
          </Link>
          <DeletePopup title="service" id={service.id.toString()} handleDelete={handleDelete} />
          </div>
     </div>
  )
}

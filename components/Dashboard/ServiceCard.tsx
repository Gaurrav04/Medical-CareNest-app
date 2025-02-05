import { ServiceProps } from '@/types/types'
import { Dot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ServiceCard({service}:{service:ServiceProps}) {
  return (
     <Link 
        href={`/dashboard/services/update/${service.slug}`} 
        className="border mb-2 border-gray-100 shadow-sm text-xs 
          bg-white dark:text-slate-900 py-3 px-2 w-full rounded-md flex items-center gap-4">
        
        <Image src={service.imageUrl} width={512} height={512} alt={service.title}
        className="w-14 h-auto"/>
        <h2>{service.title}</h2>
     </Link>
  )
}

import { ServiceWithDoctorProfileCount } from '@/actions/services'
import { ServiceProps } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ServiceCard({service}:{service:ServiceWithDoctorProfileCount}) {
  return (
    <Link 
        href= {`/service/${service.slug}`}
        className="rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 duration-300 
        flex items-center gap-4 overflow-hidden px-2">

        <Image 
          src={service.imageUrl} 
          width={1170} 
          height={848} 
          alt={service.title}
          className="w-14 h-14 object-contain aspect-video" />
        <div className="flex flex-col w-2/3 py-4">
            <h2>{service.title}</h2>
            <p className='text-[0.6rem]'>{service._count.doctorProfiles} Doctors Avaiable</p>
        </div>
    </Link>
  )
}

import { getServices } from '@/actions/services'
import { getspecialties } from '@/actions/specialities'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import ServiceCard from '@/components/Dashboard/ServiceCard'
import ServiceForm from '@/components/Dashboard/ServiceForm'
import SpecialtyCard from '@/components/Dashboard/SpecialtyCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar, CalendarDays, LayoutGrid, NotebookPen } from 'lucide-react'
import React from 'react'

export default async function page() {
  const specialties = (await getspecialties()).data || [];
  return (
    <div>
        {/* Header */}
       
         {/* 2 Panels */}
         <div className="grid grid-cols-12">
           {/* List Panel */}
           <div className="lg:col-span-4 col-span-full py-3 border-r border-gray-100">
            <div className="flex items-center justify-between">

             <PanelHeader 
              title="Specialties" 
              count={specialties.length} 
              icon={NotebookPen}/>

           <div className="lg:hidden">
             <NewButton title="New Specialty" href="/dashboard/specialties/new"/>
            </div>
           </div>
           <div className="px-3">
           <ScrollArea className="h-96 w-full">
       {specialties.map((specialty) => (
        <SpecialtyCard key={specialty.title} specialty={specialty}/>
      ))}
        </ScrollArea>
            </div>
           </div>

        <div className="lg:col-span-8 col-span-full hidden lg:block">
           {/* Display Panel */}
           <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-4">
            <NewButton title="New Specialty" href="/dashboard/specialties/new"/>
           </div>
          </div>
          <div className="flex h-1/2 items-center justify-center">
        <div className="py-4 px-6 text-center border border-gray-100 shadow-md 
        rounded-md flex flex-col items-center gap-1 text-sm">
        <NotebookPen/>
        <div className="py-3">
          {" "}
        <p>You have {(specialties.length).toString().padStart(2,"0")} specialties today.</p>  
        </div>
         <NewButton title="New Specialty" href="/dashboard/specialties/new"/>
    </div>
      </div>
          </div>
         </div>
    </div>
  )
}

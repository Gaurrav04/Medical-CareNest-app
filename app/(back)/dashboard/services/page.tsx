import { getServices } from '@/actions/services'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import ServiceCard from '@/components/Dashboard/ServiceCard'
import ServiceForm from '@/components/Dashboard/ServiceForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarDays, LayoutGrid } from 'lucide-react'
import React from 'react'

export default async function page() {
  const services = (await getServices()).data || [];
  return (
    <div>
        {/* Header */}
       
         {/* 2 Panels */}
         <div className="grid grid-cols-12">
           {/* List Panel */}
           <div className="lg:col-span-4 col-span-full py-3 border-r border-gray-100">
            <div className="flex items-center justify-between">
             <PanelHeader title="Services" count={12} icon={LayoutGrid}/>
           <div className="lg:hidden">
             <NewButton title="New Service" href="/dashboard/services/new"/>
            </div>
           </div>
           <div className="px-3">
           <ScrollArea className="h-96 w-full">
       {services.map((service) => (
        <ServiceCard key={service.title} service={service}/>
      ))}
        </ScrollArea>
            </div>
           </div>

        <div className="lg:col-span-8 col-span-full hidden lg:block">
           {/* Display Panel */}
           <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-4">
            <NewButton title="New Service" href="/dashboard/services/new"/>
           </div>
          </div>
          <HomeDisplayCard/>
          </div>
         </div>
    </div>
  )
}

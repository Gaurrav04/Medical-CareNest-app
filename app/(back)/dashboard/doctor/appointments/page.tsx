import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import { CalendarDays } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div>
        {/* Header */}
       
         {/* 2 Panels */}
         <div className="grid grid-cols-12">
           {/* List Panel */}
           <div className="col-span-4 py-3 border-r border-gray-100">
            <PanelHeader title="Appointments" count="11" icon={CalendarDays}/>
           <div className="px-3">
            <ListPanel/>
            </div>
           </div>

        <div className="col-span-8">
           {/* Display Panel */}
           <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-4">
            <NewButton title="New Appointment" href="#"/>
           </div>
          </div>
           <HomeDisplayCard/>
        </div>
         </div>
    </div>
  )
}

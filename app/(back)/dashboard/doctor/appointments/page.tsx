import { getAppointments } from '@/actions/appointments'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import { CalendarDays } from 'lucide-react'
import React from 'react'

export default async function page() {
  const appointments = (await getAppointments()).data||[]
  return (
    <div>
       <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NewButton title="New Appointment" href="#"/>
        </div>
       </div>
       <HomeDisplayCard count={appointments.length}/>
    </div>
  );
}

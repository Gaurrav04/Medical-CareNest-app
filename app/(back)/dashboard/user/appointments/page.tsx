import { getAppointments, getPatientAppointments } from '@/actions/appointments'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { CalendarDays } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user
  if(user?.role !=="USER"){
    return (
      <NotAuthorized/>
    )
  }
  const appointments = (await getPatientAppointments(user?.id)).data||[];
  // console.log(appointments)
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

import { getDoctorAppointments, getPatientAppointments } from '@/actions/appointments'
import { getDoctorById } from '@/actions/users'
import ApproveButton from '@/components/Dashboard/ApproveButton'
import { cn } from '@/lib/utils'
import { timeAgo } from '@/utils/timeAgo'
import { CalendarCheck, Check, CircleEllipsis, History, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getNormalDate } from '@/utils/getNormalDate'

export default async function page({
  params: {id},
}:{
  params: {id:string};
}) {
  const appointments = (await getDoctorAppointments(id)).data || [];
  const doctor = await getDoctorById(id);
  const status = doctor?.doctorProfile?.status ?? "Pending";
  const dob = doctor?.doctorProfile?.dob
  // console.log(dob)
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            {doctor?.name}
          </h2>
          <h2 className="border-b pb-3 mb-3">
            {doctor?.email} | {doctor?.phone}
          </h2>
        </div>
        <div className="">
        <ApproveButton 
          status={status} 
          profileId={doctor?.id?.toString() ?? ""}
        />


          <h2 className="border-b pb-3 mb-3">Appointments ({appointments.length.toString().padStart(2,"0")})</h2>
        </div>
      </div>
          <Tabs defaultValue="details" className="w-full">
      <TabsList>
        <TabsTrigger value="details">Doctor Details</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <div className="p-4">
          <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Bio Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="mr-3">First Name :</span>
              <span>{doctor?.doctorProfile?.firstName}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3">Last Name :</span>
              <span>{doctor?.doctorProfile?.lastName}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3">Date of Birth :</span>
              <span>{getNormalDate(dob as Date)}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3">Middle Name :</span>
              <span>{doctor?.doctorProfile?.middleName}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3">Gender :</span>
              <span>{doctor?.doctorProfile?.gender}</span>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="appointments">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        {appointments.map((item)=> {
          return (
            <Link 
            key={item.id}
            href={`/dashboard/doctor/appointments/view/${item.id}`} 
            className={cn(
             "border mb-2 border-gray-300 shadow-sm text-xs bg-white dark:text-slate-900 py-3 px-2 inline-block w-full rounded-md",
          )}>
   
           <div className="flex justify-between items-center pb-2">
              <h2>{item.firstName} {item.lastName}</h2>
              <div className="flex items-center">
               <History className="w-4 h-4 mr-2"/>
              <span>{timeAgo(item.createdAt)}</span>
              </div>
           </div>
           <div className="flex items-center gap-4 border-b">
              <div className="flex items-center font-semibold">
               <CalendarCheck className="w-4 h-4 mr-2"/>
              <span>{item.appointmentFormattedDate}</span>
              </div>
              <span className="font-semibold">{item.appointmentTime}</span>
           </div>
             <div className={cn("flex items-center pt-2 text-blue-600",item.status==="APPROVED" &&
                "text-green-600 font-semibold")}>
               {item.status==="PENDING"?(
                 <CircleEllipsis className="mr-2 w-4 h-4"/>
               ):item.status==="APPROVED"?(
                 <Check className="mr-2 w-4 h-4"/>
               ):(
                 <X className="mr-2 w-4 h-4"/>
               )}
               <span>{item.status}</span>
             </div>
          </Link>
          )
        })}
      </div>
      </TabsContent>
    </Tabs>

    
    </div>
  );
}

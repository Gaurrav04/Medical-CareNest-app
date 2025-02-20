import { getDoctorAppointments, getPatientAppointments } from '@/actions/appointments'
import { getDoctorById, getDoctorProfile } from '@/actions/users'
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
  const doctorProfile = await getDoctorProfile(id)
  const status = doctor?.doctorProfile?.status ?? "Pending";
  const dob = doctor?.doctorProfile?.dob;

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
        <TabsTrigger value="education">Education Info</TabsTrigger>
        <TabsTrigger value="practice">Practice Info</TabsTrigger>
        <TabsTrigger value="additional">Additional Info</TabsTrigger>
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
        <div className="p-4">
          <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="mr-3">Medical License :</span>
              <span>{doctorProfile?.doctorProfile?.medicalLicense}</span>
            </div>
            <div className="flex items-center">
            <span className="mr-3 whitespace-nowrap">Medical License Expiry:</span>
            <span>{doctorProfile?.doctorProfile?.medicalLicenseExpiry ? getNormalDate(doctorProfile.doctorProfile.medicalLicenseExpiry) : "N/A"}</span>
          </div>

            <div className="flex items-center">
              <span className="mr-3">Years of Experience :</span>
              <span>{doctorProfile?.doctorProfile?.yearOfExperience}</span>
            </div>
             <div className="mt-4">
          <span className="text-sm uppercase tracking-widest border-b pb-1 mb-2">About Dr. {doctorProfile?.name}</span>
          <p className="text-gray-900 leading-relaxed">{doctorProfile?.doctorProfile?.bio || "No bio available."}</p>
           </div>
          </div>
        </div>
        <div className="p-4">
    <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Contact Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center">
        <span className="mr-3">Email Address :</span>
        <span>{doctorProfile?.doctorProfile?.email}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Phone :</span>
        <span>{doctorProfile?.doctorProfile?.phone}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Country :</span>
        <span>{doctorProfile?.doctorProfile?.country}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">City :</span>
        <span>{doctorProfile?.doctorProfile?.city}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">State :</span>
        <span>{doctorProfile?.doctorProfile?.state}</span>
      </div>
    </div>
        </div>
      </TabsContent>
      <TabsContent value="education">
      <div className="p-4">
    <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Education Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center">
        <span className="mr-3">Medical School:</span>
        <span>{doctorProfile?.doctorProfile?.medicalSchool}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Graduation Year:</span>
        <span>{doctorProfile?.doctorProfile?.graduationYear}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Primary Specialization:</span>
        <span>{doctorProfile?.doctorProfile?.primarySpecializations}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Other Specialties:</span>
        <span>{doctorProfile?.doctorProfile?.otherSpecialties?.join(", ") || "None"}</span>
      </div>
    </div>
       </div>
      </TabsContent>
      <TabsContent value="practice">
      <div className="p-4">
    <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Practice Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center">
        <span className="mr-3">Hospital Name:</span>
        <span>{doctorProfile?.doctorProfile?.hospitalName}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Hospital Address:</span>
        <span>{doctorProfile?.doctorProfile?.hospitalAddress}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Hospital Contact Number:</span>
        <span>{doctorProfile?.doctorProfile?.hospitalContactNumber}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Hospital Email Address:</span>
        <span>{doctorProfile?.doctorProfile?.hospitalEmailAddress}</span>
      </div>

      <div className="flex items-center">
        <span className="mr-3">Hours of Operation:</span>
        <span>{doctorProfile?.doctorProfile?.hospitalHoursOfOperation}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Hourly Charge:</span>
        <span>{doctorProfile?.doctorProfile?.hourlyWage ? `₹${doctorProfile?.doctorProfile?.hourlyWage}` : "N/A"}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">Accepts Insurance:</span>
        <span>{doctorProfile?.doctorProfile?.insuranceAccepted ? "Yes" : "No"}</span>
    </div>
  </div>
      </div>
    </TabsContent>
    <TabsContent value="additional">
    <div className="p-4">
        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Additional Information</h2>
        <div className="mt-4">
          <h3 className="font-semibold">Education History</h3>
          <p className="text-gray-900 leading-relaxed mt-1">
            {doctorProfile?.doctorProfile?.educationHistory || "Education details are not available."}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Published Works or Research</h3>
          <p className="text-gray-900 leading-relaxed mt-1">
            {doctorProfile?.doctorProfile?.research || "No published works or research listed."}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Special Accomplishments or Awards</h3>
          <p className="text-gray-900 leading-relaxed mt-1">
            {doctorProfile?.doctorProfile?.accomplishments || "No special accomplishments or awards mentioned."}
          </p>
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

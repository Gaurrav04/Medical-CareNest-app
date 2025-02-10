import { getDoctorBySlug } from '@/actions/users';
import DoctorDetails from '@/components/DoctorDetails';
import FixedBookButton from '@/components/FixedBookButton';
import Image from 'next/image';
import React from 'react';

export default async function page({
  params:{slug},
}:{
  params:{slug:string};
}) {
  //Fetch Doctor
  const doctor = await getDoctorBySlug(slug)|| null;
  return (
   <>
   {doctor && doctor.id ?(
     <div className="bg-slate-100  dark:bg-slate-800 py-8 min-h-screen">
     <div className="bg-white dark:bg-slate-950 max-w-4xl border border-gray-200 dark:border-slate-700
      mx-auto shadow-md rounded-md">
       <div className="py-8 px-6 flex items-center justify-between">
         <div className="flex flex-col text-left pl-4"> 
           <h2 className="uppercase font-bold text-2xl tracking-widest text-gray-800 dark:text-gray-200">
             {doctor.name}
           </h2>
           <p className="text-gray-700 text-xs uppercase dark:text-gray-400">
            Adult Health
            </p>
           <p className="mt-2 text-gray-800 dark:text-gray-400">
            {doctor.doctorProfile?.operationMode}
            </p>
           <p className="text-gray-800 dark:text-gray-400">
            {doctor.doctorProfile?.state},{" "}
            {doctor.doctorProfile?.city},{" "}
            {doctor.doctorProfile?.country}
            </p>
         </div>
         <Image
           src={doctor.doctorProfile?.profilePicture ?? "/Doctor.png"}
           width={243}
           height={207}
           alt="Doctor"
           className="w-36 h-36 rounded-full object-cover"
         />
       </div>

       <div className="py-2 px-8">
         <DoctorDetails doctor={doctor}/>
       </div>
     </div>
     {/* <FixedBookButton price={doctor.doctorProfile?.hourlyWage}/> */}
   </div>
   ):(
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      No Doctor Details Found
    </h2>
    </div>
   )}
   </>
  );
}

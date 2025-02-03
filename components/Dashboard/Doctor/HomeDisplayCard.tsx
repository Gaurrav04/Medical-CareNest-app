import React from 'react'
import { Calendar } from "lucide-react"
import NewButton from './NewButton'

export default function HomeDisplayCard() {
  return (
      <div className="flex h-1/2 items-center justify-center">
        <div className="py-4 px-6 text-center border border-gray-100 shadow-md 
        rounded-md flex flex-col items-center gap-1 text-sm">
        <Calendar/>
        <div className="py-3">
        <p>You have 10 appointments today.</p>
        <p>11 New Patients, 2 Follow Ups, 4 Annual Physicals</p>  
        </div>
         <NewButton title="New Appointment" href="#"/>
    </div>
      </div>
  );
}

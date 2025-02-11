import React from 'react'
import { Calendar } from "lucide-react"
import NewButton from './NewButton'

type HomeDisplayCardProps = {
  count:number;
}

export default function HomeDisplayCard({count}: HomeDisplayCardProps) {
  return (
      <div className="flex h-1/2 items-center justify-center">
        <div className="py-4 px-6 text-center border border-gray-100 shadow-md 
        rounded-md flex flex-col items-center gap-1 text-sm">
        <Calendar/>
        <div className="py-3">
          {" "}
        <p>You have {count} appointments today.</p>  
        </div>
         <NewButton title="New Appointment" href="#"/>
    </div>
      </div>
  );
}

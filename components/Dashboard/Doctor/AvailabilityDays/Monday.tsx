import { createAvailability, updateAvailabilityById } from '@/actions/onboarding';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import { Button } from '@/components/ui/button';
import { DoctorProfile } from '@prisma/client';
import { Loader, Plus, X } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Monday({
    profile,
}:{
    profile:any;
}) {
    const availability = profile?.availability||"";

    const timesArray = [
        "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
    ];

    const [selectedTimes,setSelectedTimes] = useState([
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
    ]);

    // console.log(selectedTimes)
    function handleAddTime(time:string){
        if(!selectedTimes.includes(time)){
          setSelectedTimes((prevTimes) => [...prevTimes,time]);
        }else{
            toast.error(`${time} already added`)
        }
    }
    function handleRemoveTime(index:number){
        const updatedTimes = selectedTimes.filter((_,i)=>i!==index)
        setSelectedTimes(updatedTimes)
    }
    function handleAddAll(){
        setSelectedTimes([...timesArray]);
    }

    function clearAll(){
        setSelectedTimes([]);
    }

    async function handleSubmit(){
        setLoading(true)
       try {
        if(profile?.id && availability?.id){
            const data = {
                monday: selectedTimes,
                doctorProfileId: profile.id,
            };
            await updateAvailabilityById(availability?.id,data);
            setLoading(false);
            toast.success("Settings Updated Successfully")
            console.log(data);
        }else if(profile?.id){
            console.log("id not set");
            const data = {
                tuesday: selectedTimes,
                doctorProfileId: profile.id,
            };
            await createAvailability(data);
            toast.success("Settings Updated Successfully")
            setLoading(false);
        }else{
            console.log("Profile id Not set")
        }
       } catch (error) {
        setLoading(false)
        console.log(error)
       }
    }

    const [loading,setLoading] = useState(false)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 border-gray-200 dark:border-gray-600
     shadow rounded-md divide-x divide-gray-200">
        <div className="p-4">
            <h2 className="font-semibold">
                Select the Times your Available for this Day
            </h2>
            <div className="py-6 grid grid-cols-3 gap-3">
                 <button
                    onClick={handleAddAll}
                    className="flex items-center justify-center py-2 px-2 border border-blue-500 
                    rounded-md text-sm">
                    <span>Add All</span>
                    <Plus className="w-3 h-3 ml-2"/>
                 </button>
                {
                    timesArray.map((time,i)=>{
                        return (
                            <button
                            onClick={()=>handleAddTime(time)}
                            key={i} className="flex items-center justify-center py-2 px-2 border border-blue-100 
                            rounded-md text-sm">
                            <span>{time}</span>
                            <Plus className="w-3 h-3 ml-2"/>
                            </button>
                        );
                    })
                }
            </div>
        </div>
        <div className="p-4">
            <h2 className="font-semibold">Here is your Selected Time</h2>
            <div className="py-6 grid grid-cols-3 gap-3">
                {
                    selectedTimes.map((time,i)=>{
                        return (
                            <button
                            onClick={()=>handleRemoveTime(i)}
                            key={i}
                             className="flex items-center justify-center py-2 px-2 border border-red-500 
                            bg-blue-300 rounded-md text-sm">
                            <span>{time}</span>
                            <X className="w-3 h-3 ml-2"/>
                            </button>
                        );
                    })
                }
               
            </div>
            {
                selectedTimes.length > 0 && (
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                {loading ? (
                    <Button disabled>
                    <Loader className="animate-spin w-4 h-4"/>
                    Saving Please wait...
                    </Button>
                ): (
                    <Button onClick={handleSubmit}>Save Settings</Button>
                )} 
                 
                <button
                    onClick={clearAll}
                    className="flex items-center justify-center py-2 px-2 border border-red-500 
                    rounded-md text-sm">
                    <span>Clear All</span>
                    <X className="w-3 h-3 ml-2"/>
                 </button>
                </div>
                )
            }
        </div>
    </div>
  )
}

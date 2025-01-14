"use client"
import React from 'react'
import { Calendar } from "@/components/ui/calendar"

export default function Availability() {
    const [bookDate, setBookDate] = React.useState<Date | undefined>(new Date());
    const GMT = bookDate?.toString().split("GMT")[1].split(" ")[0];

    const formattedDate = `${bookDate 
        ?.toString()
        .split(" ")
        .slice(0, 3)
        .join(" ") }- GMT${GMT} `;

    console.log(formattedDate);

    return (
        <div>
            <h2 className="font-bold py-4 text-xl uppercase text-gray-800 tracking-wider">SELECT A DATE AND TIME</h2>
            <div className="grid grid-cols-2">
                <div className="sm:col-span-1 col-span-full">
                    <Calendar
                        mode="single"
                        selected={bookDate}
                        onSelect={setBookDate}
                        className="rounded-md border shadow"
                    />
                </div>
                <div className="sm:col-span-1 col-span-full">
                    <div className="px-4">
                        <h2 className="pb-4 uppercase text-gray-900">{formattedDate}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

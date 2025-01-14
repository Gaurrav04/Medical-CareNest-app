import React from 'react';

export default function DoctorDetails() {
    return (
        <div className="">
            <div className="flex items-center justify-between  ">
                <button className="py-4 px-8 bg-blue-600 text-white">Service Details</button>
                <button className="bg-slate-50 text-gray-800">Availability</button>
            </div>
            <div>
                <div>Service Details Component</div>
                <div>Availability Details Component</div>
            </div>
        </div>
    );
}

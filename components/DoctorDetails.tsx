"use client";
import React, { useState } from "react";

export default function DoctorDetails() {
    const [isActive, setIsActive] = useState("availability");

    return (
        <div className="">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setIsActive("details")}
                    className={
                        isActive === "details"?"py-4 px-8 w-full bg-blue-600 text-white uppercase tracking-widest"
                            :"border border-gray-200 bg-gray-200 w-full py-4 px-8 text-gray-800 uppercase tracking-widest"
                    }
                >
                    Service Details
                </button>
                <button
                    onClick={() => setIsActive("availability")}
                    className={
                        isActive ==="availability"?"py-4 px-8 w-full bg-blue-600 text-white uppercase tracking-widest"
                            :"border border-gray-200 bg-gray-200 w-full py-4 px-8 text-gray-800 uppercase tracking-widest"
                    }
                >
                    Availability
                </button>
            </div>
            <div className="py-8 px-6">
                {isActive === "availability" ? (
                    <div>Availability Details Component</div>
                ) : (
                    <div>Service Details Component</div>
                )}
            </div>
        </div>
    );
}

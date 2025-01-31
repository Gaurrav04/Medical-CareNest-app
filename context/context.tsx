"use client";

import { ReactNode, createContext, useContext, useState } from "react";

// Steps for Creating Context API
// 1. Define the shape of the data to track
// 2. Define the initial data 
// 3. Create and export the context
// 4. Add the types to the context and initialData 

// Use the created context to Create and export context Provider 

// Create And Export UseContext Hook

// Wrap the Entire App with the Provider
interface IOnBoardingContextData {
    truckingNumber: string;
    setTruckingNumber:(value:string)=>void
    setDoctorProfileId:(value:string)=>void
    doctorProfileId: string;
}
const initialData = {
    truckingNumber:"",
    doctorProfileId:"",
    setTruckingNumber:()=>{},
    setDoctorProfileId:()=>{}
};

const OnBoardingContext = createContext<IOnBoardingContextData>(initialData);

// Create and export the Context Provider
export function OnboardingContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [truckingNumber, setTruckingNumber] = useState("DZAQMU8OX8");
    const [doctorProfileId, setDoctorProfileId] = useState("7");

    const contextValues = {
        truckingNumber,
        setTruckingNumber,
        doctorProfileId,
        setDoctorProfileId,
    };

    return (
        <OnBoardingContext.Provider value={contextValues}>
            {children}
        </OnBoardingContext.Provider>
    );
}

export function useOnboardingContext() {
    return useContext(OnBoardingContext);
}

export default OnBoardingContext;

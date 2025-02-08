"use client";

import { AdditionalFormProps, BioDataFormProps, ContactFormProps, EducationFormProps, PracticeFormProps, ProfileFormProps } from "@/types/types";
import { DoctorProfile } from "@prisma/client";
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
    setTruckingNumber:(value:string)=>void;
    setDoctorProfileId:(value:string)=>void;
    doctorProfileId: string;

    //Track the form Data
    bioData:BioDataFormProps
    setBioData:(data:BioDataFormProps)=>void;

     //Track the form Data
     profileData:ProfileFormProps
     setProfileData:(data:ProfileFormProps)=>void;

    //Track the form Data
    contactData:ContactFormProps
    setContactData:(data:ContactFormProps)=>void;

     //Track the form Data
     educationData:EducationFormProps
     setEducationData:(data:EducationFormProps)=>void;

    //Track the form Data
    practiceData:PracticeFormProps
    setPracticeData:(data:PracticeFormProps)=>void;

    //Track the form Data
    additionalData:AdditionalFormProps
    setAdditionalData:(data:AdditionalFormProps)=>void;

    savedDBData: any
    setSavedDBData:(data:any)=>void

}

const initialBioData: BioDataFormProps = {
    firstName: "",
    lastName: "",
    middleName: undefined,
    dob: "",
    gender: "",
    page: "",
    userId: "",
    trackingNumber: "",
  };
  
  const initialProfileData: ProfileFormProps = {
    profilePicture:"",
    bio: "",
    page: "",
    medicalLicense: "",
    medicalLicenseExpiry: "",
    yearOfExperience: 0, 
  };

  const initialContactData: ContactFormProps = {
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    page: "",
  };

  const initialEducationData: EducationFormProps = {
    medicalSchool: "",
    graduationYear: 0,
    primarySpecializations: "",
    otherSpecialties: [],
    boardCerticates: [],
    page: "",
  };

  const initialPracticeData: PracticeFormProps ={
    hospitalName: "",
    hospitalAddress: "",
    hospitalContactNumber: "",
    hospitalEmailAddress: "",
    hospitalWebsite: "",
    hospitalHoursOfOperation: 0,
    servicesOffered: [],
    insuranceAccepted: "",
    languagesSpoken:[],
    page: "",
    hourlyWage: 200,
  };

  const initialAdditionalData: AdditionalFormProps = {
    educationHistory: "",
    research: "",
    accomplishments: "",
    additionalDocs: [],
    page: "",
  };

const initialContextData = {
    truckingNumber:"",
    doctorProfileId:"",
    setTruckingNumber:()=>{},
    setDoctorProfileId:()=>{},
    setBioData:()=>{},
    bioData:initialBioData,
    setProfileData:()=>{},
    profileData:initialProfileData,
    setContactData:()=>{},
    contactData:initialContactData,
    setEducationData:()=>{},
    educationData:initialEducationData,
    setPracticeData:()=>{},
    practiceData:initialPracticeData,
    setAdditionalData:()=>{},
    additionalData:initialAdditionalData,
    
    savedDBData: {},
    setSavedDBData:()=>{},
};

const OnBoardingContext = createContext<IOnBoardingContextData>(initialContextData);

// Create and export the Context Provider
export function OnboardingContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [truckingNumber, setTruckingNumber] = useState<string>("");
    const [doctorProfileId, setDoctorProfileId] = useState<string>("");
    const[bioData,setBioData] = useState<BioDataFormProps>(initialBioData);
    const[profileData,setProfileData] = useState<ProfileFormProps>(initialProfileData);
    const[contactData,setContactData] = useState<ContactFormProps>(initialContactData);
    const[educationData,setEducationData] = useState<EducationFormProps>(initialEducationData);
    const[practiceData,setPracticeData] = useState<PracticeFormProps>(initialPracticeData);
    const[additionalData,setAdditionalData] = useState<AdditionalFormProps>(initialAdditionalData);
    const[savedDBData,setSavedDBData] = useState<any>({});



    const contextValues = {
        truckingNumber,
        setTruckingNumber,
        doctorProfileId,
        setDoctorProfileId,
        bioData,setBioData,
        profileData,setProfileData,
        contactData,setContactData,
        educationData,setEducationData,
        practiceData,setPracticeData,
        additionalData,setAdditionalData,
        savedDBData,setSavedDBData,

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

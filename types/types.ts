import { File } from "@/components/FormInputs/MultipleFileUpload";
import { UserRole } from "@prisma/client";

export type ServiceProps={  title: string,
    imageUrl: string,
    slug: string, 
   };

export type RegisterInputProps={ 
    fullName: string;
    email: string;
    password: string;
    phone: string;
    role: any;
    plan: any;
}   

export type LoginInputProps={ 
    email: string;
    password: string;
}   

export type BioDataFormProps = {
    firstName: string;
    lastName: string;
    middleName?: string;
    dob: string | Date;
    gender: string;
    page: string;
    userId?: string; 
    trackingNumber: string;
  };

export type ProfileFormProps ={
    profilePicture:string;
    bio: string;
    page: string;
    medicalLicense: string;
    medicalLicenseExpiry: any;
    yearOfExperience: number;
};

export type ContactFormProps ={
    email: string;
    phone: string;
    country: string;
    city: string;
    state: string;
    page: string;
};

export type EducationFormProps ={
    medicalSchool: string;
    graduationYear: number;
    primarySpecializations: string;
    otherSpecialties: string[];
    boardCerticates: any;
    page: string;
}

export type PracticeFormProps ={
   hospitalName: string;
   hospitalAddress: string;
   hospitalContactNumber: string;
   hospitalEmailAddress: string;
   hospitalWebsite?: string;
   hospitalHoursOfOperation: number;
   servicesOffered: string[];
   insuranceAccepted: string;
   languagesSpoken:string[];
   hourlyWage:number;
   page: string;
};

export type AdditionalFormProps ={
   educationHistory: string;
   research: string;
   accomplishments: string;
   additionalDocs: any;
   page: string;
 };

export type stats ={
    doctors: string;
    patients: string;
    appointments: string;
    services: string;
 };
 
export type DoctorProfileAvailability = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
 };

export interface DoctorProfile {
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    bio: string | null;
    gender: string;
    operationMode: string | null;
    hourlyWage:number;
    availability: DoctorProfileAvailability | null;
 };

 interface DoctorProfileDetail extends DoctorProfile{
    yearOfExperience: number | null,
    country: string | null,
    city: string | null,
    state: string | null,
    primarySpecializations: string | null,
    otherSpecialties: string[] | null,
    boardCerticates: string[] | null,
    hospitalName: string | null,
    hospitalAddress: string | null,
    hospitalContactNumber: string | null,
    hospitalEmailAddress: string | null,
    hospitalWebsite: string | null,
    hospitalHoursOfOperation: number | null,
    servicesOffered: string[] | null,
    insuranceAccepted: string | null,
    languagesSpoken: string[] | null,
    educationHistory: string | null,
    research: string | null,
    accomplishments: string | null,
 }

export type Doctor = {
    id: number;
    name: string;
    email: string;
    phone: string;
    slug: string;
    doctorProfile: DoctorProfile | null;
 };
  

export type DoctorDetail = {
    id: number;
    name: string;
    email: string;
    phone: string;
    slug: string;
    doctorProfile: DoctorProfileDetail | null;
};  
   
  
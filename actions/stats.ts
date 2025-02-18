"use server"

import { prismaClient } from "@/lib/db";
import { AlarmClock, LucideIcon, Mail, Users } from "lucide-react";
import { getDoctorAppointments } from "./appointments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type DoctorAnalyticsProps={
    title: string;
    count: number;
    icon: LucideIcon;
    unit: string;
    detailLink: string;
}
export async function getStats(){
    try {
    const serviceCount = await prismaClient.service.count();
    const doctorCount = await prismaClient.doctorProfile.count();
    // const appointmentCount = await prismaClient.appointment.count();
    const stats = {
        doctors: doctorCount.toString().padStart(2,"0"),
        patients: "00",
        appointments: "00",
        services: serviceCount.toString().padStart(2,"0"),
      };
      return stats;
    } catch (error) {
        console.log(error)
        return {
          doctors: null,
          patients: null,
          appointments: null,
          services: null,
        };
    }
}

export async function getDoctorAnalytics(){
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user
    const appointments = (await getDoctorAppointments(user?.id??"")).data||[];
   
    const uniquePatientsMap = new Map();

    appointments.forEach((app) => {
      if(!uniquePatientsMap.has(app.patientId)) {
        uniquePatientsMap.set(app.patientId,{
        patientId: app.patientId,
        name: `${app.firstName} ${app.lastName}`,
        email: app.email,
        phone:app.phone,
        location:app.location,
        gender:app.gender,
        occupation:app.occupation,
        dob:app.dob,
  
    });
  }
  });
    const patients = Array.from(uniquePatientsMap.values());

  const analytics = [
    {
      title:"Appointments",
      count: appointments.length??0,
      icon:AlarmClock,
      unit:"",
      detailLink:"/dashboard/doctor/appointments"
    },
    {
      title:"Patients",
      count:patients.length,
      icon:Users,
      unit:"",
      detailLink:"/dashboard/doctor/patients"
    },
    {
      title:"Inbox",
      count:1000,
      icon:Mail,
      unit:"",
      detailLink:"/dashboard/doctor/inbox"
    },
  ]
    return analytics as DoctorAnalyticsProps[];
  } catch (error) {
      console.log(error)
      return [];
  }
}
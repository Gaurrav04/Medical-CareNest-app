"use client"
import { Tabs } from "flowbite-react";
import { HeartPulse, Microscope, ShieldPlus, Stethoscope, X } from "lucide-react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { Service, Speciality, Symptom } from "@prisma/client";
import SymptomCards from "./Doctors/SymptomCard";
// import { HiUserCircle } from "react-icons/hi"; 

type TabbedItemsProps = {
  services:Service[];
  specialties:Speciality[];
  symptoms: Symptom[];
}
export default function TabbedItems({
  services, 
  specialties,
  symptoms
}:TabbedItemsProps) {

  const tabs = [
    {
      title: "Popular Services",
      icon: Stethoscope, 
      component:<ServiceList data={services}/>,
      content: [],
    },
    // {
    //   title: "Doctors",
    //   icon: ShieldPlus,
    //   component:<LinkCards/>,
    //   content: [],
    // },
    {
      title: "Specialists",
      icon: HeartPulse,
      component:<LinkCards className="bg-cyan-500" specialties={specialties}/>, 
      content: [],
    },
    {
      title: "Symptoms",
      icon: Microscope, 
      component:<SymptomCards symptoms={symptoms} className="bg-blue-500"/>,
      content: [],
    },
  ];

  return (
    <Tabs aria-label="Tabs with underline" variant="underline">
      {tabs.map((tab, i) => {
        return (
          <Tabs.Item key={i} active title={tab.title} icon={tab.icon}>
           {tab.component}
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
}

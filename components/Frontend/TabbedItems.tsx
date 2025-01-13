"use client"
import { Tabs } from "flowbite-react";
import { HeartPulse, Microscope, ShieldPlus, Stethoscope, X } from "lucide-react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
// import { HiUserCircle } from "react-icons/hi"; 

export default function TabbedItems() {
  const services = [
    {
      title:"Telehealth",
      image:"/Pic.jpg",
      slug:"telehealth",
    },
    {
      title:"Video Prescription",
      image:"/Pic.jpg",
      slug:"telehealth",
    },
    {
      title:"UTI Consult",
      image:"/Pic.jpg",
      slug:"telehealth",
    },{
      title:"Health",
      image:"/Pic.jpg",
      slug:"telehealth",
    },{
      title:"ED Consult",
      image:"/Pic.jpg",
      slug:"telehealth",
    },{
      title:"Urgent Care",
      image:"/Pic.jpg",
      slug:"telehealth",
    }];
  const tabs = [
    {
      title: "Popular Services",
      icon: Stethoscope, 
      component:<ServiceList data={services}/>,
      content: [],
    },
    {
      title: "Doctors",
      icon: ShieldPlus,
      component:<LinkCards/>,
      content: [],
    },
    {
      title: "Specialists",
      icon: HeartPulse,
      component:<LinkCards className="bg-cyan-500"/>, 
      content: [],
    },
    {
      title: "Symptoms",
      icon: Microscope, 
      component:<LinkCards className="bg-purple-500"/>,
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

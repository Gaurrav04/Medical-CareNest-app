import CustomButton from '@/components/CustomButton'
import CustomAccordion from '@/components/Frontend/CustomAccordion'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  const features = [
    "CareNest brings patients to you",
    "CareNest e-processing experienced",
    "Integrated clinical note-taking",
];
const steps = [
  "List your practice",
  "Create competitive offerings",
  "Start seeing patients",
];
const cards = [
  {
    title: "Begin Your Journey",
    description:"Start a new application to join our network of healthcare providers.",
    link: "/",
    linkTitle:"Start a new application"
  },
  {
    title: "Resume Application",
    description:"Pick up where you left off and complete your onboarding process.Schedule for physical Approval",
    link: "/",
    linkTitle:"Continue your Application"
  },
  {
    title: "Schedule a Call",
    description:"Arrange a time for a call to finalize your application",
    link: "/",
    linkTitle:"Schedule a Call"
  },
  {
    title: "Track your Progress",
    description:"Monitor the status of your application and approvals in real-time.",
    link: "/",
    linkTitle:"Check Status"
  },
];
  return (
    <div className="min-h-screen">
        <section className="py-12 px-4">
            <div className="max-w-6xl gap-4 mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="">
          <h2 className="sm:text-[3.2rem] text-[1.5rem] leading-[3.5rem]">
            Build a successful {" "}
             <span className="text-blue-600 font-semibold">direct-pay</span>{" "}
             practice with <span className="text-gray-600">CareNest.</span> 
            </h2>
            <p className="py-4">
            Welcome to CareNest - Empowering Your Practice, Enhancing Patient Care
            At CareNest, we understand the dedication and passion you bring to your practice. 
            That's why we've created a platform tailored to help you thrive, 
            whether you're just starting out or looking to expand your services.
            </p>
            <CustomButton 
            title="List your Service"
            href="#"
            className="bg-blue-600 hover:bg-gray-300"
            />
            <div className="py-6">
            {
                features.map((feature,i) => {
                    return (
                        <p className="flex items-center">
                            <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600"/>
                            {feature}
                        </p>
                    )
                })
            }
            </div>
          </div>
          <Image src="/Doctors.jpg" alt="" width={"1170"} height={848} className="w-full"/>
            </div>
        </section>
        <section className="py-12 px-4">
            <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">
            <Image 
             src="/Doctors.jpg" 
             alt=""
             width={"1170"} 
             height={848} 
             className="w-full hidden md:block mr-4"
             />

          <div className="">
          <h2 className="sm:text-4xl text-2xl">
            Join CareNest to increase your{" "}
             <span className="text-blue-600 font-semibold">revenue</span>{" "}
             today.
            </h2>
            <div className="py-6">
            {
                steps.map((feature,i) => {
                    return (
                        <p className="flex items-center">
                            <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600"/>
                            {feature}
                        </p>
                    );
                })
            }
            </div>
            <div className="grid grid-cols-2 gap-4">
             {
              cards.map((card,i)=>{
                return (
                  <div key={i} className="bg-blue-500 p-4 rounded-lg shadow-2xl text-center">
                  <h3 className="text-2xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="text-gray-950 text-xs py-3">
                    {card.description}
                  </p>
                  <CustomButton 
                  title={card.linkTitle}
                  href={card.link}
                  className="bg-blue-700 hover:bg-cyan-500"
                 />
                </div>
                )
              })
             }
            </div>
          </div>
            </div>
        </section>
        <section className="py-12 px-4">
            <div className="max-w-2xl gap-4 mx-auto">
            <CustomAccordion/>
          </div>
        </section>
    </div>
  );
}

import CustomButton from '@/components/CustomButton'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
    const features = [
        "CareNest brings patients to you",
        "Seamless e-processing experienced",
        "Integrated clinical note-taking",
    ]
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
    </div>
  )
}

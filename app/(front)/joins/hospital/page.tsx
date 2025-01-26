import CustomButton from '@/components/CustomButton'
import CustomAccordion, { FAQItem } from '@/components/Frontend/CustomAccordion'
import Pricing from '@/components/Frontend/Pricing'
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

const faqs: FAQItem[] = [
{
  qn: "How do I get started with CareNest?",
  ans: (
     <div>You can sign up by visting our website and clicking on the{" "}
      <CustomButton 
        title="Signup"
        href="/register?role='DOCTOR'"
        className="bg-blue-700 hover:bg-cyan-500"
        /> {" "}
        Follow the instructions to create your account.
    </div>
  ),
},
{
  qn: "What is direct-pay healthcare?",
  ans: "Direct-pay healthcare refers to a model where patients pay healthcare providers directly, without involving insurance. This allows for transparent pricing and a simplified process.",
},
{
  qn: "Can I provide both in-person and virtual care?",
  ans: "Yes! With platforms like CareNest, you can seamlessly offer a combination of in-person and virtual care to meet the needs of all your patients.",
},

{
  qn: "Is my patient data secure on the platform?",
  ans: "Absolutely! CareNest prioritizes patient data security and complies with all healthcare data privacy regulations, including HIPAA compliance.",
},
{
  qn: "What are the costs of using CareNest?",
  ans: "CareNest offers flexible pricing plans to suit your practice's size and needs. You can choose between subscription-based plans or pay-per-use options.",
},
{
  qn: "Can I customize the platform to fit my practice's needs?",
  ans: "Yes, CareNest is highly customizable! You can tailor appointment types, patient communication, and other features to align perfectly with your practice's workflow."
}
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
            title="Hospital Plan"
            href="#"
            className="bg-blue-600 hover:bg-gray-300"
            />
            <div className="py-6">
            {
                features.map((feature,i) => {
                    return (
                        <p key={i} className="flex items-center">
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
            <div className="max-w-6xl gap-4 mx-auto">
            <Pricing />
          </div>
        </section>
        <section className="py-12 px-4">
            <div className="max-w-2xl gap-4 mx-auto">
            <CustomAccordion FAQS={faqs}/>
          </div>
        </section>
    </div>
  );
}

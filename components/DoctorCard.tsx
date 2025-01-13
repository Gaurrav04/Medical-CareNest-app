import { Stethoscope } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function DoctorCard() {
  return (
    <div className="border border-gray-200 bg-gray-100 inline-flex flex-col py-8 px-6 rounded-md">
      <Link href="#">
        <div>
          <h2 className="uppercase font-bold text-2xl tracking-widest">Vijay Patel, PA-C</h2>
          <p className="py-3">678 Margoa-Goa, 403890</p>
          <div className="flex items-center gap-4 py-4">
            <Image
              src="/Doctor.png"
              width={243}
              height={207}
              alt="Doctor"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="flex items-center">
                <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Family Medicine</span>
              </p>
              <p className="bg-green-300 py-3 px-6 uppercase">Available Today</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="pt-6 border-t border-gray-300">
        <h3>
          Monday, January 23 original price ₹500 ₹200 with CareNest Plus
        </h3>
      </div>
    </div>
  );
}

"use client";

import { updateDoctorProfileWithService } from '@/actions/services';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DoctorProfile, Service, Speciality, Symptom } from '@prisma/client';
import { Map, Video } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function UpdateServiceForm({
  services,
  specialties,
  symptoms,
  profile,
}: {
  services: Service[] | null;
  specialties: Speciality[] | null;
  symptoms: Symptom[] | null;
  profile: DoctorProfile | undefined | null;
}) {
  const profileId = profile?.id !== undefined ? String(profile.id) : undefined;

  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(profile?.serviceId != null ? String(profile.serviceId) : undefined);
  const [specialtyId, setSpecialtyId] = useState<string | undefined>(profile?.specialtyId != null ? String(profile.specialtyId) : undefined);
  const [operationMode, setOperationMode] = useState<string | undefined>(profile?.operationMode != null ? String(profile.operationMode) : undefined);
  const [symptomIds, setSymptomIds] = useState<string[]>(profile?.symptomIds || []);

  const [savingServices, setSavingServices] = useState(false);
  const [savingPrice, setSavingPrice] = useState(false);
  const [price, setPrice] = useState<number | undefined>(profile?.hourlyWage || undefined);
  const [savingSpecialty, setSavingSpecialty] = useState(false);
  const [savingSymptoms, setSavingSymptoms] = useState(false);
  const [savingMode, setSavingMode] = useState(false);
  console.log(price)

  useEffect(() => {
    if (profile) {
      setSelectedServiceId(profile?.serviceId != null ? String(profile?.serviceId) : undefined);
      setSpecialtyId(profile?.specialtyId != null ? String(profile?.specialtyId) : undefined);
      setOperationMode(profile?.operationMode != null ? String(profile?.operationMode) : undefined);
      setSymptomIds(profile?.symptomIds || []);
      setPrice(profile?.hourlyWage || 0);
    }
  }, [profile]);

  const operationModes = [
    {
      title: "Telehealth Visit",
      slug: "telehealth-visit",
      icon: Video,
    },
    {
      title: "In-Person Doctor visit",
      slug: "inperson-doctor-visit",
      icon: Map,
    },
  ];

  async function handleUpdateService() {
    setSavingServices(true);
    const data = {
      serviceId: selectedServiceId,
      specialtyId,
      symptomIds,
      operationMode,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Service Updated Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setSavingServices(false);
    }
  }


  async function handleUpdatePrice() {
    setSavingPrice(true);
    const data = {
      serviceId: selectedServiceId,
      specialtyId,
      symptomIds,
      operationMode,
      hourlyWage: price,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Price Updated Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setSavingPrice(false);
    }
  }

  async function handleUpdateSpecialty() {
    setSavingSpecialty(true);
    const data = {
      serviceId: selectedServiceId,
      specialtyId,
      symptomIds,
      operationMode,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Specialty Updated Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setSavingSpecialty(false);
    }
  }

  async function handleUpdateSymptoms() {
    setSavingSymptoms(true);
    const data = {
      serviceId: selectedServiceId,
      specialtyId,
      symptomIds,
      operationMode,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Symptoms Updated Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setSavingSymptoms(false);
    }
  }

  async function handleUpdateMode() {
    setSavingMode(true);
    const data = {
      serviceId: selectedServiceId,
      specialtyId,
      symptomIds,
      operationMode, 

    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Operation Mode Updated Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setSavingMode(false);
    }
  }

  return (
    <>
      <CardContent className="space-y-3">
         <div className="border shadow rounded-md p-4 mt-4">
         <div className="sm:col-span-4">
         <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
               Update Hour Price
            </h2>
            <Button disabled={savingPrice} onClick={handleUpdatePrice}>
              {savingPrice ? "Saving Please wait..." : "Update Price"}
            </Button>
          </div>
              <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 
              focus-within:ring-inset focus-within:ring-purple-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  ₹</span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e)=> setPrice(+e.target.value)}
                    autoComplete="price"
                    placeholder="200"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
         </div>
        <div className="border shadow rounded-md p-4 mt-4">
          <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
              Choose your Operation Mode
            </h2>
            <Button disabled={savingMode} onClick={handleUpdateMode}>
              {savingMode ? "Saving Please wait..." : "Update Operation Mode"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3">
            {operationModes.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.slug}
                  onClick={() => setOperationMode(prev => prev === item.title ? undefined : item.title)}
                  className={cn(
                    "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                    operationMode === item.title ? "border-2 border-purple-600 bg-slate-50" : ""
                  )}
                >
                  <Icon className="w-8 h-8" />
                  <p className="text-xs">{item.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border shadow rounded-md p-4 mt-4">
          <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
              Choose your Service you want to offer
            </h2>
            <Button disabled={savingServices} onClick={handleUpdateService}>
              {savingServices ? "Saving Please wait..." : "Update Service"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3">
            {services?.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedServiceId(String(item.id))}
                className={cn(
                  "border flex items-center justify-center flex-col py-2 px-3 rounded-md cursor-pointer",
                  selectedServiceId === String(item.id) ? "border-2 border-purple-600 bg-slate-50" : ""
                )}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-14 h-14"
                />
                <p className="text-xs">{item.title}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="border shadow rounded-md p-4">
          <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
              Select your Specialty
            </h2>
            <Button disabled={savingSpecialty} onClick={handleUpdateSpecialty}>
              {savingSpecialty ? "Saving Please wait..." : "Update Specialty"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3">
            {specialties?.map((item) => (
              <button
                key={item.id}
                onClick={() => setSpecialtyId(String(item.id))}
                className={cn(
                  "border flex items-center justify-center flex-col py-3 px-3 rounded-md cursor-pointer",
                  specialtyId === String(item.id) ? "border-2 border-purple-600 bg-slate-50" : ""
                )}
              >
                <p className="text-xs">{item.title}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="border shadow rounded-md p-4">
          <div className="flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
              Select your Symptoms
            </h2>
            <Button disabled={savingSymptoms} onClick={handleUpdateSymptoms}>
              {savingSymptoms ? "Saving Please wait..." : "Update Symptoms"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3">
            {symptoms?.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setSymptomIds((prev) =>
                    prev.includes(String(item.id))
                      ? prev.filter((id) => id !== String(item.id))
                      : [...prev, String(item.id)]
                  );
                }}
                className={cn(
                  "border flex items-center justify-center flex-col py-3 px-3 rounded-md cursor-pointer",
                  symptomIds.includes(String(item.id)) ? "border-2 border-purple-600 bg-slate-50" : ""
                )}
              >
                <p className="text-xs">{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );
}

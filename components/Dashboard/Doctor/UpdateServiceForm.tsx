"use client";

import { updateDoctorProfileWithService } from '@/actions/services';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DoctorProfile, Service, Speciality, Symptom } from '@prisma/client';
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

  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(
    profile?.serviceId != null ? String(profile.serviceId) : undefined
  );
  const [specialtyId, setSpecialtyId] = useState<string | undefined>(
    profile?.specialtyId != null ? String(profile.specialtyId) : undefined
  );
  const [symptomIds, setSymptomIds] = useState<string[]>(profile?.symptomIds || []);

  const [savingServices, setSavingServices] = useState(false);
  const [savingSpecialty, setSavingSpecialty] = useState(false);
  const [savingSymptoms, setSavingSymptoms] = useState(false);

  async function handleUpdateService() {
    setSavingServices(true);
    const data = {
      serviceId: selectedServiceId,
      specialtyId,
      symptomIds,
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

  async function handleUpdateSpecialty() {
    setSavingSpecialty(true);
    const data = {
      serviceId: selectedServiceId,
      specialtyId,
      symptomIds,
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

  return (
    <>
      <CardContent className="space-y-3">
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
            {services && services.map((item) => (
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
            {specialties && specialties.map((item) => (
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
            {symptoms && symptoms.map((item) => (
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

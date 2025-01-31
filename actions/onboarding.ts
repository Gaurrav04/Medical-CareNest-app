"use server";

import { prismaClient } from "@/lib/db";
import { Resend } from "resend";
import { DoctorProfile } from "@prisma/client";
export async function createDoctorProfile(formData: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const {
    dob,
    firstName,
    lastName,
    gender,
    middleName,
    page,
    trackingNumber,
    userId,
  } = formData;

  try {
    const newProfile = await prismaClient.doctorProfile.create({
      data: {
        dob: dob || null,
        firstName: firstName || "",
        lastName: lastName || "",
        gender: gender || "",
        middleName: middleName || null,
        page: page || "",
        trackingNumber: trackingNumber || "",
        userId: parseInt(userId) || 0, 
        bio: formData.bio || "",
        medicalLicense: formData.medicalLicense || "",
      },
    });
     console.log(newProfile)
    return {
      data: newProfile,
      error: null,
      status: 201,
    };
  } catch (error) {
    console.error("Error creating doctor profile:", error);
    return {
      data: null,
      error: "Something went wrong",
      status: 500,
    };
  }
}


export async function updateDoctorProfile(id: string | undefined, data:any) {
  if (id) {
    try {
      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          id: parseInt(id), 
        },
        data,
      });
      return {
        data: updatedProfile,
        error: null,
        status: 201,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: "Profile was not updated",
        status: 500,
      };
    }
  }
}

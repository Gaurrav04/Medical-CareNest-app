"use server";

import { prismaClient } from "@/lib/db";
import { Resend } from "resend";
import { DoctorProfile } from "@prisma/client";
import WelcomeEmail from "@/components/Emails/welcome-email";
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

export async function getApplicationByTrack(trackingNumber: string) {
  if (trackingNumber) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
        where: {
          trackingNumber, 
        },
      });
      if(!existingProfile){
        return {
          data: null,
          error: "Wrong Tracking Number",
          status: 400,
        };
      }
      return {
        data: existingProfile,
        error: null,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: "Something Went wrong",
        status: 500,
    }
  }
}
}

export async function CompleteProfile(id: string | undefined, data:any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (id) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
        where: {
          id: parseInt(id), 
        },
      });

      if(!existingProfile){
        return {
          data: null,
          error: "Profile Not Found",
          status: 404,
        };
      }

      //Send a Welcome email
      const email = existingProfile.email as string;
      const firstName = existingProfile.firstName;
      const previewText = "Welcome to CareNest-Medical App";
      const message =
       "Thank you for joining Carenest, We are so grateful that we have you onboard:";
      const sendMail = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Welcome to CareNest",
        react: WelcomeEmail({ firstName, previewText, message }),
      });
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

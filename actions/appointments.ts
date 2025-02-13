"use server";

import { AppointmentUpdateProps } from "@/components/Dashboard/Doctor/UpdateAppointmentForm";
import NewAppointmentEmail from "@/components/Emails/new-appointment";
import { prismaClient } from "@/lib/db";
import { AppointmentProps } from "@/types/types";
import { AppointmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createAppointment(data: AppointmentProps) {
  try {
    const doctor = await prismaClient.user.findUnique({
      where: {
        id: parseInt(data.doctorId, 10),
      }
    });

    if (!data.patientId) {
      throw new Error("Patient ID is required");
    }

    const status: AppointmentStatus = data.status as AppointmentStatus || 'PENDING'; 

    const parsedData = {
      ...data,
      doctorId: parseInt(data.doctorId, 10),
      patientId: data.patientId,  
      status: status, 
    };

    const newAppointment = await prismaClient.appointment.create({
      data: parsedData,
    });

    const firstName = doctor?.name;
    const doctorMail = doctor?.email;
    const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`;
    const message = "You have a new appointment request. Please review and approve it by clicking the button below.";

    // Send email to doctor
    const sendMail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: doctorMail ?? "",
      subject: "New Appointment Approval Needed",
      react: NewAppointmentEmail({ firstName, link, message }),
    });

    revalidatePath("/dashboard/doctor/appointments");
    console.log(newAppointment);

    return {
      data: newAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log("Error creating appointment:", error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}


export async function updateAppointment(id: string, data: AppointmentProps) {
  try {
    if (!data.status) {
      throw new Error("Status is required and cannot be null or undefined.");
    }

    const validStatuses: AppointmentStatus[] = ["PENDING", "REJECTED", "APPROVED"];
    if (!validStatuses.includes(data.status as AppointmentStatus)) {
      throw new Error(`Invalid status value: ${data.status}`);
    }

    console.log("Updating appointment with data:", data);

    const parsedData = {
      ...data,
      doctorId: parseInt(data.doctorId, 10),
      patientId: data.patientId ? parseInt(data.patientId.toString(), 10) : undefined,
      status: data.status as AppointmentStatus,
    };

    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id: parseInt(id, 10),
      },
      data: parsedData,
    });

    revalidatePath("/dashboard/doctor/appointments");
    console.log(updatedAppointment);

    return {
      data: updatedAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error("Error updating appointment:", error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}


export async function updateAppointmentById(id: string, data: AppointmentUpdateProps) {
  try {
    const updatedData = {
      ...data,
      status: data.status.toUpperCase() as AppointmentStatus,  
    };

    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id: parseInt(id, 10),
      },
      data: updatedData,  
    });
    const patientId = updatedAppointment.patientId
    const patient = await prismaClient.user.findUnique({
      where: { id: patientId },
    })
    
    const firstName = patient?.name;
    const doctorMail = patient?.email;
    const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`;
    const message = "Your appointment has been approved.You can View the Details here";

    // Send email to doctor
    const sendMail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: doctorMail ?? "",
      subject: "Appointment Approved",
      react: NewAppointmentEmail({ firstName, link, message }),
    });
    revalidatePath("/dashboard/user/appointments");

    console.log(updatedAppointment);

    return {
      data: updatedAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log("Error updating appointment:", error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}


export async function getAppointments() {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function getPatientAppointments(patientId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        patientId: parseInt(patientId, 10),
      },
    });

    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function getDoctorAppointments(doctorId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        doctorId: parseInt(doctorId, 10),
      },
    });

    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function getAppointmentById(id: string) {
  try {
    if (id) {
      const appointment = await prismaClient.appointment.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });

      return appointment;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prismaClient.appointment.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    revalidatePath("/dashboard/doctor/appointments");
    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

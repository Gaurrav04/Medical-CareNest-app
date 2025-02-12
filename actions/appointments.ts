"use server";

import { AppointmentUpdateProps } from "@/components/Dashboard/Doctor/UpdateAppointmentForm";
import { prismaClient } from "@/lib/db";
import { AppointmentProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createAppointment(data: AppointmentProps) {
  try {
    const parsedData = {
      ...data,
      doctorId: parseInt(data.doctorId, 10),
    };

    const newAppointment = await prismaClient.appointment.create({
      data: parsedData,
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
    const parsedData = {
      ...data,
      doctorId: parseInt(data.doctorId, 10),
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
    console.log("Error updating appointment:", error);
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateAppointmentById(id: string, data: AppointmentUpdateProps) {
  try {
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id: parseInt(id, 10),
      },
      data,
    });

    revalidatePath("/dashboard/doctor/appointments");
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

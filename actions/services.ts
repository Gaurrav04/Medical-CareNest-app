"use server"

import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";


export async function createService(data: ServiceProps){
    try {
    const existingService = await prismaClient.service.findUnique({
        where:{
            slug:data.slug
        }
    })
    if(existingService){
        return{
            data:null,
            status:409,
            error:"Service already existing",
        }
    }
    const newService = await prismaClient.service.create({
        data
      });
      revalidatePath("/dashboard/services")
      console.log(newService)
      return {
        data:newService,
        status:201,
        error:null,
      };
    } catch (error) {
      console.log('Error creating service:', error);
      return {
          data: null,
          status: 500,
          error: error instanceof Error ? error.message : 'Unknown error',
      };
  }
}

export async function updateService(id:string, data: ServiceProps){
  try {
  const existingService = await prismaClient.service.findUnique({
      where:{
        id: parseInt(id, 10),
      }
  })
  if(!existingService){
      return{
          data:null,
          status:404,
          error:"Service does not exist",
      };
  }
  const updatedService = await prismaClient.service.update({
      where:{
        id: parseInt(id, 10)
      }, data
    });
    revalidatePath("/dashboard/services")
    console.log(updatedService)
    return {
      data:updatedService,
      status:201,
      error:null,
    };
  } catch (error) {
    console.log('Error creating service:', error);
    return {
        data: null,
        status: 500,
        error: error instanceof Error ? error.message : 'Unknown error',
    };
}
}

export async function createManyServices(){
  try {
  const services = [
    {
      title: "Telehealth",
      slug: "telehealth",
      imageUrl: "https://fb63r4sbul.ufs.sh/f/8htzWBGInkGDzwXvZVWyCdKbjP5wf6VJTasHQtDSWBpFI28c",
    },
    {
      title: "Video Prescription Refill",
      slug: "video-prescription-refill",
      imageUrl: "https://fb63r4sbul.ufs.sh/f/8htzWBGInkGDdUHU2COeMqkNtipcvL1h9jamyOWIRxwbV7EX",
    },
    {
      title: "In-Person doctor visit",
      slug: "in-person-doctor-visit",
      imageUrl: "https://fb63r4sbul.ufs.sh/f/8htzWBGInkGDb56iAzm9amdIlEwcG56sjz3Rigf07xoSHPMU",
    }, 
    {
      title: "UTI Consult",
      slug: "uti-consult",
      imageUrl: "https://fb63r4sbul.ufs.sh/f/8htzWBGInkGDPRAalQzcqj3ZEILietaDXvN2GpdPHmAOK149",
    },
    {
      title: "Mental Health Consult",
      slug: "mental-health-consult",
      imageUrl: "https://fb63r4sbul.ufs.sh/f/8htzWBGInkGDExFYPupwvzawAPbBWHYfmZIp1nXL6JKS4MUD",
    },
  ];

  //To create services in the database
    for(const service of services) {
      try{
        await createService(service)
      } catch (error){
        console.error(`Error Creating Service "${service.title}":`, error);
      }
    }
  } catch (error) {
      console.log(error)
      return {
          data:null,
          status:500,
          error,
        };
  }
}

export interface ServiceWithDoctorProfileCount {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  _count: {
    doctorProfiles: number;
  };
};

export async function getServices(){
    try {
    const services = await prismaClient.service.findMany({
        orderBy:{
           createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          imageUrl: true,
          _count: {
            select: {
              doctorProfiles: true ,
            },
          },
        },
      });
      return {
        data:services,
        status:200,
        error:null,
      };
    } catch (error) {
        console.log(error)
        return {
            data:null,
            status:500,
            error,
          };
    }
}

export async function getServiceByslug(slug:string){
  try {
   if(slug) {
    const service = await prismaClient.service.findUnique({
      where:{
        slug,
      },
    });
    return {
      data:service,
      status:200,
      error:null,
    };
   }
  } catch (error) {
      console.log(error)
      return {
          data:null,
          status:500,
          error,
        };
  }
}

export async function deleteService(id: string){
  try {
    await prismaClient.service.delete({
      where:{
        id: parseInt(id, 10),
      },
    });
    revalidatePath("/dashboard/services")
    return {
      ok:true,
      status:200,
      error:null,
    };
  } catch (error) {
      console.log(error)
      return {
          data:null,
          status:500,
          error,
        };
  }
}

export async function updateDoctorProfileWithService(id: string | undefined, data: any) {
  if (id) {
    try {
      const updatePayload: any = {
        serviceId: data.serviceId ? parseInt(data.serviceId) : null,
        specialtyId: data.specialtyId ? parseInt(data.specialtyId) : null,
        symptomIds: Array.isArray(data.symptomIds) ? data.symptomIds.map(String) : [],
        operationMode: data.operationMode || null,
        hourlyWage: data.hourlyWage || undefined,
      };

      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          id: parseInt(id),
        },
        data: updatePayload,
      });

      console.log(updatedProfile);
      revalidatePath("/dashboard/doctor/settings");

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

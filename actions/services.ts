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
        console.log(error)
        return {
            data:null,
            status:500,
            error,
          };
    }
}

export async function createManyServices(){
  try {
  const services = [
    {
      title: 'Telehealth',
      slug: 'telehealth',
      imageUrl: "https://fb63r4sbul.ufs.sh/f/8htzWBGInkGDzwXvZVWyCdKbjP5wf6VJTasHQtDSWBpFI28c",
    },
    {
      title: 'Video Prescription Refill',
      slug: 'video-prescription-refill',
      imageUrl: "https://fb63r4sbul.ufs.sh/f/8htzWBGInkGDdUHU2COeMqkNtipcvL1h9jamyOWIRxwbV7EX",
    },
    {
      title: 'In-Person doctor visit',
      slug: 'in-person-doctor-visit',
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

export async function getServices(){
    try {
    const services = await prismaClient.service.findMany({
        orderBy:{
           createdAt: "desc"
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
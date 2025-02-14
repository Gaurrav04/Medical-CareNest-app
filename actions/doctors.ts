"use server"

import { prismaClient } from "@/lib/db";
import { Doctor } from "@/types/types";
import generateSlug from "@/utils/generateSlug";

type ServiceProps = {
  title:string,
  slug:string,
};

export type DataProps = {
  doctors:Doctor[] | undefined,
  services: ServiceProps[]
};

export async function getDoctorsByServiceSlug(slug:string){
  try {
    if(slug) {
    let doctors:Doctor[] | undefined = [];
    let services: ServiceProps[]=[]
    const service = await prismaClient.service.findUnique({
      where:{
        slug,
      },
      include:{
        doctorProfiles:{
          include:{
            availability:true,
          }
        }
      },
    });
    doctors = service?.doctorProfiles.map((doc)=>{
      return {
        id: doc.userId,
        name: `${doc.firstName} ${doc.lastName}`,
        email: doc.email??"",
        phone: doc.phone??"",
        slug: generateSlug(`${doc.firstName} ${doc.lastName}`),
        doctorProfile: doc,
      };
    });
    services = await prismaClient.service.findMany({
      where:{
        id: {
          not: service?.id,
      },
    },
   });
   const data:DataProps = {
    doctors,
    services,
   }
    return data as DataProps;
   }
  } catch (error) {
      console.log(error)
      return [];
  }
}

export async function getDoctorsBySpecialtySlug(slug:string){
  try {
    if(slug) {
    let doctors:Doctor[] | undefined = [];
    let services: ServiceProps[]=[]
    const service = await prismaClient.speciality.findUnique({
      where:{
        slug,
      },
      include:{
        doctorProfiles:{
          include:{
            availability:true,
          }
        }
      },
    });
    doctors = service?.doctorProfiles.map((doc)=>{
      return {
        id: doc.userId,
        name: `${doc.firstName} ${doc.lastName}`,
        email: doc.email??"",
        phone: doc.phone??"",
        slug: generateSlug(`${doc.firstName} ${doc.lastName}`),
        doctorProfile: doc,
      };
    });
    services = await prismaClient.speciality.findMany({
      where:{
        id: {
          not: service?.id,
      },
    },
   });
   const data:DataProps = {
    doctors,
    services,
   }
    return data as DataProps;
   }
  } catch (error) {
      console.log(error)
      return [];
  }
}


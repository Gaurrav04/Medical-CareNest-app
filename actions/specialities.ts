"use server"

import { SpecialtyProps } from "@/components/Dashboard/SpecialtyForm";
import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";


export async function createSpecialty(data: SpecialtyProps){
    try {
    const existingSpecialty = await prismaClient.speciality.findUnique({
        where:{
            slug:data.slug
        }
    })
    if(existingSpecialty){
        return{
            data:null,
            status:409,
            error:"Specialty already existing",
        }
    }
    const newSpecialty = await prismaClient.speciality.create({
        data
      });
      revalidatePath("/dashboard/specialties")
      console.log(newSpecialty)
      return {
        data:newSpecialty,
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

export async function createManySpecialties(){
  try {
  const specialties = [
    {
      title: "Primary Care",
      slug: "primary-care",
    },
    {
      title: "Dermatology",
      slug: "dermatology",
    },
    {
      title: "Men Health",
      slug: "men-health",
    }, 
    {
      title: "Women Health",
      slug: "women-health",
    },
    {
      title: "Dental",
      slug: "dental",
    },
  ];

  //To create services in the database
    for(const speciality of specialties) {
      try{
        await createSpecialty(speciality)
      } catch (error){
        console.error(`Error Creating Service "${speciality.title}":`, error);
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

export async function getspecialties(){
    try {
    const specialties = await prismaClient.speciality.findMany({
        orderBy:{
           createdAt: "desc"
        },
      });
      return {
        data:specialties,
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


export async function deleteSpecialty(id: string){
  try {
    await prismaClient.speciality.delete({
      where:{
        id: parseInt(id, 10),
      },
    });
    revalidatePath("/dashboard/specialties")
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
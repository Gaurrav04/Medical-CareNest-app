"use server"

import { SpecialtyProps } from "@/components/Dashboard/SpecialtyForm";
import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/types";
import { revalidatePath } from "next/cache";


export async function createSymptom(data: SpecialtyProps){
    try {
    const existingSymptom = await prismaClient.symptom.findUnique({
        where:{
            slug:data.slug
        }
    })
    if(existingSymptom){
        return{
            data:null,
            status:409,
            error:"Symptom already existing",
        }
    }
    const newSymptom = await prismaClient.symptom.create({
        data
      });
      revalidatePath("/dashboard/symptoms")
      console.log(newSymptom)
      return {
        data:newSymptom,
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

export async function createManySymptoms(){
  try {
  const symptoms = [
    {
      title: "Anxiety",
      slug: "anxiety",
    },
    {
      title: "Depression",
      slug: "depression",
    },
    {
      title: "Asthma",
      slug: "asthma",
    }, 
    {
      title: "Back Pain",
      slug: "back-pain",
    },
    {
      title: "UTI",
      slug: "uti",
    },
    {
      title: "Acne",
      slug: "acne",
    },
    {
      title: "Itchy Skin",
      slug: "itchy-skin",
    },
    {
      title: "Ear Infection",
      slug: "ear-infection",
    },
    {
      title: "Sore Throat",
      slug: "sore throat",
    },
    {
      title: "Diarrhea",
      slug: "diarrhea",
    },
    {
      title: "Fever",
      slug: "fever",
    },
  ];

  //To create services in the database
    for(const symptom of symptoms) {
      try{
        await createSymptom(symptom)
      } catch (error){
        console.error(`Error Creating Symptom "${symptom.title}":`, error);
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

export async function getSymptoms(){
    try {
    const symptoms = await prismaClient.symptom.findMany({
        orderBy:{
           createdAt: "desc"
        },
      });
      return {
        data:symptoms,
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


export async function deleteSymptom(id: string){
  try {
    await prismaClient.symptom.delete({
      where:{
        id: parseInt(id, 10),
      },
    });
    revalidatePath("/dashboard/symptoms")
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
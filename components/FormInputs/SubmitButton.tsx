import { Loader, Loader2 } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';

type SubmitButtonProps={
    title:string;
    buttonType?:"submit" | "reset" | "button" | undefined
    isloading:boolean;
    loadingTitle:string
};

export default function SubmitButton({title,buttonType="submit",isloading=false,loadingTitle}: SubmitButtonProps) {
  return (
   <>
    {isloading ?(
    
         <Button disabled>
         <Loader2 className="animate-spin" />
         {loadingTitle}
       </Button>
     ):(
      <Button type={buttonType} className="w-full">
      {title}
      </Button>
   )}
   </>
  );
}

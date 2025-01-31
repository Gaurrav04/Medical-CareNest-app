import { getUserById } from "@/actions/users";
import TrackingForm from "@/components/Frontend/TrackingForm";
import VerifyTokenForm from "@/components/Frontend/VerifyTokenForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function VerifyAccount({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const { id } = await params;

  const user = await getUserById(id);
  const userToken = user?.token;
  const role = user?.role;


  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Resume your Application</CardTitle>
       <CardDescription>Please enter the 10-Character Trucking Number that was given to you.</CardDescription>
      </CardHeader>
     <CardContent>
      <TrackingForm role={role} userToken={userToken} id={id} />
    </CardContent>
    </Card>
    </div>
  );
}




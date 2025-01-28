import { getUserById } from "@/actions/users";
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
        <CardTitle className="text-xl">Verify Token</CardTitle>
       <CardDescription>PLease enter the 6 figure pass code sent to your email. - {user?.email} </CardDescription>
      </CardHeader>
     <CardContent>
      <VerifyTokenForm role={role} userToken={userToken} id={id} />
    </CardContent>
    </Card>
    </div>
  );
}




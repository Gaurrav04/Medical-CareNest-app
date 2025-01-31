"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { getApplicationByTrack } from "@/actions/onboarding";
import SubmitButton from "../FormInputs/SubmitButton";
import { UserRole } from "@prisma/client";

interface TrackingFormProps {
  role?: UserRole;
  userToken?: number;
  id: string;
}

const FormSchema = z.object({
  trackingNumber: z.string().min(10, {
    message: "Tracking number must be at least 10 characters.",
  }),
});

export default function TrackingForm({ role, userToken, id }: TrackingFormProps) {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setShowNotification(false); // Reset notification before request
    try {
      const res = await getApplicationByTrack(data.trackingNumber);
      if (res?.status === 404) {
        setShowNotification(true);
        setLoading(false);
      } else if (res?.status === 200) {
        setShowNotification(false);
        setLoading(false);
        router.push(`/onboarding/${res.data?.userId}?page=${res.data?.page}`);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setShowNotification(true); // Show alert on any error
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {showNotification && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Wrong Tracking Number!</span> Please check the tracking number and try again.
          </Alert>
        )}
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="Eg DZAQMU8OX8" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          title="Submit to Resume"
          isloading={loading}
          loadingTitle="Fetching please wait..."
        />
      </form>
    </Form>
  );
}

"use client"
import { AlarmClock, Bell, Globe, Home, LineChart, Mail, Package, Package2, Settings, Settings2, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";

type UserRole = "USER" | "ADMIN" | "DOCTOR";

interface RoleLink {
  title: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Sidebar({ session }: { session: Session }) {
  const { user } = session;
  const role = user?.role as UserRole; // Ensure type assertion for `role`
  const pathname = usePathname();
  const roles: Record<UserRole, RoleLink[]> = {
    USER: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "My Appointments",
        path: "/dashboard/user/appointments",
        icon: AlarmClock,
      },
      {
        title: "Settings",
        path: "/dashboard/user/settings",
        icon: Settings2,
      },
    ],

    ADMIN: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Services", path: "/dashboard/services", icon: Users },
      { title: "Specialties", path: "/dashboard/specialties", icon: Users },
      { title: "Symptoms", path: "/dashboard/symptoms", icon: Users },
      { title: "Doctors", path: "/dashboard/doctors", icon: Users },
      { title: "Patients", path: "/dashboard/patients", icon: Users },
      { title: "Appointments", path: "/dashboard/appointments", icon: Users },
      { title: "Settings", path: "/dashboard/settings", icon: Settings },
    ],

    // DOCTORASSISTANT: [
    //   { title: "Dashboard", path: "/dashboard", icon: Home },
    //   { title: "Doctors", path: "/dashboard/doctors", icon: Users },
    //   { title: "Patients", path: "/dashboard/patients", icon: Users },
    //   { title: "Appointments", path: "/dashboard/appointments", icon: Users },
    //   { title: "Settings", path: "/dashboard/settings", icon: Settings },
    // ],
    DOCTOR: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Appointments", path: "/dashboard/doctor/appointments", icon: AlarmClock },
      { title: "Patients", path: "/dashboard/doctor/patients", icon: Users },
      { title: "Tasks", path: "/dashboard/doctor/tasks", icon: Users },
      { title: "Inbox", path: "/dashboard/doctor/inbox", icon: Mail },
      { title: "Settings", path: "/dashboard/doctor/settings", icon: Settings },
    ],
  };

  let sideBarLinks = roles[role] || [];

  return (
    <div className="bg-muted/40 hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">CareNest</span>
          </a>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sideBarLinks.map((item: RoleLink, i: number) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    pathname === item.path ? "bg-muted text-primary " : ""
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
// import Link from "next/link"; // Unused import, commented out.

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle, // Unused variable, commented out.
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const megaMenu = [
  {
    title: "Top Booked",
    services: [
      {
        title: "Telehealth",
        slug: "tele-health",
        description:
          "Telehealth is the use of digital information and communication technologies to access health care services remotely and manage your health care.",
      },
      {
        title: "Video Prescription Refill",
        slug: "video-prescription-refill",
        description:
          "A video consultation to discuss and refill prescriptions with your doctor remotely.",
      },
      {
        title: "In Person Doctor Visit",
        slug: "in-person-doctor-visit",
        description:
          "Schedule an in-person visit with a doctor for your healthcare needs.",
      },
      {
        title: "UTI Consult",
        slug: "uti-consult",
        description:
          "Consult with a doctor for diagnosis and treatment of urinary tract infections.",
      },
    ],
  },
  {
    title: "Doctors",
    services: [
      {
        title: "Telehealth",
        slug: "tele-health",
        description:
          "Telehealth is the use of digital information and communication technologies to access health care services remotely and manage your health care.",
      },
      {
        title: "Video Prescription Refill",
        slug: "video-prescription-refill",
        description:
          "A video consultation to discuss and refill prescriptions with your doctor remotely.",
      },
      {
        title: "In Person Doctor Visit",
        slug: "in-person-doctor-visit",
        description:
          "Schedule an in-person visit with a doctor for your healthcare needs.",
      },
      {
        title: "UTI Consult",
        slug: "uti-consult",
        description:
          "Consult with a doctor for diagnosis and treatment of urinary tract infections.",
      },
    ],
  },
  {
    title: "Specialists",
    services: [
      {
        title: "Telehealth",
        slug: "tele-health",
        description:
          "Telehealth is the use of digital information and communication technologies to access health care services remotely and manage your health care.",
      },
      {
        title: "Video Prescription Refill",
        slug: "video-prescription-refill",
        description:
          "A video consultation to discuss and refill prescriptions with your doctor remotely.",
      },
      {
        title: "In Person Doctor Visit",
        slug: "in-person-doctor-visit",
        description:
          "Schedule an in-person visit with a specialist for your healthcare needs.",
      },
      {
        title: "UTI Consult",
        slug: "uti-consult",
        description:
          "Consult with a specialist for diagnosis and treatment of urinary tract infections.",
      },
    ],
  },
  {
    title: "Symptoms",
    services: [
      {
        title: "Telehealth",
        slug: "tele-health",
        description:
          "Telehealth is the use of digital information and communication technologies to access health care services remotely and manage your health care.",
      },
      {
        title: "Video Prescription Refill",
        slug: "video-prescription-refill",
        description:
          "A video consultation to discuss and refill prescriptions with your doctor remotely.",
      },
      {
        title: "In Person Doctor Visit",
        slug: "in-person-doctor-visit",
        description:
          "Schedule an in-person visit with a doctor to address your symptoms.",
      },
      {
        title: "UTI Consult",
        slug: "uti-consult",
        description:
          "Consult with a doctor to address symptoms of urinary tract infections.",
      },
    ],
  },
];

export default function MegaMenu() {
  // const pathname = usePathname()
  // if(pathname==="/login") return null;

  return (
    <NavigationMenu className="bg-white">
      <NavigationMenuList className="space-x-4">
        {megaMenu.map((item, i) => {
          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.services.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={`/services${component.slug}`}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

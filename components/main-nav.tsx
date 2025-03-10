"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ShieldPlus, ChevronDown } from "lucide-react"
import { docsConfig } from "@/config/docs"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function MainNav() {
  const pathname = usePathname();

  // Function to handle smooth scrolling
  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <ShieldPlus className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {docsConfig.mainNav?.map((item, i) => (
          item.dropdown ? (
            <DropdownMenu key={i}>
              <DropdownMenuTrigger asChild>
                <button className="relative flex items-center gap-1 font-medium hover:text-primary transition-colors">
                  {item.title}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start"
                className="w-56 bg-white shadow-lg rounded-lg p-2 border border-gray-200 animate-fadeIn"
              >
                {item.dropdown.map((subItem, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <button
                      className="block px-4 py-3 text-sm text-gray-700 font-medium hover:bg-gray-100 rounded-md transition w-full text-left"
                      onClick={(e) => {
                        e.preventDefault();
                        if (subItem.href.startsWith("/#") && pathname === "/") {
                          scrollToSection(subItem.href.replace("/#", ""));
                        } else {
                          window.location.href = subItem.href;
                        }
                      }}
                    >
                      {subItem.title}
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              key={i}
              className={cn(
                "font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-foreground"
              )}
              onClick={(e) => {
                e.preventDefault();
                if (item.href?.startsWith("/#") && pathname === "/") {
                  scrollToSection(item.href.replace("/#", ""));
                } else {
                  window.location.href = item.href ?? "#";
                }
              }}
            >
              {item.title}
            </button>
          )
        ))}
      </nav>
    </div>
  );
}

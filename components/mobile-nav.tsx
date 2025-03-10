"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const { setMetaColor, metaColor } = useMetaColor()
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const pathname = usePathname()

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open)
      setMetaColor(open ? "#09090b" : metaColor)
    },
    [setMetaColor, metaColor]
  )

  function handleSmoothScroll(targetId: string) {
    setOpen(false) // Close menu after clicking
    if (pathname === "/") {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.location.href = `/#${targetId}` // Navigate to homepage 
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[60svh] p-0">
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            {docsConfig.mainNav?.map((item) =>
              item.dropdown ? (
                <div key={item.title}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                    className="flex justify-between items-center w-full text-base font-medium py-2 hover:text-primary"
                  >
                    {item.title}
                    <span className={`transform transition-transform duration-200 ${openDropdown === item.title ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  {openDropdown === item.title && (
                    <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-3">
                      {item.dropdown.map((subItem) => (
                        <MobileLink key={subItem.href ?? "#"} href={subItem.href ?? "#"} onOpenChange={setOpen}>
                          {subItem.title}
                        </MobileLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.href === "/#telehealth" || item.href === "/#inperson" ? (
                <button
                  key={item.href ?? ""}
                  onClick={() => handleSmoothScroll(item.href?.replace("/#", "") ?? "")}
                  className="text-base block py-2 text-left hover:text-primary"
                >
                  {item.title}
                </button>
              ) : (
                <MobileLink key={item.href ?? "#"} href={item.href ?? "#"} onOpenChange={setOpen}>
                  {item.title}
                </MobileLink>
              )
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href = "#", onOpenChange, className, children, ...props }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn("text-base block py-2 hover:text-primary", className)}
      {...props}
    >
      {children}
    </Link>
  )
}

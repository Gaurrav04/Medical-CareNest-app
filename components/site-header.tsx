import Link from "next/link"

import { siteConfig } from "@/config/site"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import ModeToggle from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { LogIn, MailOpen } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center gap-4">
            <Button asChild>
                <Link href="/login">
                <LogIn className="" /> Login
                </Link>
              </Button>
              <ModeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
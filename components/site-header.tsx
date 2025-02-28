"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Session } from "next-auth"
import { LogIn } from "lucide-react"

import { siteConfig } from "@/config/site"
import { getInitials } from "@/utils/generateInitials"

import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import ModeToggle from "@/components/ModeToggle"
import SearchBar from "@/components/Frontend/SearchBar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function SiteHeader({ session }: { session: Session | null }) {
  const user = session?.user
  const initials = getInitials(user?.name)
  const router = useRouter()

  async function handleLogout() {
    await signOut()
    router.push("/login")
  }

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1">
              <SearchBar />
            </div>
            <nav className="flex items-center gap-4">
              {session && user?.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      {user.image ? (
                        <AvatarImage src={user.image} alt={user.name ?? "User"} />
                      ) : (
                        <AvatarFallback>{initials}</AvatarFallback>
                      )}
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="text-center">{user.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild>
                  <Link href="/login">
                    <LogIn className="mr-2" /> Login
                  </Link>
                </Button>
              )}
              <ModeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

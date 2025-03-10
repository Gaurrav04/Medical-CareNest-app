"use client";
 
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ModeToggle from "../ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { getInitials } from "@/utils/generateInitials";

export default function Navbar({session}:{session:Session}){
  const user = session.user;
  const initials = getInitials(user?.name);
  const router = useRouter();
  async function handleLogout() {
    await signOut()
    router.push("/login");
  }
  return (
    <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a href="##" className="flex items-center gap-2 text-lg font-semibold">
                  <Package className="h-6 w-6" />
                  <span className="sr-only">CareNest</span>
                </a>
                <a
                  href="##"
                  className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="##"
                  className="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge
                    className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  >
                    6
                  </Badge>
                </a>
                <a
                  href="##"
                  className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="##"
                  className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="##"
                  className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </a>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">Upgrade</Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ModeToggle/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  {user.image ? (
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                   ) :  ( <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">{user.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/")}>Home</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>handleLogout()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
  );
}
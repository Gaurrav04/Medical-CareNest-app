import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  DollarSign,
  LayoutGrid,
  Users,
  UsersRound,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getStats } from "@/actions/stats"

export default async function Dashboard() {
  const stats = await getStats()

  const statsCards = [
    {
      title:"Doctors",
      icon: Users,
      count:stats.doctors,
      href: "/dashboard/doctors"
    },
    {
      title:"Patients",
      icon: UsersRound,
      count:stats.patients,
      href: "/dashboard/patients"
    },
    {
      title:"Appointments",
      icon: CalendarDays,
      count:stats.appointments,
      href: "/dashboard/appointments"
    },
    {
      title:"Services",
      icon: LayoutGrid,
      count:stats.services,
      href: "/dashboard/services"
    },
  ]
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {
            statsCards.map((item,i)=>{
              const Icon = item.icon
              return (
            <Card key={i}> 
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.count}
              </div>
              <Link href={item.href} className="text-muted-foreground text-xs">
                View all {item.title}
              </Link>
            </CardContent>
          </Card>
              )
            })
          }

        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 grid-cols-1">
          <Card className=""> 
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent transactions from your store.</CardDescription>
          </div>
          <Button size="sm" className="ml-auto gap-1 justify-start">
            <Link href="##" className="flex items-center gap-1 w-full text-left">
             View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>

        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="xl:table.-column hidden">Type</TableHead>
                <TableHead className="xl:table.-column hidden">Status</TableHead>
                <TableHead className="xl:table.-column hidden">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="text-muted-foreground hidden text-sm md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="xl:table.-column hidden">Sale</TableCell>
                <TableCell className="xl:table.-column hidden">
                  <Badge className="text-xs" variant="outline">Approved</Badge>
                </TableCell>
                <TableCell
                  className="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-23
                </TableCell>
                <TableCell className="text-right">₹250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Olivia Smith</div>
                  <div className="text-muted-foreground hidden text-sm md:inline">
                    olivia@example.com
                  </div>
                </TableCell>
                <TableCell className="xl:table.-column hidden">Refund</TableCell>
                <TableCell className="xl:table.-column hidden">
                  <Badge className="text-xs" variant="outline">Declined</Badge>
                </TableCell>
                <TableCell
                  className="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-24
                </TableCell>
                <TableCell className="text-right">₹150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Noah Williams</div>
                  <div className="text-muted-foreground hidden text-sm md:inline">
                    noah@example.com
                  </div>
                </TableCell>
                <TableCell className="xl:table.-column hidden">
                  Subscription
                </TableCell>
                <TableCell className="xl:table.-column hidden">
                  <Badge className="text-xs" variant="outline">Approved</Badge>
                </TableCell>
                <TableCell
                  className="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-25
                </TableCell>
                <TableCell className="text-right">₹350.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Emma Brown</div>
                  <div className="text-muted-foreground hidden text-sm md:inline">
                    emma@example.com
                  </div>
                </TableCell>
                <TableCell className="xl:table.-column hidden">Sale</TableCell>
                <TableCell className="xl:table.-column hidden">
                  <Badge className="text-xs" variant="outline">Approved</Badge>
                </TableCell>
                <TableCell
                  className="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-26
                </TableCell>
                <TableCell className="text-right">₹450.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="text-muted-foreground hidden text-sm md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="xl:table.-column hidden">Sale</TableCell>
                <TableCell className="xl:table.-column hidden">
                  <Badge className="text-xs" variant="outline">Approved</Badge>
                </TableCell>
                <TableCell
                  className="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-27
                </TableCell>
                <TableCell className="text-right">₹550.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-muted-foreground text-sm">olivia.martin@email.com</p>
            </div>
            <div className="ml-auto font-medium">+₹1,999.00</div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
              <p className="text-muted-foreground text-sm">jackson.lee@email.com</p>
            </div>
            <div className="ml-auto font-medium">+₹39.00</div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/03.png" alt="Avatar" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
              <p className="text-muted-foreground text-sm">isabella.nguyen@email.com</p>
            </div>
            <div className="ml-auto font-medium">+₹299.00</div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/04.png" alt="Avatar" />
              <AvatarFallback>WK</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">William Kim</p>
              <p className="text-muted-foreground text-sm">will@email.com</p>
            </div>
            <div className="ml-auto font-medium">+₹99.00</div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/05.png" alt="Avatar" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-muted-foreground text-sm">sofia.davis@email.com</p>
            </div>
            <div className="ml-auto font-medium">+₹39.00</div>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
)
}
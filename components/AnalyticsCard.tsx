import React from 'react'
import { Card, CardContent,CardHeader,CardTitle} from "@/components/ui/card"
import { IndianRupee } from 'lucide-react'
import { DoctorAnalyticsProps } from '@/actions/stats'
import Link from 'next/link'

export default function AnalticsCard({
  data,
}:{
  data:DoctorAnalyticsProps
}) {
  const Icon = data.icon
  return (
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
          <Icon className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.unit}{data.count.toString().padStart(2,"0")}</div>
          <Link href={data.detailLink} className="text-muted-foreground text-xs">View Details</Link>
        </CardContent>
      </Card>
  )
}
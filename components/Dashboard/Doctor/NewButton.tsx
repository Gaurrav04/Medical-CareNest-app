import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NewButton({title,href}:{title:string,href:string}) {
  return (
    <div>
      <Button className="text-sm" variant="outline" asChild>
        <Link href={href}>
        <Plus className="w-4 h-4"/>
          {title}
        </Link>
      </Button>
    </div>
  )
}

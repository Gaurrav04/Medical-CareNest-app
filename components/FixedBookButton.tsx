"use client"
import { Button } from '@/components/ui/button';
import { getFormattedDate } from '@/utils/getFormatedShortDate';
import { Plus } from 'lucide-react'
import React from 'react'

export default function FixedBookButton({price}:{price:number | undefined}) {
  const formattedDate = getFormattedDate()
  return (
    <div className="fixed bottom-0 bg-white  dark:bg-slate-700 z-50 w-full shadow-2xl py-8 px-6">
        <div className="max-w-4xl mx-auto gap-4 items-center flex justify-between ">
        <div className="w-full">
      <p className="text-xl font-bold">₹{price}</p>
      <p className="text-sm font-semibold">{formattedDate}</p>
    </div>
    <Button
        variant="outline"
        className="px-6 py-3 bg-blue-600 bg-blue-600 dark:bg-gray-900"
        >
        <Plus className="w-5 h-5 mr-1" />
        Book
    </Button>
        </div>
  </div>
  )
}

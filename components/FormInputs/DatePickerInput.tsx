"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerInputProps={
  date: Date | undefined,
  setDate: any;
  className?: string;
  title: string;
};

export function DatePickerInput({date, setDate, className="col-span-full", title}: DatePickerInputProps) {
  return (
    <div className={cn("grid", className)}>
    <h2 className="text-base font-normal ">{title}</h2>
    <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "w-[240px] justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        initialFocus
      />
    </PopoverContent>
  </Popover>
    </div>
  
  )
}

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectInputProps = {
  label: string;
  optionTitle: string;
  className?: string;
  options: SelectOption[];
  selectedOption: any;  // Corrected typo from 'selctedOption'
  setSelectedOption: any;
};

export type SelectOption = {
  value: string;
  label: string;
};

export default function ShadSelectInput({
  label,
  className = "sm-col-span-2",
  optionTitle,
  options = [],
  selectedOption,
  setSelectedOption,
}: SelectInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2">
        {label}
      </label>
      <Select
        onValueChange={(value) => setSelectedOption(value)}
        value={selectedOption}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={optionTitle} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, i: number) => (
            <SelectItem key={i} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

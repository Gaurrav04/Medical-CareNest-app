import { Button } from '@/components/ui/button';
import { AlignHorizontalDistributeCenter, CalendarDays, Plus } from 'lucide-react';
import React from 'react';
import NewButton from './NewButton';

export default function PanelHeader() {
  return (
    <div className="py-2 px-6 border-b border-gray-200 flex items-center justify-between mb-4">
      <div className="flex items-center gap-1 text-sm">
        <CalendarDays className="w-4 h-4 flex-shrink-0" />
        <span>Appointments</span>
        <span className="bg-white w-6 h-6 rounded-full flex items-center 
        justify-center shadow-sm border text-xs dark:text-slate-900">10</span>
      </div>
    </div>
  );
}

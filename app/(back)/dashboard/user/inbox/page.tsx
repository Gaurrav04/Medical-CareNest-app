import { getInboxMessages } from '@/actions/inbox'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user
  if(user?.role !=="USER"){
    return (
      <NotAuthorized/>
    )
  }
  const userId = user?.id ? Number(user.id) : 0;

      const messages = (await getInboxMessages(userId)).data || [];
  return (
    <div>
       <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NewButton title="New Message" href="/dashboard/doctor/inbox/new"/>
        </div>
       </div>
       <HomeDisplayCard 
       title="Inbox Messages"
       newAppointmentLink="/dashboard/doctor/inbox/new" 
       count={messages.length}/>
    </div>
  );
}

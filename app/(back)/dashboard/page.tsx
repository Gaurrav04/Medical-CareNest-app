import Dashboard from '@/components/Dashboard/Dashboard'
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard'
import PatientDashboard from '@/components/Dashboard/PatientDashboard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions)
  const user = session?.user;
  const role = user?.role;
  if(role==="DOCTOR"){
    return (
    <>
      <p>The User Role is {user?.role}</p>
      <DoctorDashboard/>
    </>
    );
  }
  if(role==="USER"){
    return (
    <>
      <p>The User Role is {user?.role}</p>
      <PatientDashboard/>
    </>
    );
  }
  return (
    <div>
      <p>The User Role is {user?.role}</p>
       <Dashboard/>
    </div>
  );
}

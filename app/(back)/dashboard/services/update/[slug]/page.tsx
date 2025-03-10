import { getServiceByslug } from '@/actions/services';
import ServiceForm from '@/components/Dashboard/ServiceForm'
import React from 'react'

export default async function page({
  params:{slug}
}:{
  params:{slug:string}
}) {
  const service = (await getServiceByslug(slug))?.data;
  return (
    <div>
      {service && service.id && <ServiceForm title="Update Service" initialData={service}/>}
    </div>
  )
}

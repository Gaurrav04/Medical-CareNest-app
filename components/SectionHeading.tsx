import React from 'react'

export default function SectionHeading({ title}:{title:string}) {
  return (
    <h2 className="mb-4 text-3xl font-semibold leading-[1.3] text-gray-900 sm:text-4xl md:text-[40px]">
    {title}
    </h2>
  )
}

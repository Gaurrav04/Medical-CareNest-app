import React from 'react'

export default function SectionHeading({ title}:{title:string}) {
  return (
    <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 leading-[1.3] text-gray-900 dark:text-white sm:text-4xl md:text-[40px]">
    {title}
    </h2>
  )
}

"use client"

import React from 'react'
import parse from 'html-react-parser';

export default function MessageBody({
    html
}:{
    html:string
}) {
  return (
    <div className="parsed-html">{parse(`${html}`)}</div>
  )
}
{/* <div className="prose">{parse(`${html}`)}</div> */}


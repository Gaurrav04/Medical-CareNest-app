import React from 'react';

export default async function Page({ params }: { params: { id: string } }) {

  console.log("params", params); 
  return (
    <div className="">
      <div className="max-w-5xl mx-auto py-8 min-h-screen">
      <h2>Welcome Doctor - {params.id}</h2>
      </div>
    </div>
  );
}

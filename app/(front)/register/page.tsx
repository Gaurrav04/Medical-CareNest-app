import RegisterWithBg from '@/components/Auth/Register';
import React from 'react';

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Await the searchParams to ensure they are available before usage
  const { role, plan } = await searchParams;

  console.log(role, plan);
  return (
    <div className="">
      <RegisterWithBg role={role} plan={plan} />
    </div>
  );
}

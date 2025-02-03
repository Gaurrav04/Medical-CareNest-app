"use client"
import { Home, Settings, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function NotFound() {
    const pathname = usePathname();
  const navigation = [
    {
      icon: <Home />,
      title: "Home",
      desc: "Go Back Home",
      href: "/",
    },
    {
      icon: <Settings />,
      title: "Setting",
      desc: "Go to the Setting",
      href: "javascript:void(0)"
    },
  ];

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto text-gray-600">
          <div className="space-y-3 text-center">
            <h3 className="text-indigo-600 font-semibold">
              404 Error
            </h3>
            <p className="text-gray-800 dark:text-slate-400 text-3xl font-semibold sm:text-4xl">
              Page Not Found {pathname}
            </p>
            <p>
              Sorry, the page you are looking for could not be found or has been removed.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <ul className="divide-y">
            {navigation.map((item, idx) => (
              <li key={idx} className="flex gap-x-4 py-6">
                <div className="flex-none w-14 h-14 bg-indigo-50 rounded-full text-indigo-600 
                  flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-gray-800 font-medium">
                    {item.title}
                  </h4>
                  <p>
                    {item.desc}
                  </p>
                  <a href={item.href} className="text-sm text-indigo-600 duration-150 
                    hover:text-indigo-400 font-medium inline-flex items-center gap-x-1">
                    Learn More
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

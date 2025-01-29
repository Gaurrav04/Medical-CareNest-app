import { UploadDropzone } from "@/utils/uploadthing";
import { File, Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import { title } from "process";
import React from "react";
import toast from "react-hot-toast";

type MultipleImageInputProps = {
  label: string;
  files: File[];
  setFiles: any;
  className?: string;
  endpoint?: any;
};
export type File= {
  title: string;
  size: number;
  url: string;
}
export default function MultipleFileUpload({
  label,
  files,
  setFiles,
  className = "col-span-full",
  endpoint = "",
}: MultipleImageInputProps) {
  function handleImageRemove(fileIndex: any) {
    const updatedFiles = files.filter(
      (file, index) => index !== fileIndex
    );
    setFiles(updatedFiles);
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </label>
        {files && (
          <button
            onClick={() => setFiles([])}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Files</span>
          </button>
        )}
      </div>

      {files.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          {files.map((file, i) => {
            return (
              <div key={i} className="relative mb-6">
                <button
                  type="button"
                  onClick={() => handleImageRemove(i)}
                  className="absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full"
                >
                  <XCircle className="" />
                </button>
                <div className="py-3 rounded-md px-6 bg-white dark:bg-slate-800 text-slate-800 flex items-center dark:text-slate-200 border-slate-200">
                <File className="w-6 h-6 flex-shrink-0 mr-2"/> 
                <div className="flex flex-col">
                <span className="line-clamp-1">{file.title}</span>
                <span className="text-xs">{file.size}KB</span>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            console.log(res);
            const urls = res.map((item) => {
              const sizeInKB = item.size / 1024;
              return {
                url:item.url,
                title: item.name,
                size: Math.round(item.size / 1024),           
               }
            });
            setFiles(urls);
            toast.success("Image upload complete");
            console.log("Files:", res);
            console.log("Upload completed");
          }}
          onUploadError={(error: Error) => {
            toast.error("Image upload failed, try again.");
            console.error(`Error: ${error.message}`, error);
          }}
        />
      )}
    </div>
  );
}

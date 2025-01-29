import { UploadDropzone } from "@/utils/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint = "",
}: {
  label: string;
  imageUrl: string;
  setImageUrl: any;
  className?: string;
  endpoint: any;
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </label>

        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Uploaded Image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res: any) => {
            console.log("Upload response:", res); // Log the response
            if (res?.[0]?.url) {
              setImageUrl(res[0]?.url);
              toast.success("Image upload complete");
            } else {
              toast.error("Failed to upload image.");
            }
          }}
          onUploadError={(error: Error) => {
            console.error("Upload error:", error); // Log the error
            toast.error("Image upload failed, try again.");
          }}
        />
      )}
    </div>
  );
}

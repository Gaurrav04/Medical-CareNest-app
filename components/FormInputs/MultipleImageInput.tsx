import { UploadDropzone } from "@/utils/uploadthing";
import { Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

type MultipleImageInputProps = {
  label: string;
  imageUrls: string[];
  setImageUrls: any;
  className?: string;
  endpoint?: any;
};

export default function MultipleImageInput({
  label,
  imageUrls,
  setImageUrls,
  className = "col-span-full",
  endpoint = "",
}: MultipleImageInputProps) {
  function handleImageRemove(imageIndex: number) {
    const updatedImages = imageUrls.filter(
      (image, index) => index !== imageIndex
    );
    setImageUrls(updatedImages);
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
      </div>

      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((imageUrl, i) => {
            return (
              <div key={i} className="relative mb-6">
                <button
                  onClick={() => handleImageRemove(i)}
                  className="absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full"
                >
                  <XCircle className="" />
                </button>

                <Image
                  src={imageUrl}
                  alt="Item Image"
                  width={1000}
                  height={667}
                  className="w-full h-64 object-cover"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            console.log(res);
            const urls = res.map((item) => item.url);
            setImageUrls([...imageUrls, ...urls]);
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

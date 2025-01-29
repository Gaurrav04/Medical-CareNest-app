import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  doctorProfileImage: f({
    image: {
      maxFileSize: "1MB",
    },
  })
    .onUploadComplete(async ({ metadata, file }) => {
      // Log the uploaded file info and metadata
      console.log("doctorProfileImage upload complete");
      console.log("Metadata:", metadata);
      console.log("File:", file);
      return { uploadedBy: "Gaurav" };
    }),
  
  doctorProfessionDocs: f({
    pdf: {
      maxFileSize: "4MB",
    },
  })
    .onUploadComplete(async ({ metadata, file }) => {
      // Log the uploaded file info and metadata
      console.log("doctorProfessionDocs upload complete");
      console.log("Metadata:", metadata);
      console.log("File:", file);
      return { uploadedBy: "Gaurav" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

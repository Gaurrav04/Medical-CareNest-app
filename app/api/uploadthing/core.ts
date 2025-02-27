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

    serviceImage: f({
      image: {
        maxFileSize: "1MB",
      },
    })
      .onUploadComplete(async ({ metadata, file }) => {
        // Log the uploaded file info and metadata
        console.log("serviceImage upload complete");
        console.log("Metadata:", metadata);
        console.log("File:", file);
        return { uploadedBy: "Gaurav" };
      }),

  
  doctorProfessionDocs: f({
    pdf: {
      maxFileSize: "4MB", maxFileCount: 4
    },
  })
    .onUploadComplete(async ({ metadata, file }) => {
      // Log the uploaded file info and metadata
      console.log("doctorProfessionDocs upload complete");
      console.log("Metadata:", metadata);
      console.log("File:", file);
      return { uploadedBy: "Gaurav" };
    }),

    pdfUpload: f({
      pdf: {
        maxFileSize: "1MB", maxFileCount: 1
      },
    })
      .onUploadComplete(async ({ metadata, file }) => {
        // Log the uploaded file info and metadata
        console.log("Pdf upload Sucessfully");
        console.log("Metadata:", metadata);
        console.log("File:", file);
        return { uploadedBy: "Gaurav" };
      }),

    patientMedicalFiles: f({
      pdf: {
        maxFileSize: "4MB", maxFileCount: 4
      },
    })
      .onUploadComplete(async ({ metadata, file }) => {
        // Log the uploaded file info and metadata
        console.log("doctorProfessionDocs upload complete");
        console.log("Metadata:", metadata);
        console.log("File:", file);
        return { uploadedBy: "Gaurav" };
      }),

    additionalDocs: f({
      pdf: {
        maxFileSize: "4MB", maxFileCount: 4
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

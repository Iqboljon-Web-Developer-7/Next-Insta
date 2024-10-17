"use client";

import photoVideosImg from "@/assets/post/images-videos.svg";
import Image from "next/image";
// components/FileUpload.tsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Files:", acceptedFiles);

    // Example: Send the files to the server
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // @ts-ignore
    accept: "image/*",
  });

  return (
    <div
      {...getRootProps()}
      className="w-full border-2 border-dashed border-slate-800 rounded-lg p-12 flex flex-col items-center justify-center text-gray-400"
    >
      <input {...getInputProps()} />
      <div className="flex-center flex-col">
        <Image
          src={photoVideosImg.src}
          alt="placeholder image"
          width={96}
          height={77}
          className="max-w-24 max-h-20"
        />
        <p className="mb-2 text-slate-200 font-semibold text-lg">
          Drag photos and videos here
        </p>
        <p className="text-xs text-[#5C5C7B]">
          (SVG, PNG, JPG or GIF, max. 800x400px)
        </p>
        <button
          type="button"
          className="mt-4 bg-[#1F1F22] text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-800 focus:outline-none duration-200"
        >
          Select from computer
        </button>
      </div>
    </div>
  );
};

export default FileUpload;

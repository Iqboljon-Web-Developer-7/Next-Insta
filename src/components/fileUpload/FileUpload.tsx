"use client";

import photoVideosImg from "@/assets/post/images-videos.svg";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Button } from "../ui/button";
import { useUploadFilesMutation } from "@/redux/api/createPost";

interface FileTypes {
  setFiles: React.Dispatch<React.SetStateAction<{ content: string[] }>>;
}
interface itemTypes {
  files: itemValue[];
}

interface itemValue {
  url: string[];
}

const FileUpload: React.FC<FileTypes> = ({ setFiles }) => {
  const [uploadFiles, { isLoading }] = useUploadFilesMutation();
  const [images, setImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Files:", acceptedFiles);
    setImages((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleFileUploading = () => {
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("files", file);
    });

    uploadFiles({ files: formData })
      .unwrap()
      .then((data) => {
        let result = {
          content: [],
        };
        // @ts-ignore
        result.content = data.files.map((item: itemTypes[]) => item[0].url);
        console.log(result.content);
        setFiles(result);
      });
  };

  return (
    <div className="w-full max-h-96 overflow-x-auto relative border-2 border-dashed border-slate-800 rounded-lg flex-center justify-start text-gray-400">
      <input {...getInputProps()} accept="image/*, video/*" />
      {images.length <= 0 ? (
        <div
          {...getRootProps()}
          className="flex-center text-center flex-col w-full py-12 px-4"
        >
          <Image
            src={photoVideosImg.src}
            alt="placeholder image"
            width={96}
            height={77}
            className="max-w-24 max-h-20 mb-3"
          />
          <p className="mb-2 text-slate-200 font-semibold text-lg">
            Drag photos and videos here
          </p>
          <p className="text-xs text-[#5C5C7B] leading-3">
            SVG, PNG, JPG or GIF, (max. 800x400px)
          </p>
          <button
            type="button"
            className="mt-5 bg-[#1F1F22] text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-800 focus:outline-none duration-200"
          >
            Select from computer
          </button>
        </div>
      ) : (
        <div className="p-6 pb-[4.8rem] self-stretch relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.values(images).map((i, inx) => (
              <div key={inx} className="relative group overflow-y-auto">
                <Zoom>
                  <img
                    className="border h-40 object-cover flex-shrink-0 zommable-img"
                    src={URL.createObjectURL(i)}
                    width={100}
                    alt="post image"
                  />
                </Zoom>
                <button
                  type="button"
                  className="hover:bg-red-500 text-red-500 hover:text-white group-hover:opacity-100 hover:opacity-100 lg:opacity-0 w-6 h-6 text-xs rounded-full absolute top-[3%] left-[3%] duration-200"
                  onClick={() =>
                    setImages((prev: any) =>
                      [...prev].filter((_, index) => index !== inx)
                    )
                  }
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {images.length != 0 && (
            <div className="controls sticky inset-[auto_0_0_0] bottom-0 flex-center justify-between p-4 bg-[#00000088] backdrop-blur-sm">
              <Button type="button" onClick={handleFileUploading}>
                {isLoading ? "loading..." : "Confirm"}
              </Button>
              <Button
                className="hover:bg-green-700 duration-200"
                type="button"
                {...getRootProps()}
              >
                Add +
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

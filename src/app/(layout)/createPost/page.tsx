"use client";

import React, { FormEvent, SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import LocationDisplay from "@/components/geoAddress/GeoAddress";
import FileUpload from "@/components/fileUpload/FileUpload";

import galleryImage from "@/assets/post/galler-icon.svg";
import locationImage from "@/assets/post/location-icon.svg";
import { useCreatePostMutation } from "@/redux/api/Post";

import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [files, setFiles] = useState<{ content: string[] }>({ content: [] });
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [location, setLocation] = useState("");
  const [ready, setReady] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);

    const caption = formData.get("caption") as string;
    const location = formData.get("location") as string;
    const content_alt = formData.get("contentAlt") as string;

    let response = {
      content: [...files.content],
      content_alt,
      caption,
      location,
    };

    createPost({ data: response })
      .unwrap()
      .then(() => {
        router.push("/");
      });
  };

  useEffect(() => {}, [files]);

  return (
    <div className="min-h-screen grid md:grid-cols-[4fr_2fr] w-full text-white lg:p-6">
      <div className="mx-auto flex gap-10 w-full">
        <div className="w-full p-8 rounded-lg">
          <h2 className="text-4xl font-bold mb-6 flex gap-2">
            <Image
              src={galleryImage.src}
              alt="gallery icon"
              width={120}
              height={40}
              className="max-w-9 max-h-9"
            />
            Create a Post
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="caption" className="block text-lg mb-2">
                Caption
              </label>
              <textarea
                name="caption"
                id="caption"
                rows={3}
                className="w-full p-3 bg-[#101012] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 duration-100"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Add Photos/Videos</label>
              <FileUpload
                setFiles={setFiles}
                ready={ready}
                setReady={setReady}
              />
            </div>
            <div>
              <LocationDisplay setLocation={setLocation} />
              <label htmlFor="location" className="block text-lg mb-2">
                Add Location
              </label>
              <div className="relative">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  id="location"
                  name="location"
                  type="text"
                  className="w-full p-3 bg-[#101012] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 duration-100"
                  required
                />
                <Image
                  src={locationImage.src}
                  alt="location icon"
                  width={40}
                  height={40}
                  className="max-w-4 absolute inset-[50%_2%_0_auto] translate-y-[-50%]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="altText" className="block text-lg mb-2">
                Photo/Video Alt Text
              </label>
              <input
                name="contentAlt"
                id="altText"
                type="text"
                className="w-full p-3 bg-[#101012] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 duration-100"
                required
              />
            </div>
            <div className="text-right">
              {files.content.length > 0 && ready && (
                <button
                  type="submit"
                  className="bg-[#877EFF] text-white px-6 py-3 rounded-lg hover:bg-purple-700 focus:outline-none"
                >
                  {isLoading ? (
                    <div className="px-4">
                      <div className="loader"></div>{" "}
                    </div>
                  ) : (
                    "Share Post"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
        {/* Sidebar Section */}
        {/* <div className="w-1/3">
          <div className="bg-gray-800 p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <img
                src="/path-to-profile-picture.jpg"
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-bold">Lewis Hamilton</p>
                <p className="text-sm text-gray-400">@Lewishamilton</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4">Top posts by you</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src="/path-to-top-post-1.jpg"
                  alt="Top Post 1"
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src="/path-to-top-post-2.jpg"
                  alt="Top Post 2"
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CreatePost;

import React from "react";

import LocationDisplay from "@/components/geoAddress/GeoAddress";
import FileUpload from "@/components/fileUpload/FileUpload";

const CreatePost = () => {
  return (
    <div className="min-h-screen grid grid-cols-2 w-full text-white p-6">
      <div className="mx-auto flex gap-10 w-full">
        <div className="w-full p-8 rounded-lg">
          <LocationDisplay />
          <h2 className="text-2xl font-bold mb-6">Create a Post</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="caption" className="block text-sm mb-2">
                Caption
              </label>
              <textarea
                id="caption"
                rows={3}
                className="w-full p-3 bg-[#101012] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Add Photos/Videos</label>
              <FileUpload />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm mb-2">
                Add Location
              </label>
              <input
                id="location"
                type="text"
                className="w-full p-3 bg-[#101012] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Location"
              />
            </div>
            <div>
              <label htmlFor="altText" className="block text-sm mb-2">
                Photo/Video Alt Text
              </label>
              <input
                id="altText"
                type="text"
                className="w-full p-3 bg-[#101012] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe the content of the media"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 focus:outline-none"
              >
                Share Post
              </button>
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

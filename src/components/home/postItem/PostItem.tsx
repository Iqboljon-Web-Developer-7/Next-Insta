import { PostProps } from "@/types/types";
import React from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

import Zoom from "react-medium-image-zoom";

const PostItem: React.FC<PostProps> = ({
  user,
  timestamp,
  caption,
  hashtags,
  content,
  likesCount,
  commentsCount,
  sharesCount,
}) => {
  return (
    <div className="text-slate-200 p-4 rounded-lg shadow-lg mb-6 border border-slate-800">
      <div className="flex items-center mb-2">
        <img
          src={user?.profilePicture}
          alt={user?.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold">{user?.name}</h4>
          <p className="text-xs text-gray-400">{timestamp}</p>
        </div>
      </div>

      <p className="mb-3">
        {caption}{" "}
        {hashtags?.map((tag) => (
          <span key={tag} className="text-blue-400">
            #{tag}{" "}
          </span>
        ))}
      </p>

      <div className="relative">
        {content!?.length > 0 && (
          <div className="overflow-hidden rounded-lg">
            <Zoom>
              <img
                src={content![0]}
                alt="Post"
                className="w-full h-64 object-cover"
              />
            </Zoom>
            {/* <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full">
              <FaChevronLeft />
            </button>
            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full">
              <FaChevronRight />
            </button> */}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-4 text-gray-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <FaHeart className="text-red-500" />
            <span>{likesCount}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaComment className="text-blue-500" />
            <span>{commentsCount}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaShare className="text-green-500" />
            <span>{sharesCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

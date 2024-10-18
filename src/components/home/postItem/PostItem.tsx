import React from "react";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

interface PostProps {
  user: {
    name: string;
    profilePicture: string;
  };
  timestamp: string;
  caption: string;
  hashtags: string[];
  content: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

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
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mb-6">
      {/* User info */}
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

      {/* Caption */}
      <p className="mb-3">
        {caption}{" "}
        {hashtags?.map((tag) => (
          <span key={tag} className="text-blue-400">
            #{tag}{" "}
          </span>
        ))}
      </p>

      {/* Image carousel */}
      <div className="relative">
        {content?.length > 0 && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={content[0]}
              alt="Post"
              className="w-full h-64 object-cover"
            />
            {/* Carousel controls (left and right arrows) */}
            <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full">
              <FaChevronLeft />
            </button>
            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full">
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Footer (Likes, Comments, Shares) */}
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

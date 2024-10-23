import { PostProps } from "@/types/types";
import React from "react";
import { FaHeart } from "react-icons/fa";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { FaRegHeart } from "react-icons/fa";
import commentsImg from "@/assets/post/messages.svg";
import forwardImg from "@/assets/post/forward.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostItem: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();
  const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = fallbackImage; // Set the fallback image
  };

  return (
    post?.content.length > 0 && (
      <div className="text-slate-200 p-4 rounded-lg shadow-lg mb-6 border border-slate-800">
        <div className="flex items-center mb-2">
          <img
            src={post?.owner.photo}
            alt={post?.name}
            onError={handleImageError}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h4
              className="font-semibold"
              onClick={() => router.push(`/profile/${post?.owner.username}`)}
            >
              {post?.owner.username}
            </h4>
            <p className="text-xs text-gray-400">{post?.updatedAt}</p>
          </div>
        </div>

        <p className="mb-3">{post?.caption} </p>

        <div className="relative">
          {post.content.length > 0 && (
            <div className="overflow-hidden rounded-lg">
              {post.content[0].type == "IMAGE" ? (
                <Zoom>
                  <img
                    src={post.content[0].url}
                    alt={post.content_alt}
                    className="w-full h-72 object-cover"
                  />
                </Zoom>
              ) : (
                <video
                  src={post.content[0].url}
                  className="max-h-96"
                  controls
                ></video>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4 text-[#EFEFEF]">
          <div className="flex items-center space-x-5 text-xl ">
            {post?.show_likes && (
              <span className="flex items-center space-x-1">
                {post?.likes_count == 0 ? (
                  <FaRegHeart color="#ff0000" />
                ) : (
                  <FaHeart className="text-red-500" />
                )}
                <span>{post?.likes_count}</span>
              </span>
            )}
            <span className="flex items-center space-x-1">
              <Image
                src={commentsImg.src}
                alt="comments img"
                width={40}
                height={40}
              />
              <span>{post?.comments_count}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Image
                src={forwardImg.src}
                alt="forward img"
                width={40}
                height={40}
              />
              <span>{post?.shares_count}</span>
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default PostItem;

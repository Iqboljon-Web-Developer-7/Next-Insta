import { PostProps } from "@/types/types";
import React, { FormEvent, useState } from "react";
import { FaHeart } from "react-icons/fa";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { FaRegHeart } from "react-icons/fa";
import commentsImg from "@/assets/post/messages.svg";
import forwardImg from "@/assets/post/forward.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import messageSendImg from "@/assets/post/message-send.svg";
import {
  useCommentPostMutation,
  useGetPostCommentsQuery,
  useLikePostMutation,
} from "@/redux/api/Post";
const PostItem: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();
  const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = fallbackImage; // Set the fallback image
  };

  interface stateType {
    user: {
      userInfo: {
        _id: string;
        photo: string;
      };
    };
  }

  const userData = useSelector((state: stateType) => state.user.userInfo);

  const [commentPost, { isLoading }] = useCommentPostMutation();

  const handleMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const data: any = {};

    Array.from(formData.entries()).forEach(([key, value]) => {
      data[key] = value;
    });

    commentPost({ id: post._id, body: data })
      .unwrap()
      .then(() => target.reset());
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#000",
    border: "2px solid #000",
    boxShadow: 24,
  };

  const [id, setId] = useState("");
  const { data: postComments, isFetching } = useGetPostCommentsQuery({ id });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setId(post?._id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  console.log("post", postComments);

  console.log(post);

  const dateConverter = (dateStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    console.log(formattedDate); // Output: "10/19/2024"
    return formattedDate;
  };

  const [likePost, { isLoading: isLiking }] = useLikePostMutation({});

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
        <div>
          <Button
            variant="text"
            onClick={handleOpen}
            className="text-white font-bold"
          >
            {post?.caption}
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex">
                <div>
                  {post.content.length > 0 && (
                    <div className="rounded-lg flex w-[31rem] overflow-x-auto">
                      {post.content.map((item, idx) => {
                        return item.type == "IMAGE" ? (
                          <img
                            src={post.content[0].url}
                            alt={post.content_alt}
                            className="w-[31rem] h-auto object-contain flex-grow flex-shrink-0"
                          />
                        ) : item.type == "VIDEO" ? (
                          <video
                            src={post.content[0].url}
                            className="w-[31rem] h-auto max-h-96 object-contain flex-grow flex-shrink-0"
                            controls
                          ></video>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-[31rem] min-h-[30rem] px-6">
                  <div className="user-infos pt-8  flex gap-2">
                    <img
                      className="max-w-11 max-h-11 rounded-full"
                      src={post?.owner.photo}
                      onError={handleImageError}
                      alt="user image"
                    />
                    <div>
                      <h3 className="font-semibold">{post?.owner.username}</h3>
                      <p className="font-light text-sm">
                        {dateConverter(post?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <h4 className="mt-4 font-bold">{post?.caption}</h4>
                  <div className="mt-4">
                    {postComments ? (
                      postComments.map(
                        (item: { message: string }, idx: number) => (
                          <p>
                            Message {idx + 1}: {item.message}
                          </p>
                        )
                      )
                    ) : (
                      <div className="animate-pulse space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                            <div className="space-y-2">
                              <div className="h-3 bg-gray-700 rounded w-full"></div>
                              <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                            </div>
                            <div className="flex space-x-4">
                              <div className="h-3 bg-gray-700 rounded w-12"></div>
                              <div className="h-3 bg-gray-700 rounded w-10"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {postComments?.length <= 0 && "No Message :("}
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>{" "}
        <div className="relative">
          {post.content.length > 0 && (
            <div className="rounded-lg flex overflow-x-auto">
              {post.content.map((item, idx) => {
                return item.type == "IMAGE" ? (
                  <Zoom>
                    <img
                      src={post.content[0].url}
                      alt={post.content_alt}
                      className="w-96 h-72 object-cover flex-grow flex-shrink-0"
                    />
                  </Zoom>
                ) : (
                  <video
                    src={post.content[0].url}
                    className="w-96 max-h-96 flex-grow flex-shrink-0"
                    controls
                  ></video>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4 text-[#EFEFEF]">
          <div className="flex items-center space-x-5 text-xl ">
            {post?.show_likes && (
              <span
                onClick={() => likePost({ id: post?._id })}
                className="flex items-center space-x-1"
              >
                {post?.likes.length <= 0 ? (
                  <FaRegHeart
                    color="#ff0000"
                    className={`${isLiking && "animate-bounce"}`}
                  />
                ) : (
                  <FaHeart
                    className={`text-red-500 ${isLiking && "animate-bounce"}`}
                  />
                )}
                <span>{post?.likes.length}</span>
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
        <div className="mt-5 flex items-center justify-center gap-4">
          <img
            className="w-10 h-10 rounded-full"
            src={userData.photo || fallbackImage}
            onError={handleImageError}
            alt="user info"
          />
          <form
            onSubmit={handleMessage}
            className="w-full rounded-2xl py-2 px-3 flex items-center justify-center bg-[#101012]"
          >
            <input
              disabled={isLoading}
              type="text"
              name="message"
              className={`w-full placeholder:text-[#5C5C7B] bg-transparent text-base outline-none border-none ${
                isLoading && "cursor-wait"
              }`}
              placeholder="Write your comment..."
            />
            <button>
              <img src={messageSendImg.src} />
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default PostItem;

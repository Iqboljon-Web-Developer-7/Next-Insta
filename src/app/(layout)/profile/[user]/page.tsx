"use client";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  useFollowUserMutation,
  useGetUserPostsQuery,
  useGetUserProfileQuery,
  useUnFollowUserMutation,
} from "@/redux/api/user";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#000",
  border: "2px solid #000",
  boxShadow: 24,
};

import notFoundPost from "@/assets/people/not found posts.webp";
import editImg from "@/assets/people/edit.svg";
import Image from "next/image";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { useSelector } from "react-redux";
import { useGetPostCommentsQuery } from "@/redux/api/Post";

const page = () => {
  const [modalId, setModalId] = React.useState("0");
  const [id, setId] = useState("");

  const handleOpen = (id: string) => {
    setId(id);
    setModalId(id);
  };
  const handleClose = () => setModalId("");

  const [loadingUser, setLoadingUser] = useState<string | null>(null);

  const [follorUser] = useFollowUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();

  const handleFollow = async (username: string) => {
    setLoadingUser(username);
    try {
      await follorUser({ username });
    } finally {
      setLoadingUser(null);
    }
  };

  const handleUnfollow = async (username: string) => {
    setLoadingUser(username);
    try {
      await unfollowUser({ username });
    } finally {
      setLoadingUser(null);
    }
  };

  const [username, setUsername] = useState("");
  const { data } = useGetUserProfileQuery({ username });
  const { data: userPosts } = useGetUserPostsQuery({ username });
  const params = useParams();

  const { data: postComments } = useGetPostCommentsQuery({ id });

  const userData = useSelector(
    (state: {
      user: { _id: string; userInfo: { username: string; _id: string } };
    }) => state.user
  );

  useEffect(() => {
    setUsername(`/${params.user}`);
  }, [params]);

  const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = fallbackImage; // Set the fallback image
  };

  return userPosts ? (
    <div className="px-8 max-h-screen">
      <div className="p-5 flex mt-12">
        <img
          src={data?.photo! || fallbackImage}
          onError={handleImageError}
          className="w-36 h-36 rounded-full mr-[1.875rem]"
          alt="profile photo"
        />
        <div className="flex flex-col gap-3">
          <div className="user-title flex items-center justify-between flex-wrap">
            <h2 className="text-4xl font-semibold capitalize ">
              {data?.fullName}
            </h2>
            {userData.userInfo.username == params.user ? (
              <div className="flex gap-2 items-center justify-center ml-8 cursor-pointer">
                <Image
                  src={editImg.src}
                  alt="edit icon"
                  width={80}
                  height={80}
                  className="max-w-4"
                />
                <span className="font-semibold"> Edit Profile</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="subscription ml-10 flex gap-3 items-center justify-center">
                  {data?.followers.some(
                    (item) => item._id == userData.userInfo._id
                  ) ? (
                    <button
                      onClick={() => handleUnfollow(data?.username)}
                      className="bg-red-300 text-white py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm"
                      disabled={loadingUser === data?.username}
                    >
                      {loadingUser === data?.username ? (
                        <div className="loader my-1 mx-3"></div>
                      ) : (
                        <span>Unfollow</span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(data?.username!)}
                      className="bg-[#877EFF] text-white py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm"
                      disabled={loadingUser === data?.username}
                    >
                      {loadingUser === data?.username ? (
                        <div className="loader my-1 mx-3"></div>
                      ) : (
                        <span>Follow</span>
                      )}
                    </button>
                  )}
                </div>
                <button className="bg-slate-200 text-slate-900 ml-3 py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm">
                  Message
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[#7878A3] text-xl">@{data?.username}</p>
            <div className="flex items-center justify-start gap-5 text-xl">
              <h3>
                <span className="text-[#877EFF]">{data?.posts.length}</span>{" "}
                Posts
              </h3>
              <h3>
                <span className="text-[#877EFF]">{data?.followers.length}</span>{" "}
                Followers
              </h3>
              <h3>
                <span className="text-[#877EFF]">{data?.following.length}</span>{" "}
                Following
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-auto">
        {data?.posts.length == 0 ? (
          <Image
            src={notFoundPost.src}
            alt="not found img"
            height={1000}
            width={1000}
            className="max-w-96 mx-auto"
          />
        ) : (
          <div className="overflow-y-auto flex items-center justify-center gap-6 flex-wrap">
            {userPosts?.map((item: any) => {
              return (
                <div className="relative max-w-80">
                  <div className="absolute z-20">
                    <button
                      className="py-1 px-2 rounded-2xl m-2 text-sm bg-black text-slate-200"
                      onClick={() => handleOpen(item._id)}
                    >
                      Open
                    </button>
                    <Modal
                      open={modalId == item._id}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                          <div className="w-[24rem]  flex-shrink-0">
                            {item?.content[0]?.type == "VIDEO" ? (
                              <video src={item?.content[0]?.url} controls />
                            ) : (
                              <Zoom>
                                <Image
                                  src={item?.content[0]?.url}
                                  alt="img of post"
                                  height={1000}
                                  width={1000}
                                />
                              </Zoom>
                            )}
                          </div>
                          <div className="w-[24rem]  flex-shrink-0 p-5">
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
                      </Box>
                    </Modal>
                  </div>

                  {item?.content[0]?.type == "VIDEO" ? (
                    <video src={item?.content[0]?.url} controls />
                  ) : (
                    <Zoom>
                      <Image
                        src={item?.content[0]?.url}
                        alt="img of post"
                        height={1000}
                        width={1000}
                      />
                    </Zoom>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  ) : (
    <>
      <div className="px-8 animate-pulse w-full">
        <div className="p-5 flex mt-12 flex-col md:flex-row gap-6">
          <div className="w-36 h-36 rounded-full bg-gray-700"></div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="user-title flex items-center gap-10">
              <div className="h-8 bg-gray-700 rounded w-1/2"></div>
              <div className="flex gap-2 items-center justify-center ml-8">
                <div className="h-6 w-6 bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-700 rounded w-20"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="flex items-center justify-start gap-5">
              <div className="h-4 bg-gray-700 rounded w-16"></div>
              <div className="h-4 bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-700 h-52 w-full rounded"></div>
          <div className="bg-gray-700 h-52 w-full rounded"></div>
          <div className="bg-gray-700 h-52 w-full rounded"></div>
          <div className="bg-gray-700 h-52 w-full rounded"></div>
          <div className="bg-gray-700 h-52 w-full rounded"></div>
          <div className="bg-gray-700 h-52 w-full rounded"></div>
          <div className="bg-gray-700 h-52 w-full rounded"></div>
          <div className="bg-gray-700 h-52 w-full rounded"></div>
          <div className="bg-gray-700 h-52 w-full rounded"></div>
        </div>
      </div>
    </>
  );
};

export default page;

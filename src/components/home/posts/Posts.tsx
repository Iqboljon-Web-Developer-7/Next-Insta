import React from "react";
import PostItem from "../postItem/PostItem";

const App: React.FC = () => {
  const postData = {
    owner: {
      name: "Lewis Hamilton",
      photo: "https://via.placeholder.com/150",
      username: "",
    },
    createdAt: "26 June at 09:32 PM",
    updatedAt: "",
    caption: "It's a big world out there - explore!",
    // hashtags: ["nature", "mountains"],
    content: [
      { url: "https://via.placeholder.com/600x400", type: "IMAGE" },
      { url: "https://via.placeholder.com/600x400/0000FF", type: "IMAGE" },
    ],
    content_alt: "string",
    likes_count: 120,
    comments_count: 68,
    shares_count: 74,
    show_likes: true,
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <PostItem {...postData} post={postData} />
    </div>
  );
};

export default App;

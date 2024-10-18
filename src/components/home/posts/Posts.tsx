import React from "react";
import PostItem from "../postItem/PostItem";

const App: React.FC = () => {
  const postData = {
    user: {
      name: "Lewis Hamilton",
      profilePicture: "https://via.placeholder.com/150",
    },
    timestamp: "26 June at 09:32 PM",
    caption: "It's a big world out there - explore!",
    hashtags: ["nature", "mountains"],
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400/0000FF",
    ],
    likesCount: 120,
    commentsCount: 68,
    sharesCount: 74,
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <PostItem {...postData} />
    </div>
  );
};

export default App;

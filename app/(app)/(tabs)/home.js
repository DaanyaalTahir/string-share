import React, { useEffect, useRef, useState } from "react";
import PostSection from "../../../components/PostSection";
function home() {
  const [posts, setPosts] = useState([
    {
      postId: "9c5b94b1-35ad-49bb-b118-8e8fc24abf8",
      username: "Batman@wayne_industries",
      fullName: "Bruce Wayne",
      post: "Hi my name is bruce wayne and this is my first post on StringShare!!!",
      avatar: undefined,
      likes: 10,
      replies: 7,
      datePosted: new Date().toISOString(),
    },
    {
      postId: "9c5b94b1-35ad-49bb-b118-8e8fc24abf8123",
      username: "Robin@wayne_industries",
      fullName: "Robin",
      post: "Hi im a very cool superhero, did you know that!!!",
      avatar: undefined,
      likes: 10,
      replies: 7,
      location: {
        latitude: "43.65189",
        longitude: "-79.381706",
      },
      datePosted: new Date().toISOString(),
    },
    {
      postId: "9c5b94b1-35ad-49bb-b118-8e8fc24abf85",
      username: "Joe@wayne_industries",
      fullName: "Joe Gary",
      post: "Never heard of those two guys above me",
      avatar: undefined,
      likes: 10,
      replies: 7,
      datePosted: new Date().toISOString(),
    },
  ]);

  return <PostSection posts={posts} />;
}

export default home;

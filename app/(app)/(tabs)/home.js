import React, { useEffect, useRef, useState } from "react";
import PostSection from "../../../components/PostSection";
import api from "../../../utils/api";

function home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    api
      .get("/client/posts")
      .then((response) => {
        // Handle the response data here
        setPosts(response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }, []);

  return <PostSection posts={posts} setPosts={setPosts} />;
}

export default home;

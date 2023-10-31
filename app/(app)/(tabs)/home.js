import React, { useEffect, useRef, useState } from "react";
import { Text, Heading, Box } from "@gluestack-ui/themed";
import UserPost from "../../../components/UserPost";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Comment from "../../../components/Comment";
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

  const [comments, setComments] = useState([]);

  const snapPoints = ["50%", "80"];
  const sheetRef = useRef(null);
  const openBottomSheet = (comments) => {
    console.log(comments);
    setComments(comments);
    sheetRef.current.snapToIndex(1);
  };

  useEffect(() => {
    sheetRef?.current.close();
  }, [sheetRef]);

  return (
    <Box style={{ height: "100%" }}>
      {posts.map((post) => {
        return (
          <UserPost
            key={post.postId}
            post={post}
            openBottomSheet={openBottomSheet}
            setComments={setComments}
          />
        );
      })}
      <BottomSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetView style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
          <Heading size="md">Comments</Heading>
          {comments?.map((comment) => {
            return <Comment key={comment.uuid} comment={comment} />;
          })}
        </BottomSheetView>
      </BottomSheet>
    </Box>
  );
}

export default home;

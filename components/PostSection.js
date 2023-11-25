import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Heading,
  Box,
  Input,
  InputField,
  HStack,
  Button,
  ButtonIcon,
} from "@gluestack-ui/themed";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Comment from "./Comment";
import UserPost from "./UserPost";
import { SendHorizontal } from "lucide-react-native";
import { ScrollView } from "react-native";
import api from "../utils/api";

const PostSection = ({ posts, setPosts }) => {
  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [newComment, setNewComment] = useState("");
  const snapPoints = ["50%", "80"];
  const sheetRef = useRef(null);

  const openBottomSheet = (comments) => {
    setComments(comments);
    sheetRef.current.snapToIndex(1);
  };

  useEffect(() => {
    sheetRef?.current.close();
  }, [sheetRef]);

  const postComment = async () => {
    try {
      await api.post("/client/comment", {
        post_id: currentPost.post_id,
        content: newComment,
      });
      const updatedComments = await api.get(
        `/client/comments?post_id=${currentPost.post_id}`
      );

      setComments(updatedComments.data);
      setNewComment("");
      updatePosts({ ...currentPost, comments: currentPost.comments + 1 });
    } catch (error) {
      console.error(error);
    }
  };

  const updatePosts = (post) => {
    const postsCpy = [...posts];
    setPosts(
      postsCpy.map((curPost) =>
        curPost.post_id === post.post_id ? post : curPost
      )
    );
  };

  return (
    <Box style={{ height: "100%" }}>
      <ScrollView style={{ flex: 1 }}>
        {posts.map((post) => {
          return (
            <UserPost
              key={post.post_id}
              post={post}
              openBottomSheet={openBottomSheet}
              setCurrentPost={setCurrentPost}
              updatePosts={updatePosts}
            />
          );
        })}
      </ScrollView>

      <BottomSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        enablePanDownToClose={true}
        index={-1}
        style={{ position: "absolute" }}
      >
        <BottomSheetView style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
          <Heading size="md">Comments</Heading>
          <HStack style={{ alignItems: "flex-end" }} space="md">
            <Input variant="rounded" size="md" marginTop={10} flex={1}>
              <InputField
                placeholder="Add your comment here..."
                value={newComment}
                onChangeText={(val) => setNewComment(val)}
              />
            </Input>
            <Button
              borderRadius="$full"
              onPress={postComment}
              disabled={newComment.length == 0}
            >
              <ButtonIcon as={SendHorizontal} />
            </Button>
          </HStack>

          {comments?.map((comment) => {
            return <Comment key={comment.comment_id} comment={comment} />;
          })}
        </BottomSheetView>
      </BottomSheet>
    </Box>
  );
};

export default PostSection;

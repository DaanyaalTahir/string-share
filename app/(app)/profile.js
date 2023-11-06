import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  Center,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Badge,
  BadgeText,
  HStack,
  Box,
  Textarea,
  TextareaInput,
  InputSlot,
  InputIcon,
  VStack,
  Image,
  Avatar,
  AvatarFallbackText,
  Divider,
} from "@gluestack-ui/themed";
import PostSection from "../../components/PostSection";
const profile = () => {
  const local = useLocalSearchParams();
  const username = local.username;

  const [userInfo, setUserInfo] = useState({
    avatar: undefined,
    bio: "Hi im batman",
    followerCount: 24,
    followingCount: 12,
    username: "Batman@wayne_industries",
    fullName: "Bruce Wayne",
    posts: [
      {
        postId: "9c5b94b1-35ad-49bb-b118-8e8fc24abf8",
        username: "Batman@wayne_industries",
        fullName: "Bruce Wayne",
        post: "Hi my name is bruce wayne and this is my first post on StringShare!!!",
        avatar: undefined,
        likes: 10,
        replies: 7,
        datePosted: new Date().toISOString(),
        location: {
          latitude: "43.12312",
          longitude: "-79.123123",
        },
      },
    ],
  });

  useEffect(() => {}, [username]);

  return (
    <Box>
      <Stack.Screen options={{ headerTitle: "Profile" }} />

      <HStack
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          marginTop: 40,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <VStack>
          <Heading size="xl">{userInfo.fullName}</Heading>
          <Text>{userInfo.username}</Text>
        </VStack>
        <Avatar bgColor="$primary600" size="xl" borderRadius="$full">
          <AvatarFallbackText>{userInfo.username}</AvatarFallbackText>
        </Avatar>
      </HStack>

      <VStack>
        <Heading size="lg" marginLeft={10}>
          Posts
        </Heading>
        <PostSection posts={userInfo.posts} />
      </VStack>
    </Box>
  );
};

export default profile;

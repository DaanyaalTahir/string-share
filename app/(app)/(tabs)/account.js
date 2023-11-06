import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useSession } from "../../../utils/ctx";
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
import PostSection from "../../../components/PostSection";

const account = () => {
  const { signOut } = useSession();
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

  // useEffect(() => {
  //   // Fetch the user data using the username

  //   return () => {};
  // }, []);

  return (
    <Box>
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

      <HStack space="md" marginBottom={40} marginLeft={10} marginRight={10}>
        <Button variant="outline" action="primary" flex={1}>
          <ButtonText>Edit Profile</ButtonText>
        </Button>
        <Button
          variant="outline"
          action="negative"
          flex={1}
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}
        >
          <ButtonText>Sign Out</ButtonText>
        </Button>
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

export default account;

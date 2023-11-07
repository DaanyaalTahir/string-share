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
import api from "../../utils/api";

const profile = () => {
  const local = useLocalSearchParams();
  const username = local.username;

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    api
      .get(`/client/users?username=${username}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <>
      {userInfo && (
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
              <Heading size="xl">{userInfo.full_name}</Heading>
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
      )}
    </>
  );
};

export default profile;

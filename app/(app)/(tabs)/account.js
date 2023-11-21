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
import api from "../../../utils/api";
const account = () => {
  const { signOut } = useSession();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    api
      .get(`/client/me`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
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
            <Heading size="xl">{userInfo?.full_name}</Heading>
            <Text>{userInfo?.username}</Text>
          </VStack>
          <Avatar bgColor="$primary600" size="xl" borderRadius="$full">
            <AvatarFallbackText>{userInfo?.username}</AvatarFallbackText>
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
          {userInfo && <PostSection posts={userInfo?.posts} />}
        </VStack>
      </Box>
    </>
  );
};

export default account;

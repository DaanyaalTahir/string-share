import React from "react";
import {
  Text,
  HStack,
  Box,
  Avatar,
  AvatarFallbackText,
  VStack,
  Divider,
  Heading,
  AvatarImage,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { ENDPOINT } from "../globals";

const Comment = ({ comment }) => {
  return (
    <Box>
      <HStack style={{ marginTop: 20, marginBottom: 20 }} space="md">
        <Box>
          <Avatar bgColor="$primary600" size="md" borderRadius="$full">
            <AvatarFallbackText>{comment.username}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: `${ENDPOINT}/client/media/?url=${comment.avatar_url}`,
              }}
            />
          </Avatar>
        </Box>
        <HStack style={{ flex: 1 }}>
          <VStack>
            <Heading
              size="xs"
              onPress={() =>
                router.push(`/profile?username=${comment.username}`)
              }
            >
              {comment.username}
            </Heading>
            <Text>{comment.content}</Text>
          </VStack>
        </HStack>
      </HStack>
      <Divider my="$0.5" />
    </Box>
  );
};

export default Comment;

import React, { useState } from "react";
import {
  Text,
  Input,
  InputSlot,
  InputIcon,
  InputField,
  HStack,
  Box,
  Avatar,
  AvatarFallbackText,
  VStack,
  Button,
  ButtonText,
  Divider,
  Heading,
} from "@gluestack-ui/themed";
import { router } from "expo-router";

const Comment = ({ comment }) => {
  return (
    <Box>
      <HStack style={{ marginTop: 20, marginBottom: 20 }} space="md">
        <Box>
          <Avatar bgColor="$primary600" size="md" borderRadius="$full">
            <AvatarFallbackText>{comment.username}</AvatarFallbackText>
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
            <Text>{comment.comment}</Text>
          </VStack>
        </HStack>
      </HStack>
      <Divider my="$0.5" />
    </Box>
  );
};

export default Comment;

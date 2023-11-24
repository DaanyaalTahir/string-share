import React from "react";
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
  AvatarImage,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { ENDPOINT } from "../globals";

const ActivityCard = ({ actionUser, action, postId, avatarUrl }) => {
  const message = {
    like: "Liked your post",
    comment: "Commented on your post",
    follow: "Followed you",
  };

  return (
    <Box>
      <Box>
        <HStack space="md">
          <Box>
            <Avatar bgColor="$primary600" size="sm" borderRadius="$full">
              <AvatarFallbackText>{actionUser}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: `${ENDPOINT}/client/media/?url=${avatarUrl}`,
                }}
              />
            </Avatar>
          </Box>
          <HStack style={{ flex: 1 }}>
            <VStack style={{ flex: 1 }}>
              <Heading
                size="xs"
                onPress={() => router.push(`/profile?username=${actionUser}`)}
              >
                {actionUser}
              </Heading>
              <Text>{message[action]}</Text>
              <Divider my="$0.5" marginTop={20} marginBottom={20} />
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default ActivityCard;

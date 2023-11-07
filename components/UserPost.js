import {
  Box,
  Text,
  Avatar,
  AvatarFallbackText,
  HStack,
  VStack,
  Heading,
  Button,
  ButtonIcon,
  Divider,
  Link,
  ButtonText,
  LinkText,
} from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react-native";
import { reverseGeocodeAsync } from "expo-location";
import { router } from "expo-router";
import api from "../utils/api";
const UserPost = ({ post, openBottomSheet, setComments }) => {
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    if (post.location) {
      const reverseGeocode = async () => {
        const reverseGeocodedAddress = await reverseGeocodeAsync({
          latitude: parseFloat(post.location.latitude),
          longitude: parseFloat(post.location.longitude),
        });
        const { streetNumber, street, city, region, postalCode } =
          reverseGeocodedAddress[0];
        setCurrentAddress(`${city}, ${region}`);
      };

      reverseGeocode();
    }
  }, []);

  const displayComments = () => {
    api
      .get(`/client/comments?post_id=${post.post_id}`)
      .then((res) => {
        openBottomSheet(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      <HStack
        style={{
          paddingTop: 40,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 20,
        }}
        space="md"
      >
        <Box>
          <Avatar bgColor="$primary600" size="md" borderRadius="$full">
            <AvatarFallbackText>{post.username}</AvatarFallbackText>
          </Avatar>
        </Box>

        <Box width="$full" style={{ flex: 1 }}>
          <VStack width="$full">
            <Heading
              size="xs"
              onPress={() => router.push(`/profile?username=${post.username}`)}
            >
              {post.username}
            </Heading>
            <Text>{post.content}</Text>
            <HStack space="md">
              <Button variant="link">
                <ButtonIcon as={Heart} color="$primary300" size="xl" />
              </Button>
              <Button variant="link" onPress={displayComments}>
                <ButtonIcon as={MessageCircle} color="$primary300" size="xl" />
              </Button>
            </HStack>
            <HStack>
              <Text size="sm" color="$secondary300">
                {post.comments} replies · {post.likes} likes
              </Text>
              {currentAddress && (
                <HStack>
                  <Text> · </Text>
                  <Link
                    style={{
                      alignItems: "flex-start",
                    }}
                    onPress={() => {
                      router.push(
                        `/map?lat=${post.location.latitude}&lng=${post.location.longitude}`
                      );
                    }}
                  >
                    <LinkText size="sm">{currentAddress}</LinkText>
                  </Link>
                </HStack>
              )}
            </HStack>
          </VStack>
        </Box>
      </HStack>
      <Divider my="$0.5" />
    </Box>
  );
};

export default UserPost;

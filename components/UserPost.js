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
  Image,
  LinkText,
  AvatarImage,
} from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react-native";
import { reverseGeocodeAsync } from "expo-location";
import { router } from "expo-router";
import api from "../utils/api";
import { ENDPOINT } from "../globals";

const UserPost = ({ post, openBottomSheet, setCurrentPost, updatePosts }) => {
  const likeColor = "$rose500";
  const unlikeColor = "$primary300";
  const [currentAddress, setCurrentAddress] = useState(null);
  const [heartColor, setHeartColor] = useState(
    post.liked ? likeColor : unlikeColor
  );
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    if (post) {
      const reverseGeocode = async () => {
        const reverseGeocodedAddress = await reverseGeocodeAsync({
          latitude: parseFloat(post.latitude),
          longitude: parseFloat(post.longitude),
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
        setCurrentPost(post);
      })
      .catch((err) => console.error(err));
  };

  const likePost = () => {
    console.log("hello");
    api
      .post(`/client/like?post_id=${post.post_id}`)
      .then((res) => {
        setHeartColor(post.liked ? unlikeColor : likeColor);
        const postCpy = { ...post, liked: !post.liked };
        updatePosts(postCpy);
        setLikes(postCpy.liked ? likes + 1 : likes - 1);
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
            <AvatarImage
              source={{
                uri: `${ENDPOINT}/client/media/?url=${post.avatar_url}`,
              }}
            />
          </Avatar>
        </Box>

        <Box width="$full" style={{ flex: 1 }}>
          <VStack width="$full">
            {post.image_url != null && (
              <Image
                source={`${ENDPOINT}/client/media/?url=${post.image_url}`}
                size="2xl"
                borderRadius="$md"
                alt="post_image"
                marginBottom={10}
                style={{
                  borderWidth: 1,
                  borderColor: "#737373",
                  backgroundColor: "#DADADA",
                }}
              />
            )}
            <Heading
              size="xs"
              onPress={() => router.push(`/profile?username=${post.username}`)}
            >
              {post.username}
            </Heading>
            <Text>{post.content}</Text>
            <HStack space="md">
              <Button variant="link" onPress={likePost}>
                <ButtonIcon as={Heart} color={heartColor} size="xl" />
              </Button>
              <Button variant="link" onPress={displayComments}>
                <ButtonIcon as={MessageCircle} color="$primary300" size="xl" />
              </Button>
            </HStack>
            <HStack>
              <Text size="sm" color="$secondary300">
                {post.comments} replies · {likes} likes
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
                        `/map?lat=${post.latitude}&lng=${post.longitude}`
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

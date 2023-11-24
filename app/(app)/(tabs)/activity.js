import React, { useState, useEffect } from "react";
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
  Text,
} from "@gluestack-ui/themed";
import ActivityCard from "../../../components/ActivityCard";
import { ScrollView } from "react-native";
import api from "../../../utils/api";

const activity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("/client/activity").then((res) => {
      setActivities(res.data);
    });
  }, []);

  return (
    <Box margin={20} height="100%">
      {activities.length > 0 ? (
        <ScrollView style={{ flex: 1 }}>
          {activities.map((activity, index) => {
            return (
              <ActivityCard
                key={`activity_${index}`}
                actionUser={activity.action_user}
                action={activity.action}
                postId={activity.post_id}
                avatarUrl={activity.avatar_url}
              />
            );
          })}
        </ScrollView>
      ) : (
        <Text>No Activities</Text>
      )}
    </Box>
  );
};

export default activity;

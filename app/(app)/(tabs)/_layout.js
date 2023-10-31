import React, { useEffect, useRef, useState } from "react";

import { Tabs } from "expo-router";
import {
  User2,
  Search,
  Home,
  PlusCircle,
  Heart,
  PenSquare,
} from "lucide-react-native";
import { ButtonIcon, Button, Box, Heading } from "@gluestack-ui/themed";

export default () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "StringShare",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "Search",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          headerTitle: "Create a post",
          tabBarIcon: ({ color, size }) => (
            <PenSquare color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          headerTitle: "Activity",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: "Account",
          tabBarIcon: ({ color, size }) => <User2 color={color} size={size} />,
        }}
      />
    </Tabs>
  );
};

import { View } from "react-native";
import React, { useState, useEffect } from "react";
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
import { Search } from "lucide-react-native";
import { router } from "expo-router";
import api from "../../../utils/api";

const search = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get("/client/search?search_query=").then((res) => {
      setResults(res.data);
    });
  }, []);

  const searchUser = () => {
    api.get(`/client/search?search_query=${query}`).then((res) => {
      setResults(res.data);
    });
  };

  const followUser = (username) => {
    api.post(`/client/follow?username=${username}`).then(() => {
      const resultsCpy = [...results];
      setResults(
        resultsCpy.map((user) =>
          user.username === username ? { ...user, is_following: true } : user
        )
      );
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Input
        backgroundColor="white"
        borderRadius="$lg"
        style={{ marginBottom: 20 }}
      >
        <InputSlot pl="$3">
          <InputIcon as={Search} />
        </InputSlot>
        <InputField
          placeholder="Search..."
          onChangeText={(val) => setQuery(val)}
          value={query}
          onSubmitEditing={searchUser}
        />
      </Input>
      {results.map((result) => {
        return (
          <Box key={result.username}>
            <HStack style={{ marginTop: 20, marginBottom: 20 }} space="md">
              <Box>
                <Avatar bgColor="$primary600" size="md" borderRadius="$full">
                  <AvatarFallbackText>{result.username}</AvatarFallbackText>
                </Avatar>
              </Box>
              <HStack style={{ justifyContent: "space-between", flex: 1 }}>
                <VStack>
                  <Heading
                    size="xs"
                    onPress={() =>
                      router.push(`/profile?username=${result.username}`)
                    }
                  >
                    {result.username}
                  </Heading>
                  <Text>{result.full_name}</Text>
                </VStack>

                <Button
                  size="md"
                  variant="outline"
                  action={result.is_following ? "secondary" : "primary"}
                  onPress={() => followUser(result.username)}
                  disabled={result.is_following}
                >
                  <ButtonText>
                    {result.is_following ? "Following" : "Follow"}
                  </ButtonText>
                </Button>
              </HStack>
            </HStack>
            <Divider my="$0.5" />
          </Box>
        );
      })}
    </View>
  );
};

export default search;

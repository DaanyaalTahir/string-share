import { View } from "react-native";
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
import { Search } from "lucide-react-native";
const search = () => {
  const [results, setResults] = useState([
    {
      username: "Robin",
      fullName: "Robin Saliba",
      avatar: undefined,
    },
    {
      username: "Mass",
      fullName: "Mass Wayne",
      avatar: undefined,
    },
    {
      username: "Lybia",
      fullName: "Lyba George",
      avatar: undefined,
    },
    {
      username: "Hima",
      fullName: "Hima ",
      avatar: undefined,
    },
  ]);

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
        <InputField placeholder="Search..." />
      </Input>
      {results.map((result) => {
        return (
          <Box>
            <HStack style={{ marginTop: 20, marginBottom: 20 }} space="md">
              <Box>
                <Avatar bgColor="$primary600" size="md" borderRadius="$full">
                  <AvatarFallbackText>{result.username}</AvatarFallbackText>
                </Avatar>
              </Box>
              <HStack style={{ justifyContent: "space-between", flex: 1 }}>
                <VStack>
                  <Heading size="xs">{result.username}</Heading>
                  <Text>{result.fullName}</Text>
                </VStack>

                <Button size="md" variant="outline" action="primary">
                  <ButtonText>Follow</ButtonText>
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

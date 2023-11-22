import React, { useState, useCallback, useRef } from "react";
import {
  Center,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Link,
  LinkText,
  Text,
  HStack,
  Box,
} from "@gluestack-ui/themed";
import { LogIn } from "lucide-react-native";
import { useSession } from "../utils/ctx";
import globalStyles from "../styles/globalStyles";
import { router } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import api from "../utils/api";
import axios from "axios";
import { ENDPOINT } from "../globals";
const register = () => {
  const { signIn } = useSession();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const onRegister = () => {
    const postData = {
      username,
      full_name: fullName,
      password,
    };

    // URL where you want to send the POST request
    const url = `${ENDPOINT}/client/signup`; // Replace with your API endpoint

    // Sending POST request with Axios
    axios
      .post(url, JSON.stringify(postData), {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        router.push("/sign-in");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Center style={globalStyles.formContainer}>
      <Heading size="4xl" bold={true} style={{ marginBottom: 20 }}>
        StringShare
      </Heading>
      <Input
        variant="rounded"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={globalStyles.formInput}
      >
        <InputField
          placeholder="Full Name"
          value={fullName}
          onChangeText={(val) => setFullName(val)}
        />
      </Input>
      <Input
        variant="rounded"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={globalStyles.formInput}
      >
        <InputField
          placeholder="Username"
          value={username}
          onChangeText={(val) => setUsername(val)}
        />
      </Input>
      <Input
        variant="rounded"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={globalStyles.formInput}
      >
        <InputField
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
      </Input>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        borderRadius="$full"
        onPress={onRegister}
      >
        <ButtonText>Register </ButtonText>
      </Button>
      <HStack marginTop={20} marginBottom={20}>
        <Text>Already have an account? </Text>

        <Link onPress={() => router.push("/sign-in")}>
          <LinkText>Sign In</LinkText>
        </Link>
      </HStack>
      <YoutubePlayer
        height={300}
        flex={1}
        width="100%"
        play={playing}
        videoId={"vPlWDFtP0T0"}
        onChangeState={onStateChange}
      />
    </Center>
  );
};

export default register;

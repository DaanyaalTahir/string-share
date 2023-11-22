import { useState, useEffect } from "react";
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
} from "@gluestack-ui/themed";
import { LogIn } from "lucide-react-native";
import { useSession } from "../utils/ctx";
import globalStyles from "../styles/globalStyles";
import { router } from "expo-router";

export default function SignIn() {
  const { signIn } = useSession();

  const [username, setUsername] = useState("lleece0");
  const [password, setPassword] = useState("lleece0");

  // useEffect(() => {
  //   router.replace("/");
  // }, []);

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
        onPress={() => {
          signIn(username, password);
        }}
      >
        <ButtonText>LogIn </ButtonText>
        <ButtonIcon as={LogIn} />
      </Button>
      <HStack marginTop={20}>
        <Text>Don't have an account? </Text>

        <Link onPress={() => router.push("/register")}>
          <LinkText>Register</LinkText>
        </Link>
      </HStack>
    </Center>
  );
}

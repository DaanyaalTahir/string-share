import { View, Text } from "react-native";
import React from "react";
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
} from "@gluestack-ui/themed";
import globalStyles from "../../../styles/globalStyles";
import { MapPin } from "lucide-react-native";

const post = () => {
  return (
    <Box style={globalStyles.formContainer}>
      <Textarea
        size="md"
        isReadOnly={false}
        isInvalid={false}
        isDisabled={false}
        style={globalStyles.formInput}
      >
        <TextareaInput placeholder="Your post goes here..." />
      </Textarea>
      <Input backgroundColor="white" style={globalStyles.formInput}>
        <InputSlot pl="$3">
          <InputIcon as={MapPin} />
        </InputSlot>
        <InputField placeholder="Location" />
      </Input>
      <Button
        size="md"
        width="$64"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        borderRadius="$full"
        onPress={() => {}}
      >
        <ButtonText>Create Post </ButtonText>
      </Button>
    </Box>
  );
};

export default post;

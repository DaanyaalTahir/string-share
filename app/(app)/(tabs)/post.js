import { View, Text } from "react-native";
import React, { useState } from "react";
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
} from "@gluestack-ui/themed";
import globalStyles from "../../../styles/globalStyles";
import { MapPin } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

const post = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
      <VStack
        style={{
          alignItems: "flex-start",
          width: "100%",
          marginBottom: 10,
        }}
        space="md"
      >
        <Button
          size="md"
          variant="outline"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={pickImage}
        >
          <ButtonText>Select Image</ButtonText>
        </Button>

        <Image
          size="xl"
          source={{
            uri: image,
          }}
          style={{
            borderWidth: 2,
            borderColor: "#737373",
            backgroundColor: "#DADADA",
          }}
          borderRadius="$sm"
          alt="post_img"
        />
      </VStack>

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

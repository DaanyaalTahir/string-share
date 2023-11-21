import { View, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
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
import * as FileSystem from "expo-file-system";
import api from "../../../utils/api";
import { Camera } from "expo-camera";
import { geocodeAsync } from "expo-location";
import { ENDPOINT } from "../../../globals";

const post = () => {
  let cameraRef = useRef();

  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(undefined);
  const [showCamera, setShowCamera] = useState(false);
  const [postText, setPostText] = useState("");
  const [postLocation, setPostLocation] = useState("");

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const takePicture = async () => {
    let options = {
      quality: 0.5,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setImage(newPhoto);
    setShowCamera(false);
  };

  const submitPost = async () => {
    try {
      const geocodedLocation = await geocodeAsync(postLocation);
      // const imageBlob = await FileSystem.readAsStringAsync(image, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });
      // const blob = new Blob([imageBlob], { type: "image/jpeg" });
      console.log(image);
      const fileUri = image.uri.replace("file://", "");
      let formData = new FormData();
      formData.append("post", postText);
      formData.append("latitude", geocodedLocation[0].latitude);
      formData.append("longitude", geocodedLocation[0].longitude);
      formData.append("photo", {
        type: "image/jpg",
        uri: fileUri,
        name: "image.jpg",
      });

      const response = await api.post(`/client/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response from the server
      console.log("Server response:", response.data);
    } catch (error) {
      // Handle any errors that occur during the POST request
      console.error("Error submitting post:", error);
    }
  };

  return (
    <>
      {showCamera ? (
        <Camera
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "flex-end",
            alignItems: "flex-end",
          }}
          ref={cameraRef}
        >
          <Button
            size="md"
            variant="outline"
            action="primary"
            onPress={takePicture}
          >
            <ButtonText>Take Picture</ButtonText>
          </Button>
        </Camera>
      ) : (
        <Box style={globalStyles.formContainer}>
          <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            style={globalStyles.formInput}
          >
            <TextareaInput
              placeholder="Your post goes here..."
              onChangeText={(val) => setPostText(val)}
              value={postText}
            />
          </Textarea>
          <Input backgroundColor="white" style={globalStyles.formInput}>
            <InputSlot pl="$3">
              <InputIcon as={MapPin} />
            </InputSlot>
            <InputField
              placeholder="Location"
              onChangeText={(val) => setPostLocation(val)}
              value={postLocation}
            />
          </Input>
          <VStack
            style={{
              alignItems: "flex-start",
              width: "100%",
              marginBottom: 10,
            }}
            space="md"
          >
            <HStack space="lg">
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
              {hasCameraPermission && (
                <Button
                  size="md"
                  variant="outline"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => setShowCamera(true)}
                >
                  <ButtonText>Take Picture</ButtonText>
                </Button>
              )}
            </HStack>

            <Image
              size="xl"
              source={{
                uri: image?.uri,
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
            onPress={submitPost}
          >
            <ButtonText>Create Post </ButtonText>
          </Button>
        </Box>
      )}
    </>
  );
};

export default post;

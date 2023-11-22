import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  HStack,
  Box,
  Textarea,
  TextareaInput,
  InputSlot,
  InputIcon,
  VStack,
  Image,
  ToastTitle,
  Toast,
  ToastDescription,
  useToast,
} from "@gluestack-ui/themed";
import globalStyles from "../../../styles/globalStyles";
import { MapPin, CameraIcon } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Camera } from "expo-camera";
import { geocodeAsync } from "expo-location";
import { ENDPOINT } from "../../../globals";
import { useSession } from "../../../utils/ctx";
import Empty from "../../../assets/empty.jpg";

const post = () => {
  let cameraRef = useRef();
  const toast = useToast();
  const { session } = useSession();

  const [image, setImage] = useState(Empty);
  const [hasCameraPermission, setHasCameraPermission] = useState(undefined);
  const [showCamera, setShowCamera] = useState(false);
  const [postText, setPostText] = useState("Test");
  const [postLocation, setPostLocation] = useState("Toronto, ON");
  const toastActions = {
    success: {
      actionType: "success",
      title: "Success!",
      description: "Your post was created successfully.",
    },
    error: {
      actionType: "error",
      title: "Error!",
      description:
        "There was an error processing your request. Please try again later.",
    },
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
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
      const { latitude, longitude } = geocodedLocation[0];
      const url = `${ENDPOINT}/client/post?post=${postText}&latitude=${latitude}&longitude=${longitude}`;
      await FileSystem.uploadAsync(url, image.uri, {
        fieldName: "photo",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      resetForm();

      showToast(toastActions.success);
    } catch (error) {
      console.error("Error submitting post:", error);
      showToast(toastActions.error);
    }
  };

  const resetForm = () => {
    setImage(Empty);
    setPostLocation("");
    setPostText("");
  };

  const showToast = (action) => {
    const { actionType, title, description } = action;
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        return (
          <Toast nativeID={"toast-" + id} action={actionType} variant="solid">
            <VStack space="xs">
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return (
    <>
      {showCamera ? (
        <Camera
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
          }}
          ref={cameraRef}
        >
          <Button
            action="primary"
            onPress={takePicture}
            borderRadius="$full"
            size="xl"
            marginBottom={20}
          >
            <ButtonIcon as={CameraIcon} />
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
              source={
                image.uri
                  ? {
                      uri: image.uri,
                    }
                  : image
              }
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

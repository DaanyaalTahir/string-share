import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { Linking } from "react-native";

const map = () => {
  const local = useLocalSearchParams();
  const latitude = parseFloat(local.lat);
  const longitude = parseFloat(local.lng);

  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    if (mapRef)
      mapRef.fitToCoordinates([
        {
          latitude: latitude,
          longitude: longitude,
        },
      ]);
  }, [mapRef]);
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerTitle: "Map" }} />

      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        ref={(ref) => {
          setMapRef(ref);
        }}
      >
        <Marker
          key={1}
          coordinate={{ latitude, longitude }}
          title="Cool pin"
          description="A description"
        >
          <Callout>
            <CalloutSubview
              onPress={() => {
                Linking.openURL(
                  `maps://0,0?q=Directions@${latitude},${longitude}`
                );
              }}
            >
              <Button variant="link">
                <ButtonText>Directions</ButtonText>
              </Button>
            </CalloutSubview>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default map;

import { View, Text } from "react-native";
import React from "react";
import { useSession } from "../../../utils/ctx";

const account = () => {
  const { signOut } = useSession();

  return (
    <View>
      <Text>account</Text>
      <View>
        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );
};

export default account;

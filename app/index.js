import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{ headerStyle: COLORS.lightWhite }} />
    </SafeAreaView>
  );
};

export default Home;

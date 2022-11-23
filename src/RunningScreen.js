import { Audio } from "expo-av";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RunningScreen({ onStop }) {
  const onButtonPressStop = function () {
    console.log("Stop");
    onStop();
  };

  return (
    <Pressable
      style={[styles.pressable, styles.pressableRed]}
      onPress={onButtonPressStop}
    >
      <Text style={styles.text}>Stop</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: "center",
    backgroundColor: "green",
    height: 50,
    justifyContent: "center",
    width: 150,
  },
  pressableRed: {
    backgroundColor: "red",
    marginTop: 10,
  },
});

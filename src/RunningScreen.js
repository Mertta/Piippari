import { Audio } from "expo-av";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RunningScreen({ timeLeft, onStop }) {
  function convertSecondsToHoursMinutesAndSeconds() {
    // Convert hh:mm:ss to string
    const time = new Date(timeLeft * 1000).toISOString().slice(11, 19);
    return time;
  }

  function onButtonPressStop() {
    console.log("onButtonPressStop");
    onStop();
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>
        {convertSecondsToHoursMinutesAndSeconds()}
      </Text>
      <Pressable
        style={[styles.pressable, styles.pressableRed]}
        onPress={onButtonPressStop}
      >
        <Text style={styles.text}>Stop</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "black",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  number: {
    alignItems: "center",
    backgroundColor: "pink",
    height: 50,
    justifyContent: "center",
    width: 150,
  },
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

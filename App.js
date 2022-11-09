import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function App() {
  const [hours, setHours] = React.useState("Hours");
  const [minutes, setMinutes] = React.useState("Minutes");
  const [seconds, setSeconds] = React.useState("Seconds");

  const onButtonPressStart = function () {
    console.log("Start-nappia painettu");
    // Calls toMilliseconds and saves the return value as delay
    const delay = toMilliseconds(hours, minutes, seconds);
    console.log("Millisekuntifunktiota kutsuttu");
    // Calls timer function
    timer.current = setInterval(signal, delay);
    console.log("Ajastin asetettu");
  };

  return (
    <View style={styles.container}>
      <TextInput
        defaultValue="Hours"
        onChangeText={(text) => setHours(text)}
        value={hours}
      />
      <TextInput
        defaultValue="Minutes"
        onChangeText={(text) => setMinutes(text)}
        value={minutes}
      />
      <TextInput
        defaultValue="Minutes"
        onChangeText={(text) => setSeconds(text)}
        value={seconds}
      />
      <Button title="Set Time" onPress={onButtonPress} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {},
  container: {
    alignItems: "center",
    backgroundColor: "pink",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "red",
    borderColor: "gray",
    borderWidth: 1,
  },
  timerInput: {
    alignItems: "center",
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
});

// Converts user input to milliseconds
function toMilliseconds(hours, minutes, seconds) {
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
}

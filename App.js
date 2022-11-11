import { audio } from "expo-av";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function App() {
  const [hours, setHours] = React.useState("Hours");
  const [minutes, setMinutes] = React.useState("Minutes");
  const [seconds, setSeconds] = React.useState("Seconds");

  // Luodaan timer-muuttuja
  const timer = React.useRef(); // Miksi tässä ei kannata käyttää let timeria (let timer;)?

  // Luodaan sound-muuttuja
  const sound = React.useRef();
  // Starts the timer
  const onButtonPressStart = function () {
    console.log("Start-nappia painettu");
    // Calls toMilliseconds and saves the return value as delay
    const delay = toMilliseconds(hours, minutes, seconds);
    console.log("Millisekuntifunktiota kutsuttu");
    // Calls timer function
    timer.current = setInterval(playSound, delay);
    console.log("Ajastin asetettu");
  };

  // Stops the timer
  const onButtonPressStop = function () {
    console.log("Ajastin pysäytetty");
    clearInterval(timer.current);
  };

  // Beeps
  /* const signal = function () {
    console.log("PIIP");
  };*/

  async function playSound() {
    console.log("Playing sound");
    await sound.playSound();
  }

  // Converts user input to milliseconds
  const toMilliseconds = function (hours, minutes, seconds) {
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerInput}>
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
      </View>
      <View style={styles.button}>
        <Button title="Start Timer" onPress={onButtonPressStart} />
        <Button title="Stop Timer" onPress={onButtonPressStop} />
      </View>
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

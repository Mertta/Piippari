import { Audio } from "expo-av";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import InputScreen from "./src/InputScreen";
import RunningScreen from "./src/RunningScreen";

export default function App() {
  const [sound, setSound] = React.useState();
  const [timer, setTimer] = React.useState(0);

  function onStart(delay) {
    // Create const for setInterval return value
    const timerReference = setInterval(playSound, delay);
    // Set the const above as the state of the timer
    setTimer(timerReference);
  }

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/beep.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function onStop() {
    console.log("Timer pysäytetty");
    clearInterval(timer);
    setTimer(0);
  }

  // If timer is running i. e. setInterval return value is NOT 0
  if (timer !== 0) {
    console.log("Timer on käynnissä");
    return <RunningScreen onStop={onStop} />;
  }
  // If timer is not running i. e. setInterval return value is 0
  else if (timer === 0) {
    console.log("Timer ei ole käynnissä");
    return <InputScreen onStart={onStart} />;
  } else {
    return console.log("Something went wrong");
  }
}

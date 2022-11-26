import { Audio } from "expo-av";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import InputScreen from "./src/InputScreen";
import RunningScreen from "./src/RunningScreen";

export default function App() {
  const [sound, setSound] = React.useState();
  const [timer, setTimer] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(0);
  // useState ottaa vastaan joko uuden arvon tai funktion. Jos useState huomaa, että kyseessä on funktio, se antaa nykyisen arvon funktiolle argumentiksi. Funktiota käytetään uuden arvon asettamiseen.

  function onStart(delay) {
    // Set delay as timeLeft
    setTimeLeft(delay);
    // Create const for setInterval return value
    const timerReference = setInterval(() => onTick(delay), 1000); // setIntervalille pitää antaa funktio ja numero
    // setInterval(onTick(delay), 1000) --> Tämä ei riitä, koska nyt setInterval saa onTick-funktion paluuarvon (numero) ja numeron
    // setInterval(onTick, 1000) --> Tämä riittäisi - setIntervalille, mutta myöhemmin tulisi ongelmia
    // Set the const above as the state of the timer
    setTimer(timerReference);
  }

  // Reduce timeLeft on every second
  function onTick(delay) {
    setTimeLeft((timeLeftCurrently) => {
      if (timeLeftCurrently === 1) {
        playSound();
        return delay;
      }
      return timeLeftCurrently - 1;
    });
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
    return <RunningScreen timeLeft={timeLeft} onStop={onStop} />;
  }
  // If timer is not running i. e. setInterval return value is 0
  else if (timer === 0) {
    return <InputScreen onStart={onStart} />;
  } else {
    return;
  }
}

import { Audio } from "expo-av";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import InputScreen from "./src/InputScreen";
import RunningScreen from "./src/RunningScreen";

export default function App() {
  const [hours, setHours] = React.useState("00");
  const [minutes, setMinutes] = React.useState("00");
  const [seconds, setSeconds] = React.useState("05");
  const timer = React.useRef();
  const [sound, setSound] = React.useState();
  const minutesRef = React.useRef();
  const secondsRef = React.useRef();

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
  };

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

const styles = StyleSheet.create({
  pressable: {
    alignItems: "center",
    backgroundColor: "green",
    height: 50,
    justifyContent: "center",
    width: 150,
  },
  pressableGreen: {
    backgroundColor: "green",
    marginTop: 100,
  },
  pressableRed: {
    backgroundColor: "red",
    marginTop: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: "black",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontFamily: "Futura",
    fontSize: 28,
    textTransform: "uppercase",
  },
  textInput: {
    color: "white",
    fontSize: 44,
    fontFamily: "Futura",
  },
  timerInput: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

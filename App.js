import { Audio } from "expo-av";
import React from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onButtonPressStart = function () {
    console.log("Start-nappia painettu");
    const delay = toMilliseconds(hours, minutes, seconds);
    console.log("Millisekuntifunktiota kutsuttu");
    timer.current = setInterval(playSound, delay);
    console.log("Ajastin asetettu");
  };

  const onButtonPressStop = function () {
    console.log("Ajastin pysäytetty");
    clearInterval(timer.current);
  };

  const toMilliseconds = function (hours, minutes, seconds) {
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  };

  const onChangeHours = function (hoursInput) {
    if (Number(hoursInput) <= 23) {
      setHours(hoursInput);
    } else {
      minutesRef.current.focus();
      setMinutes(hoursInput[hoursInput.length - 1]);
    }
  };

  const onChangeMinutes = function (minutesInput) {
    if (Number(minutesInput) <= 59) {
      setMinutes(minutesInput);
    } else {
      secondsRef.current.focus();
      setSeconds(minutesInput[minutesInput.length - 1]);
    }
  };

  const onChangeSeconds = function (secondsInput) {
    if (Number(secondsInput) <= 59) {
      setSeconds(secondsInput);
    } else {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerInput}>
        <TextInput
          keyboardType="numeric"
          onChangeText={onChangeHours}
          onFocus={() => setHours("")}
          style={styles.textInput}
          value={hours}
        />
        <TextInput style={styles.textInput} defaultValue=":" />
        <TextInput
          keyboardType="numeric"
          onChangeText={onChangeMinutes}
          onFocus={() => setMinutes("")}
          ref={minutesRef}
          style={styles.textInput}
          value={minutes}
        />
        <TextInput style={styles.textInput} defaultValue=":" />
        <TextInput
          keyboardType="numeric"
          onChangeText={onChangeSeconds}
          onFocus={() => setSeconds("")}
          ref={secondsRef}
          style={styles.textInput}
          value={seconds}
        />
      </View>
      <Pressable
        style={[styles.pressable, styles.pressableGreen]}
        onPress={onButtonPressStart}
      >
        <Text style={styles.text}>Start</Text>
      </Pressable>
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

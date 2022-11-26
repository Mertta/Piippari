import { Audio } from "expo-av";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function InputScreen({ onStart }) {
  const [hours, setHours] = React.useState("00");
  const [minutes, setMinutes] = React.useState("00");
  const [seconds, setSeconds] = React.useState("05");
  const minutesRef = React.useRef();
  const secondsRef = React.useRef();

  function onButtonPressStart() {
    console.log("onButtonPressStart"); // Poista
    // Create const delay and call for toSeconds function
    const delay = toSeconds(hours, minutes, seconds);
    // Call onStart function in App.js
    onStart(delay);
  }

  // Convert to seconds
  function toSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
  }

  function onChangeHours(hoursInput) {
    if (Number(hoursInput) <= 23) {
      setHours(hoursInput);
    } else {
      minutesRef.current.focus();
      setMinutes(hoursInput[hoursInput.length - 1]);
    }
  }

  function onChangeMinutes(minutesInput) {
    if (Number(minutesInput) <= 59) {
      setMinutes(minutesInput);
    } else {
      secondsRef.current.focus();
      setSeconds(minutesInput[minutesInput.length - 1]);
    }
  }

  function onChangeSeconds(secondsInput) {
    if (Number(secondsInput) <= 59) {
      setSeconds(secondsInput);
    } else {
      return;
    }
  }

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
        <Text style={styles.textInput}>:</Text>
        {/* Change to Text*/}
        <TextInput
          keyboardType="numeric"
          onChangeText={onChangeMinutes}
          onFocus={() => setMinutes("")}
          ref={minutesRef}
          style={styles.textInput}
          value={minutes}
        />
        <Text style={styles.textInput}>:</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  pressableGreen: {
    backgroundColor: "green",
    marginTop: 100,
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

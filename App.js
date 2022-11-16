import { Audio } from "expo-av";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [hours, setHours] = React.useState("0");
  const [minutes, setMinutes] = React.useState("0");
  const [seconds, setSeconds] = React.useState("5");
  // Luodaan timer-muuttuja
  const timer = React.useRef(); // Miksi tässä ei kannata käyttää let timeria (let timer;)?
  // Luodaan sound state
  const [sound, setSound] = React.useState(); // Tämä on destrukturointia: useState() palauttaa listan, jonka ensimmäinen alkio on muuttuja (sound) ja toinen alkio on funktio joka muuttaa muuttujaa

  // Luodaan playSound funktio
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

  // Converts user input to milliseconds
  const toMilliseconds = function (hours, minutes, seconds) {
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerInput}>
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => setHours(text)}
          onFocus={() => setHours("")}
          style={styles.textInput}
          value={hours}
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => setMinutes(text)}
          onFocus={() => setMinutes("")}
          style={styles.textInput}
          value={minutes}
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => setSeconds(text)}
          onFocus={() => setSeconds("")}
          style={styles.textInput}
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
    backgroundColor: "pink",
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
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
});

import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function App() {
  const [hours, setHours] = React.useState("Hours");
  const [minutes, setMinutes] = React.useState("Minutes");
  const [seconds, setSeconds] = React.useState("Seconds");
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

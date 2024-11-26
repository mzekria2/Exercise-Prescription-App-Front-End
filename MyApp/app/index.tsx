import { Stack } from "expo-router";
import { Link } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";

export default function RootStack() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Exercise App</Text>
      <Link href="/video/videos">
        <Text style={styles.videosButton}>Go to Videos</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  videosButton: {
    backgroundColor: "darkblue",
    color: "whitesmoke",
    padding: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

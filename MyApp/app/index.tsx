import { Link } from "expo-router";
import { View, Text, Dimensions, Button, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");
export default function RootStack() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Exercise App</Text>
      <Link
        href={{
          pathname: "/video/videos",
          params: { title: "Videos" },
        }}
      >
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
    marginTop: 20,
    width: 100,
    height: 80,
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

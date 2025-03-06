import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useKidMode } from "../context/KidModeContext"; 
import { LinearGradient } from "expo-linear-gradient"; 

const screenWidth = Dimensions.get("window").width;

const Progress: React.FC = () => {
  const { isKidMode } = useKidMode(); // Get Kid Mode state

  // Sample Data: Update based on user's progress
  const data = {
    labels: isKidMode
      ? ["🌞 Mon", "🚀 Tue", "🎨 Wed", "📚 Thu", "🎶 Fri", "🎮 Sat", "🌈 Sun"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [3, 3, 1, 4, 2, 5, 3], // Number of videos watched each day
      },
    ],
  };

  return (
    <LinearGradient
      colors={isKidMode ? ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb"] : ["#ffffff", "#ffffff"]}
      style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={isKidMode ? styles.kidTitle : styles.title}>
        {isKidMode ? "🎯 Your Amazing Progress! 🚀" : "Weekly Progress"}
      </Text>

      <BarChart
        data={data}
        width={screenWidth - 40} // Adjust width
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: isKidMode ? "#ffcc00" : "#fff",
          backgroundGradientTo: isKidMode ? "#ff6b6b" : "#fff",
          decimalPlaces: 0,
          color: () => (isKidMode ? "rgb(0,255,0)" : "rgb(255,0,0)"), 
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: isKidMode ? "14" : "12",
            fontWeight: isKidMode ? "bold" : "normal",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </LinearGradient>
  );
};

export default Progress;

const styles = {
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  kidTitle: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#ff4757",
    textShadowColor: "#ffcc00",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
};

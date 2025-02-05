import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const Progress: React.FC = () => {
  // Sample Data: Update based on user's progress
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [3, 3, 1, 4, 2, 5, 3], // Number of videos watched each day
      },
    ],
  };

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 10 }}>
        Weekly Progress
      </Text>
      <BarChart
        data={data}
        width={screenWidth - 20} // Adjust width
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red bars
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{ marginVertical: 8, borderRadius: 8 }}
      />
    </View>
  );
};

export default Progress;

import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useRouter } from "expo-router"; // Import useRouter for navigation

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const apiURLBackend = "http://localhost:3000"; // Replace with actual backend URL

const ProgressChart = () => {
  const router = useRouter(); // Get router for navigation

  interface ProgressItem {
    nameVideo: string;
    dateCompleted: string[];
  }

  const [progressData, setProgressData] = useState<ProgressItem[]>([]);

  useEffect(() => {
    const getProgress = async () => {
      try {
        const response = await fetch(`${apiURLBackend}/progress/progressData`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.status === 401 || response.status === 403) {
          console.warn("Token expired. Redirecting to sign-up...");
          router.replace("/sign-up"); // Redirect user to sign-up page
          return;
        }

        const progressDataResponse = await response.json();
        console.log("Fetched Progress Data:", progressDataResponse);
        setProgressData(progressDataResponse);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    getProgress();
  }, []);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const countsByDay = daysOfWeek.reduce(
    (acc, day) => ({ ...acc, [day]: 0 }),
    {}
  );

  progressData.forEach((item) => {
    if (item.dateCompleted && Array.isArray(item.dateCompleted)) {
      item.dateCompleted.forEach((date) => {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
          const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];
          countsByDay[dayOfWeek] += 1;
        }
      });
    }
  });

  console.log("Counts by Day:", countsByDay);

  const chartData = {
    labels: daysOfWeek,
    datasets: [
      { data: daysOfWeek.map((day) => countsByDay[day] ?? 0) }, // Ensures no undefined values
    ],
  };
  const maxYValue = Math.max(
    ...daysOfWeek.map((day) => countsByDay[day] || 0),
    2
  );

  console.log("Chart Data:", chartData); // Add this to debug

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Over Time</Text>
      <View>
        <BarChart
          showValuesOnTopOfBars={true}
          data={chartData}
          width={screenWidth * 0.8}
          yAxisSuffix=""
          height={screenHeight / 1.7}
          fromZero={true}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            fillShadowGradient: "#1E3A8A",
            fillShadowGradientOpacity: 1,
          }}
          showBarTops={false}
          withHorizontalLabels={true}
          yAxisInterval={1} // Ensure even spacing
          segments={maxYValue} // Force even y-axis divisions
        />
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Days of the Week
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0d47a1",
  },
});

export default ProgressChart;

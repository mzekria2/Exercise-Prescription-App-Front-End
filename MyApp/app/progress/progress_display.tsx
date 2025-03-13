import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useKidMode } from "../context/KidModeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import {
  startOfWeek,
  endOfWeek,
  subWeeks,
  isWithinInterval,
  parseISO,
} from "date-fns";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
// const apiURLBackend = "http://localhost:3000"; // Replace with actual backend URL
const apiURLBackend = "http://10.0.0.86:3000";

const ProgressChart = () => {
  const router = useRouter(); // Get router for navigation
  const { isKidMode } = useKidMode();

  interface ProgressItem {
    nameVideo: string;
    dateCompleted: string[];
  }

  const [progressData, setProgressData] = useState<ProgressItem[]>([]);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    getProgress();
  }, [weekOffset]);

  const getProgress = async () => {
    try {
      const response = await fetch(`${apiURLBackend}/progress/progressData`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.status === 401 || response.status === 403) {
        console.warn("Token expired. Redirecting to sign-up...");
        router.replace("/WelcomeScreen/Welcomescreen"); // Redirect user to sign-up page
        return;
      }

      const progressDataResponse = await response.json();
      setProgressData(progressDataResponse);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  const daysOfWeek = isKidMode
    ? ["🌞 Sun", "🚀 Mon", "🎨 Tue", "📚 Wed", "🎶 Thu", "🎮 Fri", "🌈 Sat"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //calculate current week range
  const today = new Date();
  const start = startOfWeek(subWeeks(today, weekOffset));
  const end = endOfWeek(subWeeks(today, weekOffset));

  const countsByDay = daysOfWeek.reduce(
    (acc, day) => ({ ...acc, [day]: 0 }),
    {}
  );

  progressData.forEach((item) => {
    if (item.dateCompleted && Array.isArray(item.dateCompleted)) {
      item.dateCompleted.forEach((date) => {
        const dateObj = parseISO(date);
        if (isWithinInterval(dateObj, { start, end })) {
          const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];
          countsByDay[dayOfWeek] += 1;
        }
      });
    }
  });

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

  return (
    <LinearGradient
      colors={
        isKidMode
          ? ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb"]
          : ["#ffffff", "#ffffff"]
      }
      style={styles.container}
    >
      <Text style={isKidMode ? styles.kidTitle : styles.title}>
        {isKidMode ? "🎯 Your Amazing Progress! 🚀" : "Progress Over Time"}
      </Text>
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
        <Text style={styles.titleDaysWeek}>Days of the Week</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
            <FontAwesomeIcon name="arrow-left" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.titleWeek}>
            Week of {start.toDateString()} - {end.toDateString()}
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (weekOffset > 0) {
                setWeekOffset(weekOffset - 1);
              }
            }}
            disabled={weekOffset === 0}
          >
            <FontAwesomeIcon
              name="arrow-right"
              size={16}
              color={weekOffset === 0 ? "gray" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  titleDaysWeek: {
    fontSize: 16,
    fontWeight: "bold",
    width: screenWidth * 0.8,
    textAlign: "center",
    marginTop: 20,
  },
  titleWeek: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0d47a1",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
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
});

export default ProgressChart;

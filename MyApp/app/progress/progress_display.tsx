import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useKidMode } from "../context/KidModeContext";
import { useRouter } from "expo-router";
import {
  startOfWeek,
  endOfWeek,
  subWeeks,
  isWithinInterval,
  parseISO,
} from "date-fns";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import { progressStyles, kidProgressStyles } from "./progress_display.styles";


const screenWidth = Dimensions.get("window").width;
const apiURLBackend = "https://exercisebackend.duckdns.org";

const ProgressChart = ({ isMini = false }) => {
  const router = useRouter();
  const { isKidMode } = useKidMode();
  const [progressData, setProgressData] = useState([]);
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
        router.replace("/WelcomeScreen/Welcomescreen");
        return;
      }

      const progressDataResponse = await response.json();
      setProgressData(progressDataResponse);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  // Use current week if mini, otherwise allow navigation
  const effectiveWeekOffset = isMini ? 0 : weekOffset;

  // Kid Mode: whimsical labels; normal mode: standard labels
  const daysOfWeek = isKidMode
    ? ["🌞Sun", "🚀Mon", "🎨Tue", "📚Wed", "🎶Thu", "🎮Fri", "🌈Sat"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const start = startOfWeek(subWeeks(today, effectiveWeekOffset));
  const end = endOfWeek(subWeeks(today, effectiveWeekOffset));

  // Initialize each day with zero
  const countsByDay = daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: 0 }), {});

  // Tally up completions for each day of the selected week
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

  // Prepare chart data
  const chartData = {
    labels: daysOfWeek,
    datasets: [{ data: daysOfWeek.map((day) => countsByDay[day] ?? 0) }],
  };

  // Determine max Y segments
  const maxYValue = Math.max(...Object.values(countsByDay), 2);

  // Use smaller dimensions if mini
  const chartWidth = isMini ? screenWidth * 0.85 : screenWidth * 0.9;
  const chartHeight = isMini ? 205 : 300;

  // Calculate total videos watched across all time
  const totalVideosWatched = progressData.reduce((acc, item) => {
    if (item.dateCompleted && Array.isArray(item.dateCompleted)) {
      return acc + item.dateCompleted.length;
    }
    return acc;
  }, 0);

  // Select appropriate styles based on Kid Mode
  const currentStyles = isKidMode ? kidProgressStyles : progressStyles;

  return (
    <View style={currentStyles.chartContainer}>
      <Text
        style={
          isKidMode
            ? currentStyles.kidTitle || currentStyles.chartTitle
            : currentStyles.chartTitle
        }
      >
        {isKidMode ? "🎯 Your Amazing Progress! 🚀" : "Progress Over Time"}
      </Text>

      <View style={currentStyles.chartCard}>
        <BarChart
          data={chartData}
          width={chartWidth}
          height={chartHeight}
          fromZero
          showValuesOnTopOfBars
          withHorizontalLabels
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            fillShadowGradient: "#1E3A8A",
            fillShadowGradientOpacity: 1,
            barRadius: 4,
            barPercentage: 0.6,
          }}
          segments={maxYValue}
          style={currentStyles.chartStyle}
        />
      </View>

      {/* Only show these controls/cards in non-mini mode */}
      {!isMini && (
        <>
          <Text style={currentStyles.daysLabel}>Days of the Week</Text>
          <View style={currentStyles.buttonContainer}>
            <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
              <FontAwesomeIcon name="arrow-left" size={16} color="#2C3E50" />
            </TouchableOpacity>

            <Text style={currentStyles.weekText}>
              {start.toDateString()} - {end.toDateString()}
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (weekOffset > 0) setWeekOffset(weekOffset - 1);
              }}
              disabled={weekOffset === 0}
            >
              <FontAwesomeIcon
                name="arrow-right"
                size={16}
                color={weekOffset === 0 ? "gray" : "#2C3E50"}
              />
            </TouchableOpacity>
          </View>

          {/* Two side-by-side cards for Streak and Videos Watched */}
          <View style={currentStyles.statsContainer}>
            <View style={currentStyles.statCard}>
              <Text style={currentStyles.statText}>
                Current Streak 🔥: {progressData.length} Days
              </Text>
            </View>

            <View style={currentStyles.statCard}>
              <Text style={currentStyles.statText}>
                Videos Watched 🎉: {totalVideosWatched}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ProgressChart;

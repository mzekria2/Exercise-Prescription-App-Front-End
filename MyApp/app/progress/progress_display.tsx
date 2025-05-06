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
import { progressStyles } from "./progress_display.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PROGRESS_KEY = "videoProgress";

const screenWidth = Dimensions.get("window").width;
// const backendUrl = "https://exercisebackend.duckdns.org";
const backendUrl = "http://10.0.0.86:3000";

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
      const raw = await AsyncStorage.getItem(PROGRESS_KEY);
      const store: Record<string, any>[] = JSON.parse(raw || "[]");

      //Convert store into the shape you need for the chart:
      const progressData = Object.entries(store).map(([videoId, dates]) => ({
        videoId,
        dateCompleted: dates,
      }));
      setProgressData(progressData);
    } catch (error) {
      console.error("Error loading local progress:", error);
    }
  };

  // Use current week if mini, otherwise allow navigation
  const effectiveWeekOffset = isMini ? 0 : weekOffset;

  // Kid Mode: whimsical labels; normal mode: standard labels
  const daysOfWeek = isKidMode
    ? ["🌞 Sun", "🚀 Mon", "🎨 Tue", "📚 Wed", "🎶 Thu", "🎮 Fri", "🌈 Sat"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const start = startOfWeek(subWeeks(today, effectiveWeekOffset));
  const end = endOfWeek(subWeeks(today, effectiveWeekOffset));

  // Initialize each day with zero
  const countsByDay = daysOfWeek.reduce(
    (acc, day) => ({ ...acc, [day]: 0 }),
    {}
  );

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
  const chartHeight = isMini ? 180 : 300;

  // Calculate total videos watched across all time
  const totalVideosWatched = progressData.reduce((acc, item) => {
    if (item.dateCompleted && Array.isArray(item.dateCompleted)) {
      return acc + item.dateCompleted.length;
    }
    return acc;
  }, 0);

  return (
    <View style={progressStyles.chartContainer}>
      <Text
        style={isKidMode ? progressStyles.kidTitle : progressStyles.chartTitle}
      >
        {isKidMode ? "🎯 Your Amazing Progress! 🚀" : "Progress Over Time"}
      </Text>

      <View style={progressStyles.chartCard}>
        <BarChart
          data={chartData}
          width={chartWidth}
          height={chartHeight}
          fromZero={true}
          showValuesOnTopOfBars={false}
          withHorizontalLabels={true}
          yAxisLabel=""
          segments={maxYValue}
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
          showBarTops={false}
          yAxisInterval={1} // Ensure even spacing
          style={progressStyles.chartStyle}
        />
      </View>

      {/* Only show these controls/cards in non-mini mode */}
      {!isMini && (
        <>
          <Text style={progressStyles.daysLabel}>Days of the Week</Text>
          <View style={progressStyles.buttonContainer}>
            <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
              <FontAwesomeIcon name="arrow-left" size={16} color="#2C3E50" />
            </TouchableOpacity>

            <Text style={progressStyles.weekText}>
              {start.toDateString()} - {end.toDateString()}
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
                color={weekOffset === 0 ? "gray" : "#2C3E50"}
              />
            </TouchableOpacity>
          </View>

          {/* Two side-by-side cards for Streak and Videos Watched */}
          <View style={progressStyles.statsContainer}>
            {/* Streak Card */}
            <View style={progressStyles.statCard}>
              <Text style={progressStyles.statText}>
                Current Streak 🔥: {progressData.length} Days
              </Text>
            </View>

            {/* Total Videos Watched Card */}
            <View style={progressStyles.statCard}>
              <Text style={progressStyles.statText}>
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

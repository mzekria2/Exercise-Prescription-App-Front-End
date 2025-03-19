import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const progressStyles = StyleSheet.create({
  chartContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
      },
  chartCard: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chartTitle: {
    fontFamily: "Georgia",
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 20,
    paddingTop:40
  },
  kidTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6b6b",
    textAlign: "center",
    marginBottom: 10,
  },
  chartStyle: {
    borderRadius: 15,
    paddingVertical: 10,
  },
  daysLabel: {
    fontSize: 16,
    color: "#2C3E50",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  weekText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  streakContainer: {
    marginTop: 20,
    padding: 15,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  streakText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    fontFamily: "Georgia",
    textAlign: "center",
  },
  fireEmoji: {
    fontSize: 24,
    marginVertical: 5,
  },
});

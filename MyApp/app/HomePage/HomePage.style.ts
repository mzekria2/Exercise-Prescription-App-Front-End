import { StyleSheet } from "react-native";

export const homePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center", // Centered the header content
  },
  kidModeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  // speechText: {
  //   backgroundColor: "#fff",
  //   padding: 10,
  //   borderRadius: 15,
  //   marginLeft: 10,
  //   elevation: 3, // subtle shadow (for Android)
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
  userInfo: {
    marginBottom: 10,
    alignItems: "center",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF0000", // Orange branding
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
  },
  kidSubtitle: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginBottom: 60,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10, // Add padding to maintain spacing
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center", // Centered content in card
  },
  cardFull: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20, // Adjusted padding to match other cards
    marginHorizontal: 10, // Add margin to be consistent
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#FF6F00",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F00",
    textAlign: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F9F9F9",
    paddingVertical: 12,
    elevation: 2,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "bold",
  },
  navTextActive: {
    fontSize: 14,
    color: "#FF6F00",
    fontWeight: "bold",
  },
  kidModeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff4757",
    textAlign: "center",
    textShadowColor: "#ffcc00",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

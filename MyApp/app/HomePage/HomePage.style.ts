import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const normalHomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 80,
    backgroundColor: "#F5F5F5",
  },
  header: {
    marginBottom: 30,
  },
  userInfo: {
    alignItems: "center",
  },
  greeting: {
    fontSize: 40,
    fontWeight: "700",
    color: "#2C3E50",
    textAlign: "center",
    fontFamily: "Georgia",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#34495E",
    textAlign: "center",
    fontFamily: "Georgia",
  },
  cardsContainer: {
    flex: 1,
    
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom:10,
    marginHorizontal: 10,
  },
  card: {
    flex: 0.8,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginHorizontal: 5,

  
  },
  cardFull: {
    flex: 0.8,
    backgroundColor: "#fff",
    padding: 25,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: "Georgia",
  },
  kidModeTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#5D6D7E",
    textAlign: "center",
    fontFamily: "Georgia",
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: "#2C3E50",
    borderRadius: 50,
    padding: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  toggleButtonText: {
    fontFamily: "Georgia",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#2C3E50",
    padding: 12,
    borderRadius: 50,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  logoutButtonText: {
    fontFamily: "Georgia",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  progressContainer: {
    top: 25,
    alignItems: "center",
    width: screenWidth * 0.9,
  },
  notificationsButton: {
    top: 15,
    backgroundColor: "#2C3E50",
    padding: 15,
    borderRadius: 50,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  notificationsButtonText: {
    fontFamily: "Georgia",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const kidModeHomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 60,
    backgroundColor: "#FCE4EC", // pastel background
  },
  header: {
    marginBottom: 20,
  },
  userInfo: {
    alignItems: "center",
  },
  greeting: {
    fontSize: 32,
    fontWeight: "700",
    color: "#E91E63", // playful pink
    textAlign: "center",
    fontFamily: "Georgia",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: "#AD1457", // darker pink
    textAlign: "center",
    fontFamily: "Georgia",
    marginBottom: 15,
  },
  cardsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 0,
    marginHorizontal: 10,
  },
  card: {
    flex: 0.48,
    backgroundColor: "#F8BBD0", // pastel pink
    padding: 7,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 10,
  },
  cardFull: {
    backgroundColor: "#C5E1A5", // pastel green
    padding: 20,
    paddingBottom: 15,
    marginTop: 10,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Georgia",
    color: "#fff",
  },
  kidModeTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#E91E63",
    textAlign: "center",
    fontFamily: "Georgia",
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: "#FFB300", // warm yellow
    padding: 12,
    borderRadius: 50,
    alignSelf: "flex-end", // Centered in Kid Mode
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  toggleButtonText: {
    fontFamily: "Georgia",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#F44336", // vivid friendly red
    padding: 12,
    borderRadius: 50,
    alignSelf: "flex-end", // Centered in Kid Mode
    marginBottom: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  logoutButtonText: {
    fontFamily: "Georgia",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressContainer: {
    alignItems: "center",
    width: screenWidth * 0.9,
  },
  notificationsButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  notificationsButtonText: {
    fontFamily: "Georgia",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { normalHomePageStyles, kidModeHomePageStyles };

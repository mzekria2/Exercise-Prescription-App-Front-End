import { StyleSheet } from "react-native";

export const homePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginTop:50,
    justifyContent: "center"
  },
  userInfo: {
    marginBottom: 10,
    alignItems: "center", 
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#004D40",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginTop: 5,
    textAlign: "center",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderWidth: 1,
    borderColor: "#FF6F00",
    alignItems: "center",
  },
  cardFull: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FF6F00",
    alignItems: "center",
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
});

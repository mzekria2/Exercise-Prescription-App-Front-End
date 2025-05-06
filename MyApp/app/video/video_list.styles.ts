import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  backButton: {
    marginBottom: 10,
    marginTop: 25,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: "Georgia",
    color: "#2C3E50",
  },
  heading: {
    fontSize: 26,
    fontFamily: "Georgia",
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 15,
  },
  kidHeading: {
    fontSize: 26,
    fontFamily: "Georgia",
    fontWeight: "bold",
    color: "#ff6b6b",
    textAlign: "center",
    marginBottom: 15,
  },
  videoContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#EAEAEA",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  kidCard: {
    backgroundColor: "#feca57",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Georgia",
    fontWeight: "bold",
    color: "#2C3E50",
  },
  kidCardTitle: {
    fontSize: 18,
    fontFamily: "Georgia",
    fontWeight: "bold",
    color: "#ff4757",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,

    width: 32,
    height: 32,
    borderRadius: 16,

    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center", // center the child (icon or Text)
    alignItems: "center",

    zIndex: 100,
    elevation: 100, // make sure on Android it floats above the card
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  kidModalContent: {
    backgroundColor: "#ff9ff3",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Georgia",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 15,
  },
  kidModalText: {
    fontSize: 18,
    fontFamily: "Georgia",
    color: "#ff4757",
    textAlign: "center",
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: "#2C3E50",
  },
  deleteConfirmButton: {
    backgroundColor: "#E74C3C",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import { StyleSheet, Dimensions } from "react-native";
import { DefaultTheme } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F5F5F5",
    text: "#2C3E50",
  },
};

export const styles = StyleSheet.create({
  container: {
    padding: 40,
    width: screenWidth,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  headerWrapper: {
    marginVertical: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Georgia",
    fontWeight: "700",
    color: "#2C3E50",
    marginTop: 20,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "Georgia",
    fontWeight: "600",
    marginVertical: 15,
    color: "#2C3E50",
  },
  daysContainer: {
    width: screenWidth * 0.98,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  dayButton: {
    width: screenWidth * 0.28,    // Each day card takes 28% of the screen width
    height: screenWidth * 0.28,   // Making it square
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 15,
    margin: 5,
    elevation: 3,
  },
  dayText: {
    marginRight: 7,
    fontSize: 15,
    fontFamily: "Georgia",
    color: "#2C3E50",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: "#2C3E50",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#2C3E50",
    justifyContent: "center",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    justifyContent: "center",
  },
  dayCard: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Georgia",
    marginBottom: 8,
    color: "#2C3E50",
  },
  label: {
    fontSize: 15,
    fontFamily: "Georgia",
    marginVertical: 4,
    color: "#2C3E50",
  },
  notificationCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
    marginVertical: 8,
  },
  countText: {
    fontSize: 18,
    fontFamily: "Georgia",
    marginHorizontal: 8,
    color: "#2C3E50",
  },
  countButton: {
    borderRadius: 20,
  },
  notificationInput: {
    marginVertical: 8,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  timeText: {
    fontSize: 16,
    fontFamily: "Georgia",
    color: "#2C3E50",
  },
  dropdownWrapper: {
    width: "100%",
    marginVertical: 8,
  },
  dropdown: {
    borderColor: "#ccc",
    fontFamily: "Georgia",
  },
  dropdownContainerUp: {
    position: "absolute",
    bottom: "100%",
    width: "100%",
    zIndex: 2000,
    elevation: 50,
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  dropdownItem: {
    zIndex: 3000,
  },
  textInput: {
    width: "100%",
    marginVertical: 8,
  },
  submitButton: {
    marginVertical: 8,
    width: "20%",
    borderRadius: 30,
    alignSelf: "flex-end",
  },
  backButton: {
    marginVertical: 16,
    width: "100%",
    borderRadius: 30,
  },

  
  footerContainer: {
    flexDirection: 'column',
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: 'center',            
    paddingHorizontal: 10,
    marginTop: 15,
    height: 300,                     
  },
  footerButton: {
    marginVertical: 6,              
    padding: 15,
    justifyContent: 'space-evenly',
    borderRadius: 30,
    backgroundColor: "#2C3E50",
  },
  footerButtonText: {
    fontFamily: "Georgia",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  confirmButton: {
    marginTop: 16,
  },
});

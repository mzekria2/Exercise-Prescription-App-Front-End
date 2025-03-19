import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const normalUploadVideoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#3949AB",
    fontFamily: "Georgia",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C3E50",
    fontFamily: "Georgia",
    marginBottom: 20,
    textAlign: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  card: {
    flex: 0.48,
    backgroundColor: "#3949AB",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Georgia",
    fontWeight: "bold",
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontFamily: "Georgia",
    color: "#2C3E50",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#B0C4DE",
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#F7F7F7",
    fontSize: 16,
    color: "#333",
    fontFamily: "Georgia",
  },
  button: {
    backgroundColor: "#3949AB",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Georgia",
    fontWeight: "bold",
  },
});

const kidModeUploadVideoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE7F6",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#7E57C2",
    fontFamily: "Georgia",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#7E57C2",
    fontFamily: "Georgia",
    marginBottom: 20,
    textAlign: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  card: {
    flex: 0.48,
    backgroundColor: "#3949AB",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Georgia",
    fontWeight: "bold",
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    fontFamily: "Georgia",
    color: "#7E57C2",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#B39DDB",
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#F3E5F5",
    fontSize: 16,
    color: "#2C3E50",
    fontFamily: "Georgia",
  },
  button: {
    backgroundColor: "#3949AB",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Georgia",
    fontWeight: "bold",
  },
});

export { normalUploadVideoStyles, kidModeUploadVideoStyles };

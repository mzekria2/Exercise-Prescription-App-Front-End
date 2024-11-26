import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
    padding: 10, // Add padding around the list
    backgroundColor: "red", // Optional, for better visibility
  },
  video: {
    width: "100%", // Take full width of the parent container
    height: "100%", // Set a fixed height
    borderRadius: 10, // Optional: Rounded corners
    marginBottom: 10, // Space between video and title
    backgroundColor: "white", // Optional, for better visibility
  },
  videoItem: {
    width: "100%", // Make sure the item takes full width
    height: "100%",
    marginBottom: 20, // Space between items
    backgroundColor: "purple", // Add background for better visibility
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20, // Add space between this item and the next video
    backgroundColor: "blue", // Optional, for better visibility
  },
  flatListContainer: {
    height: "100%",
    width: "100%",
    paddingBottom: 20, // Add space at the bottom
    paddingHorizontal: 16, // Add padding around the list
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 32,
    color: "#888",
  },
});

export default styles;

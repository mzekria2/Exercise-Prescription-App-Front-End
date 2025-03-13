import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { forgotPasswordStyles } from "../ForgotPassword/ForgotPassword.styles";

const ResetPassword = () => {
  // Manually extract query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token") || "";
  const email = urlParams.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //const backendUrl = "http://10.0.0.86:3000";
  const backendUrl = `http://localhost:3000`;

  const handleResetPassword = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!newPassword || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/api/auth/reset-password?token=${token}&email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password reset successfully!");
      } else {
        setErrorMessage(data.message || "Invalid or expired token.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <View style={forgotPasswordStyles.container}>
      <Text style={forgotPasswordStyles.title}>Reset Password</Text>
      {successMessage ? (
        <Text style={{ color: "green", marginBottom: 10 }}>
          {successMessage}
        </Text>
      ) : null}
      {errorMessage ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}
      <TextInput
        style={forgotPasswordStyles.input}
        placeholder="Enter New Password"
        secureTextEntry
        onChangeText={setNewPassword}
        value={newPassword}
      />
      <TextInput
        style={forgotPasswordStyles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <TouchableOpacity
        style={forgotPasswordStyles.button}
        onPress={handleResetPassword}
      >
        <Text style={{ color: "#fff" }}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;

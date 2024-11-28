import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const DeleteVideo = () => {
  const [videoList, setVideoList] = useState<{ [key: string]: any }[]>([]);
  const apiURLBackend = "http://localhost:3000/videos"; //for web
  //const apiURLBackend = "http://10.0.2.2:3000/videos"; //for android emulator

  return <></>;
};

export default DeleteVideo;

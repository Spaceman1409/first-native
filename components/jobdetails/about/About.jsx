import React from "react";
import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About The Job:</Text>
      <View style={styles.contextText}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  );
};

export default About;

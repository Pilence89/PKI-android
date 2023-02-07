import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

const LoadingScreen = () => (
  <View style={[styles.container, styles.horizontal,{ height: Dimensions.get("screen").height }]}>
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    zIndex:9999,
    backgroundColor: "transparent",
    opacity: 0.5
  },
  horizontal: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // padding: 10,
    marginBottom: 50
  },
});

export default LoadingScreen;
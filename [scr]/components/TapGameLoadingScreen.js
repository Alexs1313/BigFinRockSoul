import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

export default function TapGameLoadingScreen({ styles, loadingTextSize }) {
  return (
    <ImageBackground
      source={require('../assets/finImages/levelsBg.png')}
      style={styles.tapScreen}
    >
      <SafeAreaView style={styles.tapSafeArea}>
        <View style={styles.tapLoadingBox}>
          <Text
            style={[styles.tapLoadingLabel, { fontSize: loadingTextSize }]}
          >
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

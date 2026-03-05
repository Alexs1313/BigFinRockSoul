import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

export default function TapGameLoadingScreen({ styles }) {
  return (
    <ImageBackground
      source={require('../assets/finImages/levelsBg.png')}
      style={styles.tapScreen}
    >
      <SafeAreaView style={styles.tapSafeArea}>
        <View style={styles.tapLoadingBox}>
          <Text style={styles.tapLoadingLabel}>
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

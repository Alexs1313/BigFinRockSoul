import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../biggyslcomponts/ScreenHeader';

export default function BigFinCriticLevelsScreen() {
  const navigation = useNavigation();

  const scrollPadTop = Platform.OS === 'android' ? 70 : 0;

  return (
    <ImageBackground
      source={require('../assets/finImages/biggyfinmoinlvlsbg.png')}
      style={styles.bgcnt}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SafeAreaView style={[styles.safe, { paddingTop: scrollPadTop }]}>
          <ScreenHeader
            title="Inner Critic Test"
            onBack={() => navigation.goBack()}
          />

          <View style={styles.content}>
            <Image
              source={require('../assets/finImages/biggyfinmoinnerlbl.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />

            <Text style={styles.descText}>
              You will see different everyday situations.{'\n'}
              Choose the response that feels closest to you.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('BigFinCriticTestScreen', { level: 1 })
              }
            >
              <ImageBackground
                source={require('../assets/finImages/biggyfinmoinbtn.png')}
                style={styles.startButton}
              >
                <Text style={styles.startButtonText}>Start Test</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgcnt: { flex: 1 },
  safe: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  heroImage: {
    width: 290,
    height: 320,
    marginTop: 12,
  },
  descText: {
    marginTop: 6,
    textAlign: 'center',
    color: '#C7E7FF',
    fontSize: 22,
    fontWeight: '700',
    textShadowColor: 'rgba(16, 6, 61, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  startButton: {
    marginTop: 34,
    width: 216,
    height: 65,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  startButtonText: {
    color: '#3D2606',
    fontSize: 22,
    fontWeight: '900',
  },
});

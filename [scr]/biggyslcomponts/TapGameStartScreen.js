import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import ScreenHeader from './ScreenHeader';
import LinearGradient from 'react-native-linear-gradient';
import { partyZoneAssets } from '../biggysouldt/partyZoneAssets';

export default function TapGameStartScreen({
  styles,
  navigation,
  wallet,
  onBeginRun,
}) {
  return (
    <ImageBackground
      source={partyZoneAssets.danceBg}
      style={styles.tapScreen}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.tapSafeArea}>
        <View style={styles.tapHeaderShell}>
          <ScreenHeader title="Tap" onBack={() => navigation.goBack()} />
          <ImageBackground
            style={[styles.tapPointsBadge, styles.tapPointsBadgePosition]}
            source={partyZoneAssets.topBadge}
          >
            <Image
              source={partyZoneAssets.flamIcon}
              style={styles.tapPointsFlamIcon}
            />
            <Text style={styles.tapPointsValue}>{wallet}</Text>
          </ImageBackground>
        </View>

        <View style={styles.tapContentCenter}>
          <Image
            source={require('../assets/finImages/biggyfinttapf.png')}
            resizeMode="contain"
          />
          <View style={styles.tapIntroTextBlock}>
            <Text
              style={{
                color: '#F9F7F8',
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 20,
                textAlign: 'center',
              }}
            >
              Tap as fast as you can. Let’s see how many flamingos you can
              collect.
            </Text>
          </View>

          <TouchableOpacity onPress={onBeginRun} activeOpacity={0.7}>
            <LinearGradient
              colors={['#610EAC', '#C83DD7']}
              style={styles.tapPrimaryButton}
            >
              <Text style={styles.tapPrimaryButtonLabel}>START</Text>
              <Image
                source={require('../assets/finImages/buttonStars.png')}
                style={styles.tapButtonStars}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.tapGlowDot} />
      </SafeAreaView>
    </ImageBackground>
  );
}

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

export default function TapGameStartScreen({
  styles,
  sizes,
  navigation,
  wallet,
  available,
  cooldownLeftMs,
  onBeginRun,
  formatCooldown,
}) {
  const {
    walletBadgeW,
    walletBadgeH,
    walletTextSize,
    primaryBtnW,
    primaryBtnH,
    primaryBtnRadius,
    primaryBtnTextSize,
    hintTextSize,
    cooldownLabelSize,
    cooldownTextSize,
  } = sizes;

  return (
    <ImageBackground
      source={require('../assets/finImages/levelsBg.png')}
      style={styles.tapScreen}
    >
      <SafeAreaView style={styles.tapSafeArea}>
        <ScreenHeader title="Tap" onBack={() => navigation.goBack()} />

        <ImageBackground
          style={[
            styles.tapPointsBadge,
            { width: walletBadgeW, height: walletBadgeH },
          ]}
          source={require('../assets/finImages/topQ.png')}
        >
          <Text style={[styles.tapPointsValue, { fontSize: walletTextSize }]}>
            {wallet}
          </Text>
        </ImageBackground>

        <View style={styles.tapContentCenter}>
          {available ? (
            <>
              <Text style={[styles.tapHintText, { fontSize: hintTextSize }]}>
                30 seconds. Show your tapping power!
              </Text>
              <TouchableOpacity onPress={onBeginRun} activeOpacity={0.7}>
                <LinearGradient
                  colors={['#3B43CB', '#944DD4', '#D058D0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.tapPrimaryButton,
                    {
                      width: primaryBtnW,
                      height: primaryBtnH,
                      borderRadius: primaryBtnRadius,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { fontSize: primaryBtnTextSize, color: '#fff' },
                    ]}
                  >
                    START
                  </Text>
                  <Image
                    source={require('../assets/finImages/buttonStars.png')}
                    style={{ position: 'absolute', right: 10, bottom: 5 }}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text
                style={[
                  styles.tapCooldownLabel,
                  { fontSize: cooldownLabelSize },
                ]}
              >
                Next game available in:
              </Text>
              <LinearGradient
                colors={['rgba(128, 90, 213, 0.6)', 'rgba(138, 43, 226, 0.5)']}
                style={[
                  styles.tapPrimaryButton,
                  {
                    width: primaryBtnW,
                    height: primaryBtnH,
                    borderRadius: primaryBtnRadius,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tapCooldownValue,
                    { fontSize: cooldownTextSize },
                  ]}
                >
                  {formatCooldown(cooldownLeftMs)}
                </Text>
                <Image
                  source={require('../assets/finImages/buttonStars.png')}
                  style={{ position: 'absolute', right: 10, bottom: 5 }}
                />
              </LinearGradient>
            </>
          )}
        </View>
        <View style={styles.tapGlowDot} />
      </SafeAreaView>
    </ImageBackground>
  );
}

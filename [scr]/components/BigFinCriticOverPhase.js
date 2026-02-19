import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text } from 'react-native';
import BigFinPrimaryButton from './BigFinPrimaryButton';
import { COLORS } from '../consts/uiConsts';

export default function BigFinCriticOverPhase({
  centerPadH,
  headlineSize,
  headlineMarginB,
  primaryBtnH,
  primaryBtnW,
  primaryBtnRadius,
  primaryTextSize,
  primaryBtnMarginV,
  onRetry,
  onShare,
  onExit,
}) {
  return (
    <ImageBackground
      source={require('../assets/finImages/loseBg.png')}
      style={styles.root}
    >
      <SafeAreaView style={[styles.center, { paddingHorizontal: centerPadH }]}>
        <Image source={require('../assets/finImages/gameOverText.png')} />
        <Text
          style={[
            styles.headline,
            {
              fontSize: headlineSize,
              marginBottom: headlineMarginB,
            },
          ]}
        >
          The music stopped...
        </Text>

        <BigFinPrimaryButton
          label="Retry Level"
          onPress={onRetry}
          height={primaryBtnH}
          width={primaryBtnW}
          borderRadius={primaryBtnRadius}
          fontSize={primaryTextSize}
          marginVertical={primaryBtnMarginV}
        />
        <BigFinPrimaryButton
          label="Share"
          onPress={onShare}
          height={primaryBtnH}
          width={primaryBtnW}
          borderRadius={primaryBtnRadius}
          fontSize={primaryTextSize}
          marginVertical={primaryBtnMarginV}
        />
        <BigFinPrimaryButton
          label="Exit"
          onPress={onExit}
          height={primaryBtnH}
          width={primaryBtnW}
          borderRadius={primaryBtnRadius}
          fontSize={primaryTextSize}
          marginVertical={primaryBtnMarginV}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    color: COLORS.titleYellow,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 14,
  },
});

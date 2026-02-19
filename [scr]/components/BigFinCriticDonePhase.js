import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import BigFinPrimaryButton from './BigFinPrimaryButton';
import { COLORS } from '../consts/uiConsts';

export default function BigFinCriticDonePhase({
  centerPadH,
  headlineSize,
  subSize,
  happyImgMarginV,
  primaryBtnH,
  primaryBtnW,
  primaryBtnRadius,
  primaryTextSize,
  primaryBtnMarginV,
  hasNext,
  onNextOrParty,
  onPartyZone,
  onShare,
  onExit,
}) {
  return (
    <ImageBackground
      source={require('../assets/finImages/doneBg.png')}
      style={styles.root}
    >
      <SafeAreaView style={[styles.center, { paddingHorizontal: centerPadH }]}>
        <Image source={require('../assets/finImages/doneText.png')} />
        <Text style={[styles.headline, { fontSize: headlineSize }]}>
          Someone just joined your party!
        </Text>

        <Text style={[styles.sub, { fontSize: subSize }]}>
          Looks like a new fish heard Big Fin’s voice{'\n'}
          and decided to join the party!
        </Text>

        <Image
          source={require('../assets/finImages/fin_happy.png')}
          style={[styles.happyImg, { marginVertical: happyImgMarginV }]}
        />

        <BigFinPrimaryButton
          label={hasNext ? 'Next level' : 'Party Zone'}
          onPress={onNextOrParty}
          height={primaryBtnH}
          width={primaryBtnW}
          borderRadius={primaryBtnRadius}
          fontSize={primaryTextSize}
          marginVertical={primaryBtnMarginV}
        />

        <BigFinPrimaryButton
          label="Party Zone"
          onPress={onPartyZone}
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
  sub: {
    color: '#FDE6D9',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  happyImg: {},
});

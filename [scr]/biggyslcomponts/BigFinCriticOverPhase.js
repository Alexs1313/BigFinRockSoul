import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import BigFinPrimaryButton from './BigFinPrimaryButton';
import { COLORS } from '../biggysoulcnsts/uiConsts';

export default function BigFinCriticOverPhase({ onRetry, onShare, onExit }) {
  return (
    <ImageBackground
      source={require('../assets/finImages/biggyfinmogameover.png')}
      style={styles.root}
    >
      <SafeAreaView style={styles.center}>
        <Image source={require('../assets/finImages/gameOverText.png')} />
        <Text style={[styles.headline, styles.headlineSpacing]}>
          The music stopped...
        </Text>

        <Image source={require('../assets/finImages/biggyfinmogameosad.png')} />

        <BigFinPrimaryButton label="Retry Level" onPress={onRetry} />
        <BigFinPrimaryButton label="Share" onPress={onShare} />
        <BigFinPrimaryButton label="Exit" onPress={onExit} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 18,
    color: COLORS.titleYellow,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 14,
  },
  headlineSpacing: { marginBottom: 60 },
});

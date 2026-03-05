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

export default function BigFinCriticDonePhase({
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
      <SafeAreaView style={styles.center}>
        <Image source={require('../assets/finImages/doneText.png')} />
        <Text style={styles.headline}>Nice choice!</Text>

        <Text style={styles.sub}>You handled that situation your way.</Text>

        <Image
          source={require('../assets/finImages/fin_happy.png')}
          style={styles.happyImg}
        />

        <BigFinPrimaryButton
          label={hasNext ? 'Next level' : 'Party Zone'}
          onPress={onNextOrParty}
        />

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
  sub: {
    fontSize: 16,
    color: '#FDE6D9',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  happyImg: { marginVertical: 20 },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';
import { useFinStore } from '../storage/bigFinCntxt';

const bigFinSafeNumber = n => (Number.isFinite(n) ? n : 0);

const bigFinTrackList = [
  '679359__vannipat__melody-loop-mix-128-bpm.mp3',
  '679359__vannipat__melody-loop-mix-128-bpm.mp3',
];

const asyncStorageKeys = {
  soundKey: 'toggleSound',
  totalScoreKey: 'flamingo_total_score',
};

const BigFinHomeScreen = () => {
  const navigation = useNavigation();
  const { height, pick, scrollBottom } = useAdaptiveSizes();

  const screenPadTop = height * 0.1;
  const scoreTextSize = pick(14, 16, 20);
  const scoreBadgeW = pick(110, 122, 132);
  const scoreBadgeH = pick(28, 32, 34);
  const menuGap = pick(4, 5, 6);
  const menuMarginTop = pick(14, 18, 20);
  const soundBtnMarginTop = pick(14, 18, 20);

  const [bigFinTrackIndex, setBigFinTrackIndex] = useState(0);
  const [bigFinSound, setBigFinSound] = useState(null);

  const { finSoundEnabled: bigFinSoundEnabled, setFinSoundEnabled } =
    useFinStore();

  const [bigFinTotalScore, setBigFinTotalScore] = useState(0);

  useFocusEffect(
    useCallback(() => {
      bigFinLoadSoundToggle();
      bigFinLoadTotalScore();
    }, []),
  );

  useEffect(() => {
    bigFinPlayMusic(bigFinTrackIndex);

    return () => {
      if (bigFinSound) {
        bigFinSound.stop(() => {
          bigFinSound.release();
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bigFinTrackIndex]);

  const bigFinLoadTotalScore = useCallback(async () => {
    try {
      const sv = await AsyncStorage.getItem(asyncStorageKeys.totalScoreKey);
      const parsed = sv ? parseInt(sv, 10) : 0;
      setBigFinTotalScore(bigFinSafeNumber(parsed));
    } catch (e) {
      console.log('loadTotalScore error:', e);
      setBigFinTotalScore(0);
    }
  }, []);

  const bigFinPlayMusic = trackIndex => {
    if (bigFinSound) {
      bigFinSound.stop(() => {
        bigFinSound.release();
      });
    }

    const trackName = bigFinTrackList[trackIndex];

    const nextSound = new Sound(trackName, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('Error', err);
        return;
      }

      nextSound.play(success => {
        if (success) {
          setBigFinTrackIndex(prev => (prev + 1) % bigFinTrackList.length);
        } else {
          console.log('Error');
        }
      });

      setBigFinSound(nextSound);
    });
  };

  useEffect(() => {
    const syncToggleFromStorage = async () => {
      try {
        const sv = await AsyncStorage.getItem(asyncStorageKeys.soundKey);
        const enabled = JSON.parse(sv);
        setFinSoundEnabled(enabled);
        if (bigFinSound) bigFinSound.setVolume(enabled ? 1 : 0);
      } catch (e) {
        console.error('mus error', e);
      }
    };

    syncToggleFromStorage();
  }, [bigFinSound, setFinSoundEnabled]);

  useEffect(() => {
    if (bigFinSound) bigFinSound.setVolume(bigFinSoundEnabled ? 1 : 0);
  }, [bigFinSoundEnabled, bigFinSound]);

  const bigFinLoadSoundToggle = async () => {
    try {
      const sv = await AsyncStorage.getItem(asyncStorageKeys.soundKey);
      const enabled = JSON.parse(sv);
      setFinSoundEnabled(enabled);
    } catch (e) {
      console.error('mus error', e);
    }
  };

  const bigFinToggleSound = async nextEnabled => {
    try {
      await AsyncStorage.setItem(
        asyncStorageKeys.soundKey,
        JSON.stringify(nextEnabled),
      );
      setFinSoundEnabled(nextEnabled);
    } catch (e) {
      console.log('sound failed', e);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/finImages/levelsBg.png')}
      style={stules.cont}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: scrollBottom }}
      >
        <View style={[stules.scrn, { paddingTop: screenPadTop }]}>
          <ImageBackground
            style={[
              stules.scoreBadge,
              { width: scoreBadgeW, height: scoreBadgeH },
            ]}
            source={require('../assets/finImages/topQ.png')}
          >
            <Text style={[stules.scrTxt, { fontSize: scoreTextSize }]}>
              {bigFinTotalScore}
            </Text>
          </ImageBackground>

          <View
            style={[
              stules.menuwwrap,
              { marginTop: menuMarginTop, gap: menuGap },
            ]}
          >
            <Image source={require('../assets/finImages/menuFrame.png')} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('BigFinCriticLevelsScreen')}
            >
              <Image source={require('../assets/finImages/menuBtn1.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('BigFinPartyZoneScreen')}
            >
              <Image source={require('../assets/finImages/menuBtn2.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('BigFinTapGame')}
            >
              <Image source={require('../assets/finImages/menuBtn3.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('BigFinStoriesScreen')}
            >
              <Image source={require('../assets/finImages/menuBtn4.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[stules.soundbbtun, { marginTop: soundBtnMarginTop }]}
              activeOpacity={0.7}
              onPress={() => bigFinToggleSound(!bigFinSoundEnabled)}
            >
              <Image
                source={
                  bigFinSoundEnabled
                    ? require('../assets/finImages/musBtn.png')
                    : require('../assets/finImages/musicOff.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const stules = StyleSheet.create({
  cont: { flex: 1 },

  scrn: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 30,
  },

  scoreBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrTxt: {
    color: '#FDEB57',
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },

  menuwwrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  soundbbtun: {
    zIndex: 1,
  },
});

export default BigFinHomeScreen;

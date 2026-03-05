import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Platform,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const bigFinSafeNumber = n => (Number.isFinite(n) ? n : 0);

const asyncStorageKeys = {
  soundKey: 'toggleSound',
  totalScoreKey: 'flamingo_total_score',
};
const DEFAULT_FLAMINGO_BALANCE = 60;

const BigFinHomeScreen = () => {
  const navigation = useNavigation();
  const screenPadTop = Platform.OS === 'android' ? 70 : 80;
  const scrollBottom = 120;
  const scoreTextSize = 20;
  const scoreBadgeW = 132;
  const scoreBadgeH = 34;
  const menuGap = 6;
  const menuMarginTop = 20;

  const [bigFinTotalScore, setBigFinTotalScore] = useState(0);

  useFocusEffect(
    useCallback(() => {
      bigFinLoadTotalScore();
    }, []),
  );

  const bigFinLoadTotalScore = useCallback(async () => {
    try {
      const sv = await AsyncStorage.getItem(asyncStorageKeys.totalScoreKey);
      if (sv === null) {
        await AsyncStorage.setItem(
          asyncStorageKeys.totalScoreKey,
          String(DEFAULT_FLAMINGO_BALANCE),
        );
        setBigFinTotalScore(DEFAULT_FLAMINGO_BALANCE);
        return;
      }

      const parsed = parseInt(sv, 10);
      setBigFinTotalScore(bigFinSafeNumber(parsed));
    } catch (e) {
      console.log('loadTotalScore error:', e);
      setBigFinTotalScore(DEFAULT_FLAMINGO_BALANCE);
    }
  }, []);

  return (
    <ImageBackground
      source={require('../assets/finImages/homeBG.png')}
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
              activeOpacity={0.7}
              style={{ marginTop: 5 }}
              onPress={() => navigation.navigate('BigFinMoodBubblesScreen')}
            >
              <Image
                source={require('../assets/finImages/biggyfinmoodbbls.png')}
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

import React, { useCallback, useState } from 'react';
import {
  ImageBackground as CustomBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BigFinLevelCard from '../components/BigFinLevelCard';
import BigFinStartLevelButton from '../components/BigFinStartLevelButton';
import ScreenHeader from '../components/ScreenHeader';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';

const bigFinLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const asyncStorageKeys = {
  criticMaxLevel: 'critic_max_level',
};

const bigFinSafeNumber = n => (Number.isFinite(n) ? n : 0);

export default function BigFinCriticLevelsScreen() {
  const navigation = useNavigation();
  const { height, pick, xS, s, scrollBottom } = useAdaptiveSizes();

  // Adaptive layout sizes
  const scrollPadTop = Platform.OS === 'android' ? height * 0.07 : 0;
  const gridMarginTop = xS ? height * 0.08 : s ? height * 0.09 : height * 0.11;
  const gridGap = pick(14, 16, 20);
  const cardWidth = pick(56, 64, 73);
  const cardHeight = pick(70, 80, 90);
  const cardInnerMargin = pick(2, 3, 3);
  const cardInnerRadius = pick(6, 7, 8);
  const levelTextSize = pick(22, 25, 28);
  const startWrapMarginT = xS ? height * 0.03 : height * 0.04;
  const startBtnHeight = pick(44, 52, 60);
  const startBtnWidth = pick(176, 196, 216);
  const startBtnRadius = pick(10, 11, 12);
  const startTextSize = pick(14, 16, 18);

  const [bigFinMaxCompletedLevel, setBigFinMaxCompletedLevel] = useState(0);

  const bigFinLoadProgress = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(asyncStorageKeys.criticMaxLevel);
      const parsed = raw ? parseInt(raw, 10) : 0;
      setBigFinMaxCompletedLevel(bigFinSafeNumber(parsed));
    } catch (e) {
      console.log('critic level read error', e);
      setBigFinMaxCompletedLevel(0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      bigFinLoadProgress();
    }, [bigFinLoadProgress]),
  );

  const nextLevel = Math.min(
    Math.max(1, bigFinMaxCompletedLevel + 1),
    bigFinLevels.length,
  );

  const getLevelMode = lvlselected => {
    if (lvlselected <= bigFinMaxCompletedLevel) return 'completed';

    if (lvlselected === nextLevel) return 'next';

    return 'locked';
  };

  return (
    <CustomBackground
      source={require('../assets/finImages/levelsBg.png')}
      style={styles.bgcnt}
      resizeMode="cover"
      bgBlurRadius={10}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: scrollPadTop,
          paddingBottom: scrollBottom,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScreenHeader
            title="Inner Critic Test"
            onBack={() => navigation.goBack()}
          />

          <View
            style={[styles.grid, { marginTop: gridMarginTop, gap: gridGap }]}
          >
            {bigFinLevels.map(level => {
              const mode = getLevelMode(level);

              return (
                <BigFinLevelCard
                  key={level}
                  level={level}
                  mode={mode}
                  onPress={() =>
                    navigation.navigate('BigFinCriticTestScreen', { level })
                  }
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  cardInnerMargin={cardInnerMargin}
                  cardInnerRadius={cardInnerRadius}
                  levelTextSize={levelTextSize}
                />
              );
            })}
          </View>

          <View style={[styles.startWrap, { marginTop: startWrapMarginT }]}>
            <BigFinStartLevelButton
              nextLevel={nextLevel}
              onPress={() =>
                navigation.navigate('BigFinCriticTestScreen', {
                  level: nextLevel,
                })
              }
              height={startBtnHeight}
              width={startBtnWidth}
              borderRadius={startBtnRadius}
              fontSize={startTextSize}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </CustomBackground>
  );
}

const styles = StyleSheet.create({
  bgcnt: { flex: 1 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  startWrap: {},
});

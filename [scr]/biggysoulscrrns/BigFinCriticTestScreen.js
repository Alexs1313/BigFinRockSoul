// @ts-nocheck

import BigFinCriticQuizPhase from '../biggyslcomponts/BigFinCriticQuizPhase';
import { quizQuestions as bigFinQuizQuestions } from '../../quizQuestions';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Share } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigFinCriticDonePhase from '../biggyslcomponts/BigFinCriticDonePhase';
import BigFinCriticOverPhase from '../biggyslcomponts/BigFinCriticOverPhase';

const asyncKeys = {
  criticMaxLevel: 'critic_max_level',
  partyFishUnlocked: 'party_fish_unlocked',
};

const asyncStoryKeys = {
  storiesUnlockedCount: 'stories_unlocked_count',
  storyMaxLevel: 'story_max_level',
};

const bigFinSafeNumber = n => (Number.isFinite(n) ? n : 0);
const maxCriticLevel = Math.max(
  1,
  ...Object.keys(bigFinQuizQuestions).map(key => Number(key)),
);

export function BigFinCriticTestScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const rawLevel = Number(route?.params?.level || 1);
  const bigFinLevel = Math.max(
    1,
    Math.min(maxCriticLevel, bigFinSafeNumber(rawLevel)),
  );

  const [bigFinActiveLevel, setBigFinActiveLevel] = useState(bigFinLevel);
  const [bigFinQuestionIndex, setBigFinQuestionIndex] = useState(0);
  const [bigFinPickedIndex, setBigFinPickedIndex] = useState(null);
  const [bigFinPhase, setBigFinPhase] = useState('quiz');

  useEffect(() => {
    setBigFinActiveLevel(bigFinLevel);
    setBigFinQuestionIndex(0);
    setBigFinPickedIndex(null);
    setBigFinPhase('quiz');
  }, [bigFinLevel]);

  const bigFinLevelPack = useMemo(
    () => bigFinQuizQuestions[bigFinActiveLevel],
    [bigFinActiveLevel],
  );

  const bigFinCurrentCard = bigFinLevelPack?.[bigFinQuestionIndex];

  const bigFinSaveLevelRewards = async doneLevel => {
    try {
      const maxRaw = await AsyncStorage.getItem(asyncKeys.criticMaxLevel);
      const maxSaved = maxRaw ? parseInt(maxRaw, 10) : 0;
      const newMax = Math.max(maxSaved, doneLevel);
      await AsyncStorage.setItem(asyncKeys.criticMaxLevel, String(newMax));

      const shouldUnlockFish = Math.min(7, doneLevel + 1);
      const fishRaw = await AsyncStorage.getItem(asyncKeys.partyFishUnlocked);
      const fishSaved = fishRaw ? parseInt(fishRaw, 10) : 1;
      const fishNew = Math.max(fishSaved, shouldUnlockFish);
      await AsyncStorage.setItem(asyncKeys.partyFishUnlocked, String(fishNew));

      const storyMaxRaw = await AsyncStorage.getItem(
        asyncStoryKeys.storyMaxLevel,
      );
      const storyMaxSaved = storyMaxRaw ? parseInt(storyMaxRaw, 10) : 0;

      if (doneLevel > storyMaxSaved) {
        const countRaw = await AsyncStorage.getItem(
          asyncStoryKeys.storiesUnlockedCount,
        );
        const countSaved = countRaw ? parseInt(countRaw, 10) : 0;
        const countNew = Math.min(6, countSaved + 1);

        await AsyncStorage.setItem(
          asyncStoryKeys.storiesUnlockedCount,
          String(countNew),
        );
        await AsyncStorage.setItem(
          asyncStoryKeys.storyMaxLevel,
          String(doneLevel),
        );
      }
    } catch (e) {
      console.log('save Rewards fail', e);
    }
  };

  useEffect(() => {
    if (bigFinPhase === 'done') bigFinSaveLevelRewards(bigFinActiveLevel);
  }, [bigFinPhase, bigFinActiveLevel]);

  const bigFinRestartToLevel = nextLevel => {
    setBigFinActiveLevel(nextLevel);
    setBigFinQuestionIndex(0);
    setBigFinPickedIndex(null);
    setBigFinPhase('quiz');
  };

  const bigFinShareWin = async () => {
    try {
      await Share.share({
        message: `Level ${bigFinActiveLevel} done! Nice choice!`,
      });
    } catch (e) {
      Alert.alert('Share error', String(e?.message || e));
    }
  };

  const bigFinShareLose = async () => {
    try {
      await Share.share({
        message: `Game over (Level ${bigFinActiveLevel}). The music stopped!`,
      });
    } catch (e) {
      Alert.alert('Share error', String(e?.message || e));
    }
  };

  const bigFinPickAnswer = pickIdx => {
    if (bigFinPickedIndex !== null) return;

    setBigFinPickedIndex(pickIdx);
    const nextIndex = bigFinQuestionIndex + 1;

    setTimeout(() => {
      if (pickIdx !== bigFinCurrentCard?.correct) {
        setBigFinPhase('over');
        return;
      }

      if (!bigFinLevelPack || nextIndex >= bigFinLevelPack.length) {
        setBigFinPhase('done');
      } else {
        setBigFinQuestionIndex(nextIndex);

        setBigFinPickedIndex(null);
      }
    }, 600);
  };

  if (bigFinPhase === 'over') {
    return (
      <BigFinCriticOverPhase
        onRetry={() => {
          setBigFinQuestionIndex(0);
          setBigFinPickedIndex(null);
          setBigFinPhase('quiz');
        }}
        onShare={bigFinShareLose}
        onExit={() => navigation.goBack()}
      />
    );
  }

  if (bigFinPhase === 'done') {
    const nextLevel =
      bigFinActiveLevel >= maxCriticLevel ? 1 : bigFinActiveLevel + 1;

    return (
      <BigFinCriticDonePhase
        hasNext
        onNextOrParty={() => {
          bigFinRestartToLevel(nextLevel);
        }}
        onPartyZone={() => navigation.navigate('BigFinPartyZoneScreen')}
        onShare={bigFinShareWin}
        onExit={() => navigation.goBack()}
      />
    );
  }

  return (
    <BigFinCriticQuizPhase
      activeLevel={bigFinActiveLevel}
      questionIndex={bigFinQuestionIndex}
      currentCard={bigFinCurrentCard}
      pickedIndex={bigFinPickedIndex}
      onPickAnswer={bigFinPickAnswer}
      onBack={() => navigation.goBack()}
    />
  );
}

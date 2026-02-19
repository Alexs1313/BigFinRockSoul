import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Share } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigFinCriticDonePhase from '../components/BigFinCriticDonePhase';
import BigFinCriticOverPhase from '../components/BigFinCriticOverPhase';
import BigFinCriticQuizPhase from '../components/BigFinCriticQuizPhase';
import { quizQuestions as bigFinQuizQuestions } from '../data/quizQuestions';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';

const asyncKeys = {
  criticMaxLevel: 'critic_max_level',
  partyFishUnlocked: 'party_fish_unlocked',
};

const asyncStoryKeys = {
  storiesUnlockedCount: 'stories_unlocked_count',
  storyMaxLevel: 'story_max_level',
};

const bigFinSafeNumber = n => (Number.isFinite(n) ? n : 0);

export function BigFinCriticTestScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const rawLevel = Number(route?.params?.level || 1);
  const bigFinLevel = Math.max(1, Math.min(6, bigFinSafeNumber(rawLevel)));

  const [bigFinActiveLevel, setBigFinActiveLevel] = useState(bigFinLevel);
  const [bigFinQuestionIndex, setBigFinQuestionIndex] = useState(0);
  const [bigFinPickedIndex, setBigFinPickedIndex] = useState(null);
  const [bigFinPhase, setBigFinPhase] = useState('quiz');
  const { pick } = useAdaptiveSizes();

  const questionCardMarginT = pick(24, 32, 40);
  const questionCardMinH = pick(130, 165, 200);
  const questionCardPad = pick(18, 22, 24);
  const questionCardRadius = pick(10, 11, 12);
  const questionTextSize = pick(14, 16, 20);
  const answersWrapMarginT = pick(22, 26, 30);
  const answersGap = pick(12, 14, 16);
  const answerBtnMinH = pick(44, 48, 50);
  const answerBtnMinW = pick(160, 180, 200);
  const answerTextSize = pick(12, 14, 16);
  const centerPadH = pick(18, 22, 24);
  const headlineSize = pick(16, 17, 18);
  const headlineMarginB = pick(40, 50, 60);
  const subSize = pick(14, 15, 16);
  const primaryBtnH = pick(44, 50, 50);
  const primaryBtnW = pick(180, 200, 216);
  const primaryBtnRadius = pick(10, 11, 12);
  const primaryTextSize = pick(16, 17, 18);
  const primaryBtnMarginV = pick(5, 6, 6);
  const happyImgMarginV = pick(14, 18, 20);

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
        message: `Level ${bigFinActiveLevel} done! Someone just joined your party`,
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
        centerPadH={centerPadH}
        headlineSize={headlineSize}
        headlineMarginB={headlineMarginB}
        primaryBtnH={primaryBtnH}
        primaryBtnW={primaryBtnW}
        primaryBtnRadius={primaryBtnRadius}
        primaryTextSize={primaryTextSize}
        primaryBtnMarginV={primaryBtnMarginV}
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
    const hasNext = Boolean(bigFinQuizQuestions[bigFinActiveLevel + 1]);

    return (
      <BigFinCriticDonePhase
        centerPadH={centerPadH}
        headlineSize={headlineSize}
        subSize={subSize}
        happyImgMarginV={happyImgMarginV}
        primaryBtnH={primaryBtnH}
        primaryBtnW={primaryBtnW}
        primaryBtnRadius={primaryBtnRadius}
        primaryTextSize={primaryTextSize}
        primaryBtnMarginV={primaryBtnMarginV}
        hasNext={hasNext}
        onNextOrParty={() => {
          if (hasNext) bigFinRestartToLevel(bigFinActiveLevel + 1);
          else navigation.navigate('BigFinPartyZoneScreen');
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
      questionCardMarginT={questionCardMarginT}
      questionCardMinH={questionCardMinH}
      questionCardPad={questionCardPad}
      questionCardRadius={questionCardRadius}
      questionTextSize={questionTextSize}
      answersWrapMarginT={answersWrapMarginT}
      answersGap={answersGap}
      answerBtnMinH={answerBtnMinH}
      answerBtnMinW={answerBtnMinW}
      answerTextSize={answerTextSize}
      onPickAnswer={bigFinPickAnswer}
      onBack={() => navigation.goBack()}
    />
  );
}

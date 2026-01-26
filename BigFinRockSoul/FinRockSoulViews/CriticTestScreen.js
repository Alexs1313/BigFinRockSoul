import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  Share,
  Alert,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { quizQuestions } from '../finData/quizQuestions';

const PERSIST = {
  MAX_CRITIC_LEVEL: 'critic_max_level',
  PARTY_FISH_COUNT: 'party_fish_unlocked',
};

const DIARY = {
  OPEN_STORIES_COUNT: 'stories_unlocked_count',
  LAST_STORY_LEVEL: 'story_max_level',
};

export function CriticTestScreen() {
  const nav = useNavigation();
  const route = useRoute();

  const routeLevel = Math.max(
    1,
    Math.min(6, Number(route?.params?.level || 1)),
  );
  const [activeLevel, setActiveLevel] = useState(routeLevel);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [pickedAnswer, setPickedAnswer] = useState(null);
  const [phase, setPhase] = useState('quiz'); // quiz | done | over

  useEffect(() => {
    setActiveLevel(routeLevel);
    setQuestionIndex(0);
    setPickedAnswer(null);
    setPhase('quiz');
  }, [routeLevel]);

  const levelPack = useMemo(() => quizQuestions[activeLevel], [activeLevel]);
  const currentCard = levelPack[questionIndex];

  async function saveLevelRewards(doneLevel) {
    try {
      const savedMax = await AsyncStorage.getItem(PERSIST.MAX_CRITIC_LEVEL);
      const maxSoFar = savedMax ? parseInt(savedMax, 10) : 0;
      const nextMax = Math.max(maxSoFar, doneLevel);
      await AsyncStorage.setItem(PERSIST.MAX_CRITIC_LEVEL, String(nextMax));

      const shouldHaveFish = Math.min(7, doneLevel + 1);
      const savedFish = await AsyncStorage.getItem(PERSIST.PARTY_FISH_COUNT);
      const fishSoFar = savedFish ? parseInt(savedFish, 10) : 1;
      const nextFish = Math.max(fishSoFar, shouldHaveFish);
      await AsyncStorage.setItem(PERSIST.PARTY_FISH_COUNT, String(nextFish));

      const savedStoryLevel = await AsyncStorage.getItem(
        DIARY.LAST_STORY_LEVEL,
      );
      const lastStoryLevel = savedStoryLevel
        ? parseInt(savedStoryLevel, 10)
        : 0;

      if (doneLevel > lastStoryLevel) {
        const savedCount = await AsyncStorage.getItem(DIARY.OPEN_STORIES_COUNT);
        const openedSoFar = savedCount ? parseInt(savedCount, 10) : 0;

        const nextCount = Math.min(6, openedSoFar + 1);

        await AsyncStorage.setItem(DIARY.OPEN_STORIES_COUNT, String(nextCount));
        await AsyncStorage.setItem(DIARY.LAST_STORY_LEVEL, String(doneLevel));
      }
    } catch (e) {
      console.log('saveLevelRewards error:', e);
    }
  }

  useEffect(() => {
    if (phase === 'done') {
      saveLevelRewards(activeLevel);
    }
  }, [phase, activeLevel]);

  const restartWithLevel = nextLevel => {
    setActiveLevel(nextLevel);
    setQuestionIndex(0);
    setPickedAnswer(null);
    setPhase('quiz');
  };

  const shareWin = async () => {
    try {
      await Share.share({
        message: `Level  ${activeLevel} done! Someone just joined your party`,
      });
    } catch (e) {
      Alert.alert('Share error', String(e?.message || e));
    }
  };

  const shareLose = async () => {
    try {
      await Share.share({
        message: `Game over (Level ${activeLevel}). The music stopped!`,
      });
    } catch (e) {
      Alert.alert('Share error', String(e?.message || e));
    }
  };

  const pick = idx => {
    if (pickedAnswer !== null) return;

    setPickedAnswer(idx);
    const nextIdx = questionIndex + 1;

    setTimeout(() => {
      if (idx !== currentCard.correct) {
        setPhase('over');
        return;
      }

      if (nextIdx >= levelPack.length) {
        setPhase('done');
      } else {
        setQuestionIndex(nextIdx);
        setPickedAnswer(null);
      }
    }, 600);
  };

  if (phase === 'over') {
    return (
      <ImageBackground
        source={require('../assets/finImages/loseBg.png')}
        style={uiShell.full}
      >
        <SafeAreaView style={uiShell.resultCenter}>
          <Image source={require('../assets/finImages/gameOverText.png')} />
          <Text style={[uiShell.resultTitle, { marginBottom: 60 }]}>
            The music stopped...
          </Text>

          <OrangePill
            label="Retry Level"
            onPress={() => {
              setQuestionIndex(0);
              setPickedAnswer(null);
              setPhase('quiz');
            }}
          />
          <OrangePill label="Share" onPress={shareLose} />
          <OrangePill label="Exit" onPress={() => nav.goBack()} />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (phase === 'done') {
    const hasNext = Boolean(quizQuestions[activeLevel + 1]);

    return (
      <ImageBackground
        source={require('../assets/finImages/doneBg.png')}
        style={uiShell.full}
      >
        <SafeAreaView style={uiShell.resultCenter}>
          <Image source={require('../assets/finImages/doneText.png')} />
          <Text style={uiShell.resultTitle}>
            Someone just joined your party!
          </Text>

          <Text style={uiShell.resultBody}>
            Looks like a new fish heard Big Fin’s voice{'\n'}
            and decided to join the party!
          </Text>

          <Image
            source={require('../assets/finImages/fin_happy.png')}
            style={uiShell.finPic}
          />

          <OrangePill
            label={hasNext ? 'Next level' : 'Party Zone'}
            onPress={() => {
              if (hasNext) restartWithLevel(activeLevel + 1);
              else nav.navigate('PartyZoneScreen');
            }}
          />

          <OrangePill
            label="Party Zone"
            onPress={() => nav.navigate('PartyZoneScreen')}
          />
          <OrangePill label="Share" onPress={shareWin} />
          <OrangePill label="Exit" onPress={() => nav.goBack()} />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/finImages/gameBg.png')}
      style={uiShell.full}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={['#FCE6FD', '#C738FA']} style={uiShell.topBar}>
          <LinearGradient
            colors={['#610EAC', '#C83DD7']}
            style={{
              padding: Platform.OS === 'ios' ? 2 : 0,
              borderRadius: 16,
              width: '100%',
            }}
          >
            <View style={uiShell.topBarBody}>
              <TouchableOpacity
                onPress={() => nav.goBack()}
                style={uiShell.backTap}
              >
                <Image
                  source={require('../assets/finImages/bxs_up-arrow.png')}
                />
              </TouchableOpacity>

              <Text style={uiShell.topBarTitle}> Level {activeLevel}</Text>

              <Image
                source={require('../assets/finImages/bottomStars.png')}
                style={uiShell.starStrip}
              />
            </View>
          </LinearGradient>
        </LinearGradient>

        <View style={uiShell.cardBox}>
          <Text style={uiShell.cardText}>{currentCard.q}</Text>
        </View>

        <View style={uiShell.answersCol}>
          {currentCard.answers.map((label, i) => {
            const showCorrect =
              pickedAnswer !== null && i === currentCard.correct;
            const showWrong = pickedAnswer === i && i !== currentCard.correct;

            return (
              <TouchableOpacity
                key={`${activeLevel}-${questionIndex}-${i}`}
                disabled={pickedAnswer !== null}
                activeOpacity={0.7}
                onPress={() => pick(i)}
                style={{ alignSelf: 'center', width: '60%' }}
              >
                <LinearGradient
                  colors={
                    showCorrect
                      ? ['#78E9DC', '#249881']
                      : showWrong
                      ? ['#E98178', '#982424']
                      : ['#DE78E9', '#3D2498']
                  }
                  style={uiShell.answerPill}
                >
                  <View style={{ paddingHorizontal: 8 }}>
                    <Text style={uiShell.answerLabel}>{label}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function OrangePill({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginVertical: 6 }}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#FE9200', '#FDEF70', '#FD3213']}
        style={uiShell.ctaPill}
      >
        <Text style={uiShell.ctaLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const uiShell = StyleSheet.create({
  full: { flex: 1 },
  topBar: {
    marginTop: 12,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 20,
  },
  topBarBody: {
    padding: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTap: { position: 'absolute', left: 20 },
  topBarTitle: { fontSize: 20, fontWeight: '900', color: '#FDEB57' },
  starStrip: {
    position: 'absolute',
    width: '100%',
    height: 60,
    zIndex: -1,
  },
  cardBox: {
    marginHorizontal: 24,
    marginTop: 40,
    padding: 24,
    backgroundColor: '#341246E5',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#F9CDF9',
    minHeight: 200,
    justifyContent: 'center',
  },
  cardText: { color: '#fff', fontSize: 20, textAlign: 'center' },
  answersCol: { marginTop: 30, gap: 16 },
  answerPill: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    minWidth: 200,
    borderWidth: 1,
    borderColor: '#F9CDF9',
  },
  answerLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  resultCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  resultTitle: {
    fontSize: 18,
    color: '#FDEB57',
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 14,
  },
  resultBody: {
    fontSize: 16,
    color: '#FDE6D9',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  finPic: { marginVertical: 20 },
  ctaPill: {
    height: 40,
    width: 216,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    color: '#10063D',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

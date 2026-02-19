import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFinStore } from '../storage/bigFinCntxt';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';
import TapGameLoadingScreen from '../components/TapGameLoadingScreen';
import TapGameStartScreen from '../components/TapGameStartScreen';
import TapGamePlayScreen from '../components/TapGamePlayScreen';
import TapGameResultScreen from '../components/TapGameResultScreen';

const tapStorageKeys = {
  totalScore: 'flamingo_total_score',
  lastGameTime: 'flamingo_last_game_time',
};

const TAP_COOLDOWN_MS = 4 * 60 * 60 * 1000;

export function BigFinTapGame() {
  const navigation = useNavigation();
  const { finSoundEnabled: soundEnabled, setFinSoundEnabled } = useFinStore();

  const [gamePhase, setGamePhase] = useState('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [pointsBalance, setPointsBalance] = useState(0);

  const [bubbles, setBubbles] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [canPlayAgain, setCanPlayAgain] = useState(true);
  const [cooldownRemainingMs, setCooldownRemainingMs] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  const {
    width: screenWidth,
    height: screenHeight,
    pick,
    scrollBottom,
  } = useAdaptiveSizes();
  const scoreRef = useRef(0);

  const walletBadgeW = pick(110, 122, 132);
  const walletBadgeH = pick(28, 32, 34);
  const walletTextSize = pick(16, 18, 20);
  const primaryBtnW = pick(200, 230, 258);
  const primaryBtnH = pick(56, 64, 71);
  const primaryBtnRadius = pick(12, 14, 16);
  const primaryBtnTextSize = pick(18, 22, 24);
  const hintTextSize = pick(14, 15, 16);
  const cooldownLabelSize = pick(16, 17, 18);
  const cooldownTextSize = pick(20, 22, 24);
  const resultPadV = pick(32, 36, 40);
  const resultLineSize = pick(14, 15, 16);
  const resultEarnedSize = pick(20, 22, 24);
  const resultTotalSize = pick(20, 22, 24);
  const resultBtnGap = pick(10, 12, 12);
  const resultBtnMinW = pick(180, 200, 216);
  const resultBtnH = pick(44, 48, 50);
  const resultBtnRadius = pick(10, 11, 12);
  const resultBtnTextSize = pick(16, 17, 18);
  const pauseCardPad = pick(12, 14, 15);
  const pauseActionH = pick(36, 38, 40);
  const pauseActionTextSize = pick(16, 17, 18);
  const loadingTextSize = pick(18, 19, 20);
  const bubbleIdRef = useRef(0);

  const layoutSizes = {
    walletBadgeW,
    walletBadgeH,
    walletTextSize,
    primaryBtnW,
    primaryBtnH,
    primaryBtnRadius,
    primaryBtnTextSize,
    hintTextSize,
    cooldownLabelSize,
    cooldownTextSize,
    resultPadV,
    scrollBottom,
    resultLineSize,
    resultEarnedSize,
    resultTotalSize,
    resultBtnGap,
    resultBtnMinW,
    resultBtnH,
    resultBtnRadius,
    resultBtnTextSize,
    pauseCardPad,
    pauseActionH,
    pauseActionTextSize,
    loadingTextSize,
  };

  const timerRef = useRef(null);
  const spawnRef = useRef(null);
  const moveRef = useRef(null);
  const cooldownIntervalRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      getInitState();
      getSoundSetting();
    }, []),
  );

  const getSoundSetting = async () => {
    try {
      const savedSoundVale = await AsyncStorage.getItem('toggleSound');

      const parsedJSON = JSON.parse(savedSoundVale);

      setFinSoundEnabled(parsedJSON);
    } catch (e) {
      console.error('play soun err', e);
    }
  };

  useEffect(() => {
    if (!canPlayAgain) {
      cooldownIntervalRef.current = setInterval(() => {
        refreshCooldown();
      }, 1000);
    }

    return () => {
      if (cooldownIntervalRef.current)
        clearInterval(cooldownIntervalRef.current);
    };
  }, [canPlayAgain]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevSeconds => {
          if (prevSeconds <= 1) {
            finishRound();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      spawnRef.current = setInterval(() => {
        spawnBubble();
      }, 800);

      moveRef.current = setInterval(() => {
        setBubbles(prevDrops =>
          prevDrops
            .map(drop => ({ ...drop, y: drop.y + 14 }))
            .filter(drop => drop.y < screenHeight + 100),
        );
      }, 30);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnRef.current) clearInterval(spawnRef.current);
      if (moveRef.current) clearInterval(moveRef.current);
    };
  }, [isRunning, isPaused]);

  const getInitState = async () => {
    try {
      const storedWallet = await AsyncStorage.getItem(
        tapStorageKeys.totalScore,
      );

      const savedLastTime = await AsyncStorage.getItem(
        tapStorageKeys.lastGameTime,
      );

      if (storedWallet) setPointsBalance(parseInt(storedWallet, 10));

      if (savedLastTime) {
        const elapsed = Date.now() - parseInt(savedLastTime, 10);
        if (elapsed < TAP_COOLDOWN_MS) {
          setCanPlayAgain(false);
          setCooldownRemainingMs(TAP_COOLDOWN_MS - elapsed);
        }
      }
    } catch (error) {
      console.warn('game loading error', error);
    } finally {
      setIsBooting(false);
    }
  };

  const refreshCooldown = async () => {
    try {
      const lastTimeRaw = await AsyncStorage.getItem(
        tapStorageKeys.lastGameTime,
      );
      if (!lastTimeRaw) return;

      const elapsed = Date.now() - parseInt(lastTimeRaw, 10);

      if (elapsed >= TAP_COOLDOWN_MS) {
        setCanPlayAgain(true);
        setCooldownRemainingMs(0);
        if (cooldownIntervalRef.current)
          clearInterval(cooldownIntervalRef.current);
      } else {
        setCooldownRemainingMs(TAP_COOLDOWN_MS - elapsed);
      }
    } catch (error) {
      console.log('Error checking cooldown:', error);
    }
  };

  const formatCooldownTime = milisec => {
    const totalSeconds = Math.floor(milisec / 1000);

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const hasBubbleOverlap = (fresh, existing) => {
    const minGap = 100;
    for (let one of existing) {
      const dist = Math.sqrt(
        Math.pow(fresh.x - one.x, 2) + Math.pow(fresh.y - one.y, 2),
      );
      if (dist < minGap) return true;
    }
    return false;
  };

  const spawnBubble = () => {
    console.log('spawnBubble');
    setBubbles(prevDrops => {
      const isFlamingo = Math.random() > 0.4;
      const size = 70 + Math.random() * 10;

      const maxTries = 10;
      let tries = 0;
      let fresh;

      do {
        const x = Math.random() * (screenWidth - size - 40) + 20;
        const y = -size - Math.random() * 200;
        fresh = {
          id: bubbleIdRef.current,
          x,
          y,
          size,
          isFlamingo,
        };
        tries++;
      } while (hasBubbleOverlap(fresh, prevDrops) && tries < maxTries);

      if (tries < maxTries) {
        bubbleIdRef.current += 1;
        return [...prevDrops, fresh];
      }

      return prevDrops;
    });
  };

  useEffect(() => {
    if (gamePhase === 'start') {
      AsyncStorage.getItem(tapStorageKeys.totalScore).then(v => {
        setPointsBalance(v ? Number(v) : 0);
      });
    }
  }, [gamePhase]);

  const popBubble = item => {
    if (item.isFlamingo) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
    setBubbles(prevDrops => prevDrops.filter(b => b.id !== item.id));
  };

  const startRound = () => {
    if (!canPlayAgain) return;

    setScore(0);
    scoreRef.current = 0;

    setTimeLeft(30);

    setBubbles([]);

    bubbleIdRef.current = 0;

    setIsRunning(true);

    setIsPaused(false);

    setGamePhase('game');
  };

  const finishRound = async () => {
    setIsRunning(false);

    const earned = scoreRef.current;

    try {
      const storedWallet = await AsyncStorage.getItem(
        tapStorageKeys.totalScore,
      );
      const current = storedWallet ? Number(storedWallet) : 0;

      const nextTotal = current + earned;

      await AsyncStorage.setItem(tapStorageKeys.totalScore, String(nextTotal));
      await AsyncStorage.setItem(
        tapStorageKeys.lastGameTime,
        String(Date.now()),
      );

      setPointsBalance(nextTotal);

      setCanPlayAgain(false);
      setCooldownRemainingMs(TAP_COOLDOWN_MS);
    } catch (e) {
      console.log('game save error:', e);
    }

    setGamePhase('result');
  };

  const togglePause = () => setIsPaused(p => !p);

  const formatTime = seconds => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setSoundEnabled = async next => {
    try {
      await AsyncStorage.setItem('toggleSound', JSON.stringify(next));
      setFinSoundEnabled(next);
    } catch (e) {
      console.log('Error toggle sound', e);
    }
  };

  const shareScore = () => {
    Share.share({ message: `Points earned +${score}` })
      .then(r => console.log(r))
      .catch(e => console.log(e));
  };

  if (isBooting) {
    return (
      <TapGameLoadingScreen
        styles={tapStyles}
        loadingTextSize={layoutSizes.loadingTextSize}
      />
    );
  }

  if (gamePhase === 'start') {
    return (
      <TapGameStartScreen
        styles={tapStyles}
        sizes={layoutSizes}
        navigation={navigation}
        wallet={pointsBalance}
        available={canPlayAgain}
        cooldownLeftMs={cooldownRemainingMs}
        onBeginRun={startRound}
        formatCooldown={formatCooldownTime}
      />
    );
  }

  if (gamePhase === 'game') {
    return (
      <TapGamePlayScreen
        styles={tapStyles}
        sizes={layoutSizes}
        navigation={navigation}
        secondsLeft={timeLeft}
        drops={bubbles}
        onPopBubble={popBubble}
        onPause={togglePause}
        paused={isPaused}
        soundEnabled={soundEnabled}
        onToggleSound={setSoundEnabled}
        formatTimer={formatTime}
        onExitToMenu={() => {
          setIsRunning(false);
          setIsPaused(false);
          navigation.goBack();
        }}
      />
    );
  }

  if (gamePhase === 'result') {
    return (
      <TapGameResultScreen
        styles={tapStyles}
        sizes={layoutSizes}
        navigation={navigation}
        score={score}
        wallet={pointsBalance}
        onShare={shareScore}
        onPartyZone={() => navigation.navigate('BigFinPartyZoneScreen')}
        onExit={() => setGamePhase('start')}
      />
    );
  }

  return null;
}

const tapStyles = StyleSheet.create({
  tapScreen: { flex: 1 },
  tapSafeArea: { flex: 1 },
  tapLoadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapLoadingLabel: { color: '#fff', fontWeight: '600' },
  tapHeaderShell: { width: '90%', alignSelf: 'center', zIndex: 1 },
  tapHeaderContent: { alignItems: 'center', justifyContent: 'center' },
  tapBackButton: { position: 'absolute' },
  tapScreenTitle: { fontWeight: '900', color: '#FDEB57' },
  tapHeaderStars: { position: 'absolute', width: '100%', zIndex: -1 },
  tapPointsBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  tapPointsValue: {
    color: '#FDEB57',
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },
  tapContentCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tapHintText: {
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '500',
  },
  tapCooldownLabel: {
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  tapCooldownValue: { color: '#FDEB57', fontWeight: '700' },
  tapPrimaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  tapPrimaryButtonLabel: { color: '#FDEB57', fontWeight: '900' },
  tapGlowDot: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(128, 90, 213, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(252, 230, 253, 0.2)',
  },
  tapToolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    zIndex: 1,
  },
  tapTimerBadge: {
    backgroundColor: '#1C0234',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#691D7A',
    minWidth: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapTimerValue: { color: '#FDEB57', fontSize: 22, fontWeight: '900' },
  tapPauseButton: {
    backgroundColor: '#1C0234',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#691D7A',
  },
  tapBubblesArea: { flex: 1, position: 'relative' },
  tapBubbleWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapBubbleBack: { width: '100%', height: '100%', position: 'absolute' },
  tapBubbleFront: { width: '60%', height: '60%' },
  tapPauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    zIndex: 2,
  },
  tapPauseCard: {
    width: '70%',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F9CDF9',
  },
  tapPauseActionBtn: {
    backgroundColor: 'rgba(16, 6, 61, 0.9)',
    width: '100%',
    borderRadius: 50,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapPauseActionLabel: {
    color: '#fff',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  tapSoundButton: {
    marginTop: 16,
    backgroundColor: 'rgba(16, 6, 61, 0.9)',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapResultSafeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  tapResultLine: {
    color: '#FDE6D9',
    textAlign: 'center',
    marginVertical: 2,
    fontWeight: '500',
  },
  tapEarnedLabel: {
    fontWeight: '900',
    color: '#fff',
    marginTop: 30,
    marginBottom: 8,
  },
  tapTotalLabel: {
    fontWeight: '900',
    color: '#FDEB57',
    marginBottom: 40,
  },
  tapResultActions: {},
  tapResultButton: { alignItems: 'center', justifyContent: 'center' },
  tapResultButtonLabel: {
    color: '#10063D',
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

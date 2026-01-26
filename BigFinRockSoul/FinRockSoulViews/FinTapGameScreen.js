import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFinStore } from '../SoulRockStore/finContxt';

const { width, height } = Dimensions.get('window');

const PERSIST = {
  totalPoints: 'flamingo_total_score',
  lastTapStamp: 'flamingo_last_game_time',
};

const TAP_TIMEOUT = 4 * 60 * 60 * 1000;

export function FinTapGameScreen() {
  const navigation = useNavigation();
  const { finSoundEnabled, setFinSoundEnabled } = useFinStore();

  const [mode, setMode] = useState('start');
  const [roundScore, setRoundScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [wallet, setWallet] = useState(0);

  const [drops, setDrops] = useState([]);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const [allowedToPlay, setAllowedToPlay] = useState(true);
  const [cooldownMs, setCooldownMs] = useState(0);
  const [booting, setBooting] = useState(true);

  const scoreLive = useRef(0);
  const nextId = useRef(0);

  const tickTimer = useRef(null);
  const tickSpawn = useRef(null);
  const tickMove = useRef(null);
  const tickCooldown = useRef(null);

  useFocusEffect(
    useCallback(() => {
      hydrateTapState();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      hydrateSoundFlag();
    }, []),
  );

  const hydrateSoundFlag = async () => {
    try {
      const raw = await AsyncStorage.getItem('toggleSound');
      const isOn = JSON.parse(raw);
      setFinSoundEnabled(isOn);
    } catch (error) {
      console.error('Error loading fin music', error);
    }
  };

  useEffect(() => {
    if (!allowedToPlay) {
      tickCooldown.current = setInterval(() => {
        refreshCooldown();
      }, 1000);
    }

    return () => {
      if (tickCooldown.current) clearInterval(tickCooldown.current);
    };
  }, [allowedToPlay]);

  useEffect(() => {
    if (running && !paused) {
      tickTimer.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            endRound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      tickSpawn.current = setInterval(() => {
        dropBubble();
      }, 800);

      tickMove.current = setInterval(() => {
        setDrops(prev =>
          prev.map(d => ({ ...d, y: d.y + 8 })).filter(d => d.y < height + 100),
        );
      }, 30);
    }

    return () => {
      if (tickTimer.current) clearInterval(tickTimer.current);
      if (tickSpawn.current) clearInterval(tickSpawn.current);
      if (tickMove.current) clearInterval(tickMove.current);
    };
  }, [running, paused]);

  const hydrateTapState = async () => {
    try {
      const savedWallet = await AsyncStorage.getItem(PERSIST.totalPoints);
      const lastStamp = await AsyncStorage.getItem(PERSIST.lastTapStamp);

      if (savedWallet) setWallet(parseInt(savedWallet, 10));

      if (lastStamp) {
        const elapsed = Date.now() - parseInt(lastStamp, 10);
        if (elapsed < TAP_TIMEOUT) {
          setAllowedToPlay(false);
          setCooldownMs(TAP_TIMEOUT - elapsed);
        }
      }
    } catch (error) {
      console.log('Error loading game data:', error);
    } finally {
      setBooting(false);
    }
  };

  const refreshCooldown = async () => {
    try {
      const lastStamp = await AsyncStorage.getItem(PERSIST.lastTapStamp);
      if (!lastStamp) return;

      const elapsed = Date.now() - parseInt(lastStamp, 10);
      if (elapsed >= TAP_TIMEOUT) {
        setAllowedToPlay(true);
        setCooldownMs(0);
        if (tickCooldown.current) clearInterval(tickCooldown.current);
      } else {
        setCooldownMs(TAP_TIMEOUT - elapsed);
      }
    } catch (error) {
      console.log('Error checking cooldown:', error);
    }
  };

  const prettyCooldown = ms => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const hasClash = (fresh, existing) => {
    const minGap = 100;

    for (let item of existing) {
      const dist = Math.sqrt(
        Math.pow(fresh.x - item.x, 2) + Math.pow(fresh.y - item.y, 2),
      );
      if (dist < minGap) return true;
    }
    return false;
  };

  const dropBubble = () => {
    setDrops(prev => {
      const isFlamingo = Math.random() > 0.4;
      const size = 70 + Math.random() * 10;

      const maxTries = 10;
      let tries = 0;
      let fresh;

      do {
        const x = Math.random() * (width - size - 40) + 20;
        const y = -size - Math.random() * 200;
        fresh = { id: nextId.current, x, y, size, isFlamingo };
        tries++;
      } while (hasClash(fresh, prev) && tries < maxTries);

      if (tries < maxTries) {
        nextId.current += 1;
        return [...prev, fresh];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (mode === 'start') {
      AsyncStorage.getItem(PERSIST.totalPoints).then(v => {
        setWallet(v ? Number(v) : 0);
      });
    }
  }, [mode]);

  const onBubblePress = item => {
    if (item.isFlamingo) {
      scoreLive.current += 1;
      setRoundScore(scoreLive.current);
    }
    setDrops(prev => prev.filter(b => b.id !== item.id));
  };

  const beginRound = () => {
    if (!allowedToPlay) return;

    setRoundScore(0);
    scoreLive.current = 0;

    setSecondsLeft(30);
    setDrops([]);
    nextId.current = 0;

    setRunning(true);
    setPaused(false);
    setMode('game');
  };

  const endRound = async () => {
    setRunning(false);

    const earned = scoreLive.current;

    try {
      const raw = await AsyncStorage.getItem(PERSIST.totalPoints);
      const currentTotal = raw ? Number(raw) : 0;

      const nextTotal = currentTotal + earned;

      await AsyncStorage.setItem(PERSIST.totalPoints, String(nextTotal));
      await AsyncStorage.setItem(PERSIST.lastTapStamp, String(Date.now()));

      setWallet(nextTotal);
    } catch (e) {
      console.log('finishGame save error:', e);
    }

    setMode('result');
  };

  const flipPause = () => {
    setPaused(p => !p);
  };

  const prettyTime = s => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const setSoundFlag = async nextValue => {
    try {
      await AsyncStorage.setItem('toggleSound', JSON.stringify(nextValue));
      setFinSoundEnabled(nextValue);
    } catch (error) {
      console.log('Error toggle sound', error);
    }
  };

  const shareGameRes = () => {
    Share.share({
      message: `I just scored ${roundScore} points!`,
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };

  if (booting) {
    return (
      <ImageBackground
        source={require('../assets/finImages/levelsBg.png')}
        style={uiShell.bg}
      >
        <SafeAreaView style={uiShell.page}>
          <View style={uiShell.center}>
            <Text style={uiShell.loading}>Loading...</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (mode === 'start') {
    return (
      <ImageBackground
        source={require('../assets/finImages/levelsBg.png')}
        style={uiShell.bg}
      >
        <SafeAreaView style={uiShell.page}>
          <LinearGradient
            colors={['#FCE6FD', '#C738FA']}
            style={uiShell.headerShell}
          >
            <LinearGradient
              colors={['#610EAC', '#C83DD7']}
              style={{
                padding: Platform.OS === 'ios' ? 2 : 0,
                borderRadius: 16,
                width: '100%',
              }}
            >
              <View style={uiShell.headerCore}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={uiShell.backTap}
                >
                  <Image
                    source={require('../assets/finImages/bxs_up-arrow.png')}
                  />
                </TouchableOpacity>

                <Text style={uiShell.title}>Tap</Text>

                <Image
                  source={require('../assets/finImages/bottomStars.png')}
                  style={uiShell.headerStars}
                />
              </View>
            </LinearGradient>
          </LinearGradient>

          <ImageBackground
            style={uiShell.pointsPill}
            source={require('../assets/finImages/topQ.png')}
          >
            <Text style={uiShell.pointsText}>{wallet}</Text>
          </ImageBackground>

          <View style={uiShell.center}>
            {allowedToPlay ? (
              <>
                <Text style={uiShell.hint}>
                  30 seconds. Show your tapping power!
                </Text>

                <TouchableOpacity onPress={beginRound} activeOpacity={0.7}>
                  <LinearGradient
                    colors={['#610EAC', '#C83DD7']}
                    style={uiShell.bigButton}
                  >
                    <Text style={uiShell.bigButtonText}>START</Text>

                    <Image
                      source={require('../assets/finImages/buttonStars.png')}
                      style={{ position: 'absolute', right: 10, bottom: 5 }}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={uiShell.cooldownLabel}>
                  Next game available in:
                </Text>

                <LinearGradient
                  colors={[
                    'rgba(128, 90, 213, 0.6)',
                    'rgba(138, 43, 226, 0.5)',
                  ]}
                  style={uiShell.bigButton}
                >
                  <Text style={uiShell.cooldownTime}>
                    {prettyCooldown(cooldownMs)}
                  </Text>

                  <Image
                    source={require('../assets/finImages/buttonStars.png')}
                    style={{ position: 'absolute', right: 10, bottom: 5 }}
                  />
                </LinearGradient>
              </>
            )}
          </View>

          <View style={uiShell.bubbleDot} />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (mode === 'game') {
    return (
      <ImageBackground
        source={require('../assets/finImages/gameBg.png')}
        style={uiShell.bg}
      >
        <SafeAreaView style={uiShell.page}>
          <LinearGradient
            colors={['#FCE6FD', '#C738FA']}
            style={uiShell.headerShell}
          >
            <LinearGradient
              colors={['#610EAC', '#C83DD7']}
              style={{
                padding: Platform.OS === 'ios' ? 2 : 0,
                borderRadius: 16,
                width: '100%',
              }}
            >
              <View style={uiShell.headerCore}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={uiShell.backTap}
                >
                  <Image
                    source={require('../assets/finImages/bxs_up-arrow.png')}
                  />
                </TouchableOpacity>

                <Text style={uiShell.title}>Tap</Text>

                <Image
                  source={require('../assets/finImages/bottomStars.png')}
                  style={uiShell.headerStars}
                />
              </View>
            </LinearGradient>
          </LinearGradient>

          <View style={uiShell.hudRow}>
            <View style={uiShell.timerPill}>
              <Text style={uiShell.timerText}>{prettyTime(secondsLeft)}</Text>
            </View>

            <TouchableOpacity
              onPress={flipPause}
              style={uiShell.pausePill}
              activeOpacity={0.7}
            >
              <Image
                source={require('../assets/finImages/solar_pause-bold.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={uiShell.arena}>
            {drops.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => onBubblePress(item)}
                style={[
                  uiShell.bubbleTap,
                  {
                    left: item.x,
                    top: item.y,
                    width: item.size,
                    height: item.size,
                  },
                ]}
              >
                <Image
                  source={require('../assets/finImages/emptyBubble.png')}
                  style={uiShell.bubbleShell}
                  resizeMode="contain"
                />
                {item.isFlamingo && (
                  <Image
                    source={require('../assets/finImages/flamingoBubble.png')}
                    style={uiShell.flamingoCore}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {paused && (
            <View style={uiShell.pauseVeil}>
              <LinearGradient
                colors={['#610EAC', '#C83DD7']}
                style={uiShell.pauseCard}
              >
                <View style={{ padding: 15, alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={flipPause}
                    activeOpacity={0.7}
                    style={uiShell.pauseAction}
                  >
                    <Text style={uiShell.pauseActionText}>Continue</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={uiShell.pauseAction}
                    activeOpacity={0.7}
                    onPress={() => {
                      setRunning(false);
                      setPaused(false);
                      navigation.goBack();
                    }}
                  >
                    <Text style={uiShell.pauseActionText}>Main Menu</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={uiShell.soundPuck}
                    activeOpacity={0.7}
                    onPress={() => setSoundFlag(!finSoundEnabled)}
                  >
                    <Image
                      source={
                        finSoundEnabled
                          ? require('../assets/finImages/musBtn.png')
                          : require('../assets/finImages/musicOff.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (mode === 'result') {
    return (
      <ImageBackground
        source={require('../assets/finImages/doneBg.png')}
        style={uiShell.bg}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView style={uiShell.resultWrap}>
            <Image
              source={require('../assets/finImages/tapRes.png')}
              style={{ marginBottom: 14 }}
            />

            <Text style={uiShell.resultLine}>You crushed it!</Text>
            <Text style={uiShell.resultLine}>Your fingers were on fire</Text>
            <Text style={uiShell.resultLine}>
              All those taps turned into Flamingo Points.
            </Text>

            <Text style={uiShell.resultBig}>Points earned: +{roundScore}</Text>
            <Text style={uiShell.resultGold}>Total balance: {wallet}</Text>

            <View style={uiShell.resultStack}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PartyZoneScreen')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#FE9200', '#FDEF70', '#FD3213']}
                  style={uiShell.resultBtn}
                >
                  <Text style={uiShell.resultBtnText}>Party Zone</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} onPress={shareGameRes}>
                <LinearGradient
                  colors={['#FE9200', '#FDEF70', '#FD3213']}
                  style={uiShell.resultBtn}
                >
                  <Text style={uiShell.resultBtnText}>Share</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setMode('start')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#FE9200', '#FDEF70', '#FD3213']}
                  style={uiShell.resultBtn}
                >
                  <Text style={uiShell.resultBtnText}>Exit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }

  return null;
}

const uiShell = StyleSheet.create({
  bg: { flex: 1 },
  page: { flex: 1 },
  headerShell: {
    marginTop: 12,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 20,
    zIndex: 1,
  },
  headerCore: {
    padding: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTap: { position: 'absolute', left: 20 },
  title: { fontSize: 22, fontWeight: '900', color: '#FDEB57' },
  headerStars: {
    position: 'absolute',
    width: '100%',
    height: 60,
    zIndex: -1,
  },
  pointsPill: {
    width: 132,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  pointsText: {
    color: '#FDEB57',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loading: { color: '#fff', fontSize: 20, fontWeight: '600' },
  hint: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '500',
  },
  cooldownLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  cooldownTime: { color: '#FDEB57', fontSize: 24, fontWeight: '700' },
  bigButton: {
    width: 258,
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },
  bigButtonText: { color: '#FDEB57', fontSize: 24, fontWeight: '900' },
  bubbleDot: {
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
  hudRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    zIndex: 1,
  },
  timerPill: {
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
  timerText: { color: '#FDEB57', fontSize: 22, fontWeight: '900' },
  pausePill: {
    backgroundColor: '#1C0234',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#691D7A',
  },
  arena: { flex: 1, position: 'relative' },
  bubbleTap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleShell: { width: '100%', height: '100%', position: 'absolute' },
  flamingoCore: { width: '60%', height: '60%' },
  pauseVeil: {
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
  pauseCard: {
    width: '70%',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F9CDF9',
  },
  pauseAction: {
    backgroundColor: 'rgba(16, 6, 61, 0.9)',
    width: '100%',
    height: 40,
    borderRadius: 50,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseActionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  soundPuck: {
    marginTop: 16,
    backgroundColor: 'rgba(16, 6, 61, 0.9)',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  resultWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  resultLine: {
    fontSize: 16,
    color: '#FDE6D9',
    textAlign: 'center',
    marginVertical: 2,
    fontWeight: '500',
  },
  resultBig: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginTop: 30,
    marginBottom: 8,
  },
  resultGold: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FDEB57',
    marginBottom: 40,
  },
  resultStack: { gap: 12 },
  resultBtn: {
    borderRadius: 50,
    minWidth: 216,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultBtnText: {
    color: '#10063D',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

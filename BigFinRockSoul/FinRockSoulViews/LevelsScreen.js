import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STAGES = [1, 2, 3, 4, 5, 6];

const PERSIST = {
  criticPeak: 'critic_max_level',
};

export default function LevelsScreen() {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const [bestCleared, setBestCleared] = useState(0);

  const pullProgress = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(PERSIST.criticPeak);
      const n = raw ? parseInt(raw, 10) : 0;
      setBestCleared(Number.isFinite(n) ? n : 0);
    } catch (e) {
      console.log('pullProgress error:', e);
      setBestCleared(0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      pullProgress();
    }, [pullProgress]),
  );

  const stageToPlay = useMemo(() => {
    const next = bestCleared + 1;
    return Math.min(Math.max(1, next), STAGES.length);
  }, [bestCleared]);

  const badgeFor = stage => {
    if (stage <= bestCleared) return 'cleared';
    if (stage === stageToPlay) return 'now';
    return 'sleep';
  };

  const tintFor = mood => {
    switch (mood) {
      case 'cleared':
        return skin.clearedTile;
      case 'now':
        return skin.nowTile;
      default:
        return skin.sleepTile;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/finImages/levelsBg.png')}
      style={skin.screen}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: Platform.OS === 'android' ? height * 0.07 : 0,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <LinearGradient colors={['#FCE6FD', '#C738FA']} style={skin.topBar}>
            <LinearGradient
              colors={['#610EAC', '#C83DD7']}
              style={{
                padding: Platform.OS === 'ios' ? 2 : 0,
                borderRadius: 16,
                width: '100%',
              }}
            >
              <View style={skin.topBarInner}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={skin.backTap}
                >
                  <Image
                    source={require('../assets/finImages/bxs_up-arrow.png')}
                  />
                </TouchableOpacity>

                <Text style={skin.topTitle}>Inner Critic Test</Text>

                <Image
                  source={require('../assets/finImages/bottomStars.png')}
                  style={skin.starStrip}
                />
              </View>
            </LinearGradient>
          </LinearGradient>

          <View style={[skin.deck, { marginTop: height * 0.11 }]}>
            {STAGES.map(stage => {
              const mood = badgeFor(stage);
              const frozen = mood === 'sleep';

              return (
                <TouchableOpacity
                  key={stage}
                  activeOpacity={0.85}
                  disabled={frozen}
                  onPress={() =>
                    navigation.navigate('CriticTestScreen', { level: stage })
                  }
                  style={{ borderRadius: 10 }}
                >
                  <LinearGradient
                    colors={['#FCE6FD', '#7F38FA']}
                    style={skin.tileFrame}
                  >
                    <View style={[skin.tile, tintFor(mood)]}>
                      <Text style={skin.tileNum}>{stage}</Text>
                      <Image source={require('../assets/finImages/star.png')} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[skin.footer, { marginTop: height * 0.14 }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('CriticTestScreen', { level: stageToPlay })
              }
            >
              <LinearGradient
                colors={['#FE9200', '#FDEF70', '#FD3213']}
                style={skin.goBtn}
              >
                <Text style={skin.goText}>START LEVEL {stageToPlay}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const skin = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    marginTop: 12,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 20,
  },
  topBarInner: {
    padding: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTap: { position: 'absolute', left: 20 },
  topTitle: { fontSize: 20, fontWeight: '900', color: '#FDEB57' },
  starStrip: {
    position: 'absolute',
    width: '100%',
    height: 60,
    zIndex: -1,
  },
  deck: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    width: '90%',
    alignSelf: 'center',
  },
  tileFrame: { borderRadius: 10 },
  tile: {
    width: 73,
    height: 90,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  sleepTile: { backgroundColor: '#381DAE' },
  clearedTile: { backgroundColor: '#AE491D' },
  nowTile: { backgroundColor: '#610EAC' },
  tileNum: { fontSize: 28, fontWeight: '900', color: '#fff' },
  lockMark: {
    marginTop: 6,
    fontSize: 10,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '800',
    letterSpacing: 1,
  },
  footer: { marginTop: 30 },
  goBtn: {
    height: 46,
    width: 220,
    alignSelf: 'center',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goText: {
    color: '#10063D',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import { useFinStore } from '../SoulRockStore/finContxt';

const RockHomeScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [finMusIdx, setFinMusIdx] = useState(0);
  const [sound, setSound] = useState(null);
  const finTracksCycle = [
    '679359__vannipat__melody-loop-mix-128-bpm.mp3',
    '679359__vannipat__melody-loop-mix-128-bpm.mp3',
  ];
  const { finSoundEnabled, setFinSoundEnabled } = useFinStore();
  const [totalScore, setTotalScore] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadFinBgMusic();
      loadTotalScore();
    }, []),
  );

  useEffect(() => {
    playFinMusic(finMusIdx);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [finMusIdx]);

  const loadTotalScore = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('flamingo_total_score');
      const parsed = stored ? parseInt(stored, 10) : 0;
      setTotalScore(Number.isFinite(parsed) ? parsed : 0);
    } catch (e) {
      console.log('loadTotalScore error:', e);
      setTotalScore(0);
    }
  }, []);

  const playFinMusic = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const finTrackPath = finTracksCycle[index];

    const newFinGameSound = new Sound(
      finTrackPath,

      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('Error =>', error);
          return;
        }

        newFinGameSound.play(success => {
          if (success) {
            setFinMusIdx(prevIndex => (prevIndex + 1) % finTracksCycle.length);
          } else {
            console.log('Error =>');
          }
        });
        setSound(newFinGameSound);
      },
    );
  };

  useEffect(() => {
    const setVolumeGameMusic = async () => {
      try {
        const finMusicValue = await AsyncStorage.getItem('toggleSound');

        const isFinMusicOn = JSON.parse(finMusicValue);
        setFinSoundEnabled(isFinMusicOn);
        if (sound) {
          sound.setVolume(isFinMusicOn ? 1 : 0);
        }
      } catch (error) {
        console.error('Error =>', error);
      }
    };

    setVolumeGameMusic();
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(finSoundEnabled ? 1 : 0);
    }
  }, [finSoundEnabled]);

  const loadFinBgMusic = async () => {
    try {
      const finMusicValue = await AsyncStorage.getItem('toggleSound');
      const isFinMusicOn = JSON.parse(finMusicValue);
      setFinSoundEnabled(isFinMusicOn);
    } catch (error) {
      console.error('Error loading fin music =>', error);
    }
  };

  const toggleSound = async selectedValue => {
    try {
      await AsyncStorage.setItem('toggleSound', JSON.stringify(selectedValue));

      setFinSoundEnabled(selectedValue);
    } catch (error) {
      console.log('Error toggle sound', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/finImages/homeBG.png')}
      style={styles.finContainer}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.contContainer, { paddingTop: height * 0.1 }]}>
          <ImageBackground
            style={styles.topFrame}
            source={require('../assets/finImages/topQ.png')}
          >
            <Text style={styles.description}>{totalScore}</Text>
          </ImageBackground>

          <View style={styles.buttonsWrapp}>
            <Image source={require('../assets/finImages/menuFrame.png')} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('LevelsScreen')}
            >
              <Image source={require('../assets/finImages/menuBtn1.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PartyZoneScreen')}
            >
              <Image source={require('../assets/finImages/menuBtn2.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('FinTapGameScreen')}
            >
              <Image source={require('../assets/finImages/menuBtn3.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('FinStoriesScreen')}
            >
              <Image source={require('../assets/finImages/menuBtn4.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ zIndex: 1, marginTop: 20 }}
              activeOpacity={0.7}
              onPress={() => toggleSound(!finSoundEnabled)}
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
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contContainer: { flex: 1, alignItems: 'center', paddingBottom: 30 },
  finContainer: {
    flex: 1,
  },
  topFrame: {
    width: 132,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 600,
  },
  buttonsWrapp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
  },
  fintitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    color: '#FDEB57',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },
  button: {
    marginTop: 30,
    width: 216,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#10063D',
    fontSize: 24,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  bottomWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default RockHomeScreen;

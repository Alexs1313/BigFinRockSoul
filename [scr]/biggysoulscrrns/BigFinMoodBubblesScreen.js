import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../biggyslcomponts/ScreenHeader';
import { moodBubblesFacts } from '../biggysouldt/moodBubblesFacts';
import { ORANGE_GRADIENT } from '../biggysoulcnsts/uiConsts';
import Orientation from 'react-native-orientation-locker';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const bigFinBackground = require('../assets/finImages/gameBg.png');
const bubbleImage = require('../assets/finImages/biggyfintbubblebok.png');

const getRandomFact = () =>
  moodBubblesFacts[Math.floor(Math.random() * moodBubblesFacts.length)];

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

export default function BigFinMoodBubblesScreen() {
  const navigation = useNavigation();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentFact, setCurrentFact] = useState('');
  const [bubbles, setBubbles] = useState([]);
  const bubbleIdRef = useRef(0);
  const spawnRef = useRef(null);
  const moveRef = useRef(null);
  const scrollPadTop = Platform.OS === 'android' ? 70 : 0;
  const sidePad = 18;

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const spawnBubble = useCallback(() => {
    setBubbles(prevDrops => {
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
        };
        tries++;
      } while (hasBubbleOverlap(fresh, prevDrops) && tries < maxTries);
      if (tries < maxTries) {
        bubbleIdRef.current += 1;
        return [...prevDrops, fresh];
      }
      return prevDrops;
    });
  }, [screenWidth]);

  useEffect(() => {
    if (!modalVisible) {
      spawnRef.current = setInterval(spawnBubble, 800);
      moveRef.current = setInterval(() => {
        setBubbles(prevDrops =>
          prevDrops
            .map(drop => ({ ...drop, y: drop.y + 14 }))
            .filter(drop => drop.y < screenHeight + 100),
        );
      }, 30);
    }
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
      if (moveRef.current) clearInterval(moveRef.current);
    };
  }, [modalVisible, screenHeight, spawnBubble]);

  const openRandomFact = useCallback(() => {
    setCurrentFact(getRandomFact());
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => setModalVisible(false), []);

  const shareFact = useCallback(() => {
    if (currentFact) {
      Share.share({ message: currentFact }).catch(() => {});
    }
  }, [currentFact]);

  return (
    <ImageBackground
      source={bigFinBackground}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView
        style={[
          styles.safe,
          { paddingTop: scrollPadTop, paddingHorizontal: sidePad },
        ]}
      >
        <ScreenHeader
          title="Mood Bubbles"
          onBack={() => navigation.goBack()}
          variant="purple"
        />
        <View style={styles.bubblesArea}>
          {bubbles.map(b => (
            <TouchableOpacity
              key={b.id}
              activeOpacity={1}
              onPress={openRandomFact}
              style={[
                styles.bubbleWrap,
                {
                  left: b.x,
                  top: b.y,
                  width: b.size,
                  height: b.size,
                },
              ]}
            >
              <Image
                source={bubbleImage}
                style={styles.bubbleImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={closeModal}
              activeOpacity={0.8}
            >
              <Image
                source={require('../assets/finImages/biggyfintbucls.png')}
              />
            </TouchableOpacity>
            <Text style={styles.modalFact}>{currentFact}</Text>
            <Image
              source={require('../assets/finImages/star.png')}
              style={styles.modalStar}
              resizeMode="contain"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={shareFact} activeOpacity={0.7}>
                <LinearGradient
                  colors={ORANGE_GRADIENT}
                  style={styles.modalBtn}
                >
                  <Text style={styles.modalBtnLabel}>Share</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
                <LinearGradient
                  colors={ORANGE_GRADIENT}
                  style={styles.modalBtn}
                >
                  <Text style={styles.modalBtnLabel}>Exit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  bubblesArea: {
    flex: 1,
    position: 'relative',
  },
  bubbleWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bookIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookIcon: { fontSize: 28 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.23)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: 'rgba(52, 18, 70, 0.81)',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'rgba(249, 205, 249, 1)',
    padding: 24,
    paddingTop: 44,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    zIndex: 1,
  },
  modalCloseX: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  modalFact: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  modalStar: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  modalBtn: {
    width: 136,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnLabel: {
    color: '#10063D',
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

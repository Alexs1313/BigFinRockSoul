import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  Modal,
  Platform,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE = {
  SCORE: 'flamingo_total_score',
  PARTY_FISH: 'party_fish_unlocked',
  FIN_GEAR: 'party_fish1_accessories',
  FIN_SKIN: 'party_fish1_skin',
};

const ART = {
  bg: require('../assets/finImages/danceBg.png'),
  back: require('../assets/finImages/bxs_up-arrow.png'),
  stars: require('../assets/finImages/bottomStars.png'),
  plus: require('../assets/finImages/addIcon.png'),
  scoreFrame: require('../assets/finImages/topQ.png'),
};

const FISH = {
  finPlain: require('../assets/finImages/acsses1.1.png'),
  finStyled: require('../assets/finImages/accses1.png'),
  f2: require('../assets/finImages/accses2.png'),
  f3: require('../assets/finImages/accses3.png'),
  f4: require('../assets/finImages/accses4.png'),
  f5: require('../assets/finImages/accses6.png'),
  f6: require('../assets/finImages/accses7.png'),
  f7: require('../assets/finImages/accses9.png'),
};

const GEAR = [
  { img: require('../assets/finImages/accses5.png') },
  { img: require('../assets/finImages/accses5.png') },
  { img: require('../assets/finImages/accses8.png') },
];

export default function PartyZoneScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const price = 30;

  const [score, setScore] = useState(0);
  const [unlockedFishCount, setUnlockedFishCount] = useState(1);
  const [finGearOwned, setFinGearOwned] = useState([0, 0, 0]);
  const [finLook, setFinLook] = useState(0);

  const [isShopOpen, setIsShopOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fishDeck = useMemo(
    () => [FISH.finPlain, FISH.f2, FISH.f3, FISH.f4, FISH.f5, FISH.f6, FISH.f7],
    [],
  );

  const fishLayout = useMemo(() => {
    return [
      { left: width * 0.52, top: height * 0.23, w: 140, h: 160 },
      { left: width * 0.2, top: height * 0.28, w: 90, h: 90 },
      { left: width * 0.13, top: height * 0.44, w: 120, h: 120 },
      { right: width * 0.05, top: height * 0.53, w: 110, h: 110 },
      { left: width * 0.4, top: height * 0.4, w: 117, h: 138 },
      { right: width * 0, top: height * 0.33, w: 95, h: 95 },
      { left: 0, top: height * 0.05, w: 92, h: 67 },
    ];
  }, [width, height]);

  const gearLayout = useMemo(() => {
    return [
      {
        img: GEAR[0].img,
        style: { position: 'absolute', left: 0, top: height * 0.24 },
      },
      {
        img: GEAR[1].img,
        style: { position: 'absolute', left: width * 0.08, top: height * 0.16 },
      },
      {
        img: GEAR[2].img,
        style: { position: 'absolute', left: 0, top: height * 0.6 },
      },
    ];
  }, [width, height]);

  const plusLayout = useMemo(() => {
    return [
      { left: width * 0.08, top: height * 0.44 },
      { left: width * 0.46, top: height * 0.3 },
      { left: width * 0.22, top: height * 0.68 },
    ];
  }, [width, height]);

  const hydrate = useCallback(async () => {
    try {
      const rawScore = await AsyncStorage.getItem(STORE.SCORE);
      const parsedScore = rawScore ? parseInt(rawScore, 10) : 0;
      setScore(Number.isFinite(parsedScore) ? parsedScore : 0);

      const rawFish = await AsyncStorage.getItem(STORE.PARTY_FISH);
      const parsedFish = rawFish ? parseInt(rawFish, 10) : 1;
      setUnlockedFishCount(
        Math.max(1, Math.min(7, Number.isFinite(parsedFish) ? parsedFish : 1)),
      );

      const rawGear = await AsyncStorage.getItem(STORE.FIN_GEAR);
      if (rawGear) {
        const parsed = JSON.parse(rawGear);
        if (Array.isArray(parsed) && parsed.length === 3) {
          setFinGearOwned(parsed.map(v => (v ? 1 : 0)));
        }
      } else {
        await AsyncStorage.setItem(STORE.FIN_GEAR, JSON.stringify([0, 0, 0]));
        setFinGearOwned([0, 0, 0]);
      }

      const rawLook = await AsyncStorage.getItem(STORE.FIN_SKIN);
      if (rawLook === null) {
        await AsyncStorage.setItem(STORE.FIN_SKIN, '0');
        setFinLook(0);
      } else {
        setFinLook(Number(rawLook) ? 1 : 0);
      }
    } catch (e) {
      console.log('PartyZone load error:', e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      hydrate();
    }, [hydrate]),
  );

  const openShop = slot => {
    if (finGearOwned[slot] === 1) return;
    setSelectedSlot(slot);
    setIsShopOpen(true);
  };

  const closeShop = () => {
    setIsShopOpen(false);
    setSelectedSlot(null);
  };

  const confirmBuy = async () => {
    if (selectedSlot === null) return;

    closeShop();

    if (finGearOwned[selectedSlot] === 1) return;

    const nextScore = score - price;
    const nextOwned = [...finGearOwned];
    nextOwned[selectedSlot] = 1;

    let nextLook = finLook;
    if (selectedSlot === 1) nextLook = 1;

    if (nextScore < 0) {
      Alert.alert(
        'Not enough points',
        'You do not have enough points to buy this accessory.',
      );

      return;
    }

    try {
      await AsyncStorage.setItem(STORE.SCORE, String(nextScore));
      await AsyncStorage.setItem(STORE.FIN_GEAR, JSON.stringify(nextOwned));
      await AsyncStorage.setItem(STORE.FIN_SKIN, String(nextLook));

      setScore(nextScore);
      setFinGearOwned(nextOwned);
      setFinLook(nextLook);
    } catch (e) {
      console.log('buyAccessory error:', e);
    }
  };

  return (
    <ImageBackground source={ART.bg} style={ui.shell} resizeMode="cover">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: Platform.OS === 'android' ? height * 0.07 : 0,
          height: '600',
        }}
      >
        <SafeAreaView style={ui.safe}>
          <View style={ui.topArea}>
            <LinearGradient
              colors={['#FCE6FD', '#C738FA']}
              style={ui.titleWrap}
            >
              <LinearGradient
                colors={['#610EAC', '#C83DD7']}
                style={ui.titleStroke}
              >
                <View style={ui.titleCard}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={ui.backTap}
                    activeOpacity={0.8}
                  >
                    <Image source={ART.back} />
                  </TouchableOpacity>

                  <Text style={ui.title}>Party Zone</Text>

                  <Image
                    source={ART.stars}
                    style={ui.stars}
                    resizeMode="stretch"
                  />
                </View>
              </LinearGradient>
            </LinearGradient>

            <ImageBackground style={ui.scoreFrame} source={ART.scoreFrame}>
              <Text style={ui.scoreText}>{score}</Text>
            </ImageBackground>
          </View>

          <View style={ui.stage}>
            {gearLayout.map((g, slot) => {
              if (!finGearOwned[slot]) return null;
              if (slot === 1 && finLook === 1) return null;

              return (
                <Image
                  key={slot}
                  source={g.img}
                  style={g.style}
                  resizeMode="contain"
                />
              );
            })}

            {fishDeck.slice(0, unlockedFishCount).map((img, i) => {
              const p = fishLayout[i] || fishLayout[0];

              const fishImg =
                i === 0
                  ? finLook === 1
                    ? FISH.finStyled
                    : FISH.finPlain
                  : img;

              return (
                <Image
                  key={i}
                  source={fishImg}
                  resizeMode="contain"
                  style={[
                    ui.fish,
                    {
                      position: 'absolute',
                      left: p.left,
                      right: p.right,
                      top: p.top,
                      bottom: p.bottom,
                      width: p.w,
                      height: p.h,
                    },
                  ]}
                />
              );
            })}

            {plusLayout.map((pos, slot) => {
              if (finGearOwned[slot] === 1) return null;

              return (
                <TouchableOpacity
                  key={slot}
                  activeOpacity={0.85}
                  onPress={() => openShop(slot)}
                  style={[
                    ui.plusTap,
                    { position: 'absolute', left: pos.left, top: pos.top },
                  ]}
                >
                  <Image source={ART.plus} />
                </TouchableOpacity>
              );
            })}
          </View>

          <Modal
            transparent
            visible={isShopOpen}
            animationType="fade"
            onRequestClose={closeShop}
          >
            <View style={ui.dim}>
              <View style={ui.dialogShell}>
                <LinearGradient
                  colors={['#610EAC', '#C83DD7']}
                  style={ui.dialog}
                >
                  <View style={{ padding: 18, paddingTop: 24 }}>
                    <Text style={ui.dialogTitle}>Add accessory for:</Text>

                    <View style={ui.priceRow}>
                      <Text style={ui.priceText}>{price}</Text>
                      <Image source={require('../assets/finImages/flam.png')} />
                    </View>

                    <View style={ui.dialogActions}>
                      <PillButton label="No" onPress={closeShop} />
                      <PillButton label="Yes" onPress={confirmBuy} />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

function PillButton({ label, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient colors={['#1E033D', '#1E033D']} style={ui.pill}>
        <Text style={ui.pillText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const ui = StyleSheet.create({
  shell: { flex: 1 },
  safe: { flex: 1 },
  topArea: { alignItems: 'center' },
  titleWrap: { width: '92%', borderRadius: 16, padding: 2 },
  titleStroke: { borderRadius: 14, padding: 2 },
  titleCard: {
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backTap: { position: 'absolute', left: 20, zIndex: 2 },
  title: { fontSize: 22, fontWeight: '900', color: '#FDEB57' },
  stars: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 54,
    opacity: 0.9,
  },
  scoreFrame: {
    width: 132,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  scoreText: {
    color: '#FDEB57',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },
  stage: { flex: 1, position: 'relative' },
  fish: { zIndex: 3 },
  plusTap: { zIndex: 10 },
  dim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  dialogShell: {
    width: '88%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F9CDF9',
    overflow: 'hidden',
  },
  dialog: { borderRadius: 16 },
  dialogTitle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
  },
  priceRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  priceText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  priceEmoji: { fontSize: 22 },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 10,
  },
  pill: {
    width: 120,
    height: 44,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#691D7A',
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

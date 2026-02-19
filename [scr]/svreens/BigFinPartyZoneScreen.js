import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground as FinBack,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigFinPillButton from '../components/BigFinPillButton';
import ScreenHeader from '../components/ScreenHeader';
import {
  partyZoneAccessoryLayers,
  partyZoneAssets,
  partyZoneFishImages,
} from '../data/partyZoneAssets';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';

const bigFinStorageKeys = {
  totalScore: 'flamingo_total_score',
  unlockedFish: 'party_fish_unlocked',
  fishAccessories: 'party_fish1_accessories',
  fishSkin: 'party_fish1_skin',
};

const bigFinSafeNumber = n => (Number.isFinite(n) ? n : 0);

export default function BigFinPartyZoneScreen() {
  const navigation = useNavigation();
  const {
    width: bigFinWidth,
    height: bigFinHeight,
    pick,
    scrollBottom,
  } = useAdaptiveSizes();

  const bigFinAccessoryPrice = 30;

  const scrollPadTop = Platform.OS === 'android' ? bigFinHeight * 0.07 : 0;
  const scoreBadgeW = pick(110, 122, 132);
  const scoreBadgeH = pick(28, 32, 34);
  const scoreBadgeMarginT = pick(14, 18, 20);
  const scoreTextSize = pick(16, 18, 20);
  const modalCardWidth = pick(82, 85, 88);
  const modalPad = pick(14, 16, 18);
  const modalPadT = pick(18, 22, 24);
  const modalTitleSize = pick(16, 18, 20);
  const modalPriceSize = pick(18, 20, 22);
  const modalButtonsGap = pick(12, 14, 16);
  const modalButtonsMarginT = pick(8, 10, 10);

  const [bigFinScore, setBigFinScore] = useState(0);
  const [bigFinUnlockedFishCount, setBigFinUnlockedFishCount] = useState(1);
  const [bigFinOwnedAccessories, setBigFinOwnedAccessories] = useState([
    0, 0, 0,
  ]);
  const [bigFinSkinFlag, setBigFinSkinFlag] = useState(0);

  const [bigFinModalVisible, setBigFinModalVisible] = useState(false);
  const [bigFinSelectedSlot, setBigFinSelectedSlot] = useState(null);

  const bigFinDecorKeys = [
    partyZoneFishImages.base,
    partyZoneFishImages.fish2,
    partyZoneFishImages.fish3,
    partyZoneFishImages.fish4,
    partyZoneFishImages.fish6,
    partyZoneFishImages.fish7,
    partyZoneFishImages.fish9,
  ];

  const bigFinFishPositions = useMemo(() => {
    return [
      { left: bigFinWidth * 0.52, top: bigFinHeight * 0.23, w: 140, h: 160 },
      { left: bigFinWidth * 0.2, top: bigFinHeight * 0.28, w: 90, h: 90 },
      { left: bigFinWidth * 0.13, top: bigFinHeight * 0.44, w: 120, h: 120 },
      { right: bigFinWidth * 0.05, top: bigFinHeight * 0.53, w: 110, h: 110 },
      { left: bigFinWidth * 0.4, top: bigFinHeight * 0.4, w: 117, h: 138 },
      { right: bigFinWidth * 0, top: bigFinHeight * 0.33, w: 95, h: 95 },
      { left: 0, top: bigFinHeight * 0.05, w: 92, h: 67 },
    ];
  }, [bigFinWidth, bigFinHeight]);

  const bigFinAccessoryLayerDefs = useMemo(() => {
    return [
      {
        img: partyZoneAccessoryLayers[0].img,
        style: { position: 'absolute', left: 0, top: bigFinHeight * 0.24 },
      },
      {
        img: partyZoneAccessoryLayers[1].img,
        style: {
          position: 'absolute',
          left: bigFinWidth * 0.08,
          top: bigFinHeight * 0.16,
        },
      },
      {
        img: partyZoneAccessoryLayers[2].img,
        style: { position: 'absolute', left: 0, top: bigFinHeight * 0.6 },
      },
    ];
  }, [bigFinWidth, bigFinHeight]);

  const bigFinAddButtonPositions = useMemo(() => {
    return [
      { left: bigFinWidth * 0.08, top: bigFinHeight * 0.44 },
      { left: bigFinWidth * 0.46, top: bigFinHeight * 0.3 },
      { left: bigFinWidth * 0.22, top: bigFinHeight * 0.68 },
    ];
  }, [bigFinWidth, bigFinHeight]);

  const bigFinLoadPartyZone = useCallback(async () => {
    try {
      const storedScores = await AsyncStorage.getItem(
        bigFinStorageKeys.totalScore,
      );

      const parsedScore = storedScores ? parseInt(storedScores, 10) : 0;

      setBigFinScore(bigFinSafeNumber(parsedScore));

      const storedUnlocked = await AsyncStorage.getItem(
        bigFinStorageKeys.unlockedFish,
      );
      const parsedUnlocked = storedUnlocked ? parseInt(storedUnlocked, 10) : 1;

      setBigFinUnlockedFishCount(
        Math.max(1, Math.min(7, bigFinSafeNumber(parsedUnlocked || 1))),
      );

      const storedAccessories = await AsyncStorage.getItem(
        bigFinStorageKeys.fishAccessories,
      );
      if (storedAccessories) {
        const parsedAccessories = JSON.parse(storedAccessories);

        if (
          Array.isArray(parsedAccessories) &&
          parsedAccessories.length === 3
        ) {
          setBigFinOwnedAccessories(parsedAccessories.map(v => (v ? 1 : 0)));
        }
      } else {
        await AsyncStorage.setItem(
          bigFinStorageKeys.fishAccessories,

          JSON.stringify([0, 0, 0]),
        );
        setBigFinOwnedAccessories([0, 0, 0]);
      }

      const storedFinSkins = await AsyncStorage.getItem(
        bigFinStorageKeys.fishSkin,
      );

      if (storedFinSkins === null) {
        await AsyncStorage.setItem(bigFinStorageKeys.fishSkin, '0');
        setBigFinSkinFlag(0);
      } else {
        setBigFinSkinFlag(Number(storedFinSkins) ? 1 : 0);
      }
    } catch (e) {
      console.log('Party error:', e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      bigFinLoadPartyZone();
    }, [bigFinLoadPartyZone]),
  );

  const openSlotModal = slotIndex => {
    if (bigFinOwnedAccessories[slotIndex] === 1) return;

    setBigFinSelectedSlot(slotIndex);

    setBigFinModalVisible(true);
  };

  const closeModrl = () => {
    setBigFinModalVisible(false);
    setBigFinSelectedSlot(null);
  };

  const confBuyAcccss = useCallback(async () => {
    if (bigFinSelectedSlot === null) return;

    closeModrl();

    if (bigFinOwnedAccessories[bigFinSelectedSlot] === 1) return;

    const nextScore = bigFinScore - bigFinAccessoryPrice;

    const nextOwned = [...bigFinOwnedAccessories];

    nextOwned[bigFinSelectedSlot] = 1;

    let nextSkin = bigFinSkinFlag;

    if (bigFinSelectedSlot === 1) nextSkin = 1;

    if (nextScore < 0) {
      Alert.alert(
        'Not enough points',
        'You do not have enough points to buy this accessory.',
      );
      return;
    }

    try {
      await AsyncStorage.setItem(
        bigFinStorageKeys.totalScore,
        String(nextScore),
      );
      await AsyncStorage.setItem(
        bigFinStorageKeys.fishAccessories,
        JSON.stringify(nextOwned),
      );
      await AsyncStorage.setItem(bigFinStorageKeys.fishSkin, String(nextSkin));

      setBigFinScore(nextScore);
      setBigFinOwnedAccessories(nextOwned);
      setBigFinSkinFlag(nextSkin);
    } catch (e) {
      console.log('error:', e);
    }
  }, [
    bigFinSelectedSlot,
    bigFinOwnedAccessories,
    bigFinScore,
    bigFinAccessoryPrice,
    bigFinSkinFlag,
  ]);

  return (
    <FinBack
      source={partyZoneAssets.danceBg}
      style={stules.cont}
      resizeMode="cover"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: scrollPadTop,
          paddingBottom: scrollBottom,
        }}
      >
        <SafeAreaView style={stules.safe}>
          <View style={stules.headerWrap}>
            <ScreenHeader
              title="Party Zone"
              onBack={() => navigation.goBack()}
              width="92%"
            />

            <FinBack
              style={[
                stules.scoreBadge,
                {
                  width: scoreBadgeW,
                  height: scoreBadgeH,
                  marginTop: scoreBadgeMarginT,
                },
              ]}
              source={partyZoneAssets.topBadge}
            >
              <Text style={[stules.scoretext, { fontSize: scoreTextSize }]}>
                {bigFinScore}
              </Text>
            </FinBack>
          </View>

          <View style={stules.stage}>
            {bigFinAccessoryLayerDefs.map((layer, slotIndex) => {
              if (!bigFinOwnedAccessories[slotIndex]) return null;
              if (slotIndex === 1 && bigFinSkinFlag === 1) return null;

              return (
                <Image
                  key={slotIndex}
                  source={layer.img}
                  style={layer.style}
                  resizeMode="contain"
                />
              );
            })}

            {bigFinDecorKeys.slice(0, bigFinUnlockedFishCount).map((img, i) => {
              const pos = bigFinFishPositions[i] || bigFinFishPositions[0];

              const finalImg =
                i === 0
                  ? bigFinSkinFlag === 1
                    ? partyZoneFishImages.baseAlt
                    : partyZoneFishImages.base
                  : img;

              return (
                <Image
                  key={i}
                  source={finalImg}
                  resizeMode="contain"
                  style={[
                    stules.fishLayer,
                    {
                      position: 'absolute',
                      left: pos.left,
                      right: pos.right,
                      top: pos.top,
                      bottom: pos.bottom,
                      width: pos.w,
                      height: pos.h,
                    },
                  ]}
                />
              );
            })}

            {bigFinAddButtonPositions.map((pos, slotIndex) => {
              if (bigFinOwnedAccessories[slotIndex] === 1) return null;

              return (
                <TouchableOpacity
                  key={slotIndex}
                  activeOpacity={0.85}
                  onPress={() => openSlotModal(slotIndex)}
                  style={[
                    stules.addBtn,
                    { position: 'absolute', left: pos.left, top: pos.top },
                  ]}
                >
                  <Image source={partyZoneAssets.addIcon} />
                </TouchableOpacity>
              );
            })}
          </View>

          <Modal
            transparent
            visible={bigFinModalVisible}
            animationType="fade"
            onRequestClose={closeModrl}
          >
            <View
              style={[stules.modalOverlay, { paddingHorizontal: modalPad }]}
            >
              <View style={[stules.modalCard, { width: `${modalCardWidth}%` }]}>
                <LinearGradient
                  colors={['#610EAC', '#C83DD7']}
                  style={stules.modalGradient}
                >
                  <View style={{ padding: modalPad, paddingTop: modalPadT }}>
                    <Text
                      style={[stules.modalTitle, { fontSize: modalTitleSize }]}
                    >
                      Add accessory for:
                    </Text>

                    <View style={stules.priceRow}>
                      <Text
                        style={[stules.priceTxt, { fontSize: modalPriceSize }]}
                      >
                        {bigFinAccessoryPrice}
                      </Text>
                      <Image source={partyZoneAssets.flamIcon} />
                    </View>

                    <View
                      style={[
                        stules.modalBtnsRow,
                        {
                          gap: modalButtonsGap,
                          marginTop: modalButtonsMarginT,
                        },
                      ]}
                    >
                      <BigFinPillButton label="No" onPress={closeModrl} />
                      <BigFinPillButton label="Yes" onPress={confBuyAcccss} />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    </FinBack>
  );
}

const stules = StyleSheet.create({
  cont: { flex: 1 },
  safe: { flex: 1 },
  headerWrap: { alignItems: 'center' },
  scoreBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoretext: {
    color: '#FDEB57',
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },
  stage: { flex: 1, position: 'relative' },
  fishLayer: { zIndex: 3 },
  addBtn: { zIndex: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F9CDF9',
    overflow: 'hidden',
  },
  modalGradient: { borderRadius: 16 },
  modalTitle: {
    textAlign: 'center',
    color: '#FFFFFF',
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
  priceTxt: { color: '#FFFFFF', fontWeight: '900' },
  modalBtnsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

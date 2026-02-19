import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigFinShareButton from '../components/BigFinShareButton';
import { stories as bigFinStories } from '../data/soulStories';
import ScreenHeader from '../components/ScreenHeader';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';

const bigFinBackground = require('../assets/finImages/gameBg.png');

const bigFinStorageKeys = {
  unlockedStoriesCount: 'stories_unlocked_count',
};

const bigFinSafeNumber = number => (Number.isFinite(number) ? number : 0);

export default function BigFinStoriesScreen() {
  const navigation = useNavigation();
  const { height, pick, xS, s, scrollBottom, sidePad } = useAdaptiveSizes();

  const scrollPadTop = Platform.OS === 'android' ? height * 0.07 : 0;
  const cardPadding = pick(10, 12, 16);
  const cardPaddingV = pick(14, 16, 19);
  const cardRadius = pick(14, 16, 18);
  const labelSize = pick(16, 18, 20);
  const bodySize = pick(14, 16, 20);
  const storyImgSize = pick(130, 165, 200);
  const actionsGap = pick(14, 16, 20);
  const actionsMarginT = pick(10, 12, 12);
  const actionBtnW = pick(116, 128, 136);
  const actionBtnH = pick(38, 42, 44);
  const actionBtnRadius = pick(40, 45, 50);
  const actionTextSize = pick(14, 15, 16);
  const emptyTextSize = pick(14, 15, 16);

  const [bigFinUnlockedCount, setBigFinUnlockedCount] = useState(0);
  const [bigFinActiveIndex, setBigFinActiveIndex] = useState(0);

  const bigFinReadUnlockedCount = useCallback(async () => {
    try {
      const storiesCount = await AsyncStorage.getItem(
        bigFinStorageKeys.unlockedStoriesCount,
      );
      const parsed = storiesCount ? parseInt(storiesCount, 10) : 0;

      return bigFinSafeNumber(parsed);
    } catch (e) {
      console.log('stories error', e);
      return 0;
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const getSavedCount = async () => {
        const count = await bigFinReadUnlockedCount();

        setBigFinUnlockedCount(count);

        setBigFinActiveIndex(0);
      };
      getSavedCount();
    }, [bigFinReadUnlockedCount]),
  );

  const isAvstort = useMemo(
    () => bigFinStories.slice(0, bigFinUnlockedCount),
    [bigFinUnlockedCount],
  );

  const bigFinHasStories = isAvstort.length > 0;
  const bigFinActiveStory = bigFinHasStories
    ? isAvstort[bigFinActiveIndex]
    : null;

  const bigFinHasNext = isAvstort.length > 1;

  const bigFinGoBack = () => navigation.goBack();

  const bigFinGoNext = () => {
    if (!bigFinHasStories) return;
    setBigFinActiveIndex(prev => (prev + 1) % isAvstort.length);
  };

  const bigFinShare = async () => {
    if (!bigFinActiveStory) return;

    const sharedInfo =
      `Story: ${bigFinActiveStory.title}\n` +
      `${bigFinActiveStory.story}\n` +
      `Message: ${bigFinActiveStory.message}`;

    await Share.share({ message: sharedInfo });
  };

  const BigFinContent = () => {
    if (!bigFinHasStories) {
      return (
        <View style={bigFinStyles.emptyWrap}>
          <Text style={[bigFinStyles.emptyText, { fontSize: emptyTextSize }]}>
            You have no stories available.
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          bigFinStyles.storycrd,
          {
            padding: cardPadding,
            paddingVertical: cardPaddingV,
            borderRadius: cardRadius,
          },
        ]}
      >
        <Text style={[bigFinStyles.lbl, { fontSize: labelSize }]}>Story:</Text>
        <Text style={[bigFinStyles.descr, { fontSize: bodySize }]}>
          {bigFinActiveStory.story}
        </Text>

        <Text style={[bigFinStyles.lbl, bigFinStyles.lblGap]}>Message:</Text>
        <Text style={[bigFinStyles.descr, { fontSize: bodySize }]}>
          {bigFinActiveStory.message}
        </Text>

        <Image
          source={bigFinActiveStory.img}
          style={[
            bigFinStyles.storyimg,
            { height: storyImgSize, width: storyImgSize },
          ]}
          resizeMode="contain"
        />
      </View>
    );
  };

  const BigFinActions = () => {
    if (!bigFinHasStories) return null;

    return (
      <View
        style={[
          bigFinStyles.buttonsWrap,
          { gap: actionsGap, marginTop: actionsMarginT },
        ]}
      >
        <BigFinShareButton
          onPress={bigFinShare}
          width={actionBtnW}
          height={actionBtnH}
          borderRadius={actionBtnRadius}
          fontSize={actionTextSize}
        />

        {bigFinHasNext && (
          <BigFinShareButton
            label="Next"
            onPress={bigFinGoNext}
            width={actionBtnW}
            height={actionBtnH}
            borderRadius={actionBtnRadius}
            fontSize={actionTextSize}
          />
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={bigFinBackground}
      style={bigFinStyles.cont}
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
        <SafeAreaView style={[bigFinStyles.safeAr, { padding: sidePad }]}>
          <ScreenHeader title="Ocean Diaries" onBack={bigFinGoBack} />
          <BigFinContent />
          <BigFinActions />
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const bigFinStyles = StyleSheet.create({
  cont: { flex: 1 },

  safeAr: { flex: 1 },

  storycrd: {
    width: '90%',
    backgroundColor: '#f282f0ff',
    borderWidth: 3,
    borderColor: '#f7f7f7ff',
    alignSelf: 'center',
  },

  lbl: {
    fontWeight: '500',
    color: '#fff',
    marginBottom: 6,
    fontSize: 18,
  },

  lblGap: { marginTop: 12 },

  descr: { fontWeight: '500', color: '#fff' },

  storyimg: { alignSelf: 'flex-end' },

  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  emptyText: { color: '#fff' },
});

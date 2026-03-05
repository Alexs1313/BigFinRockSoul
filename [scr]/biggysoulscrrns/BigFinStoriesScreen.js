import BigFinShareButton from '../biggyslcomponts/BigFinShareButton';
import { stories as bigFinStories } from '../biggysouldt/soulStories';
import ScreenHeader from '../biggyslcomponts/ScreenHeader';
import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const bigFinBackground = require('../assets/finImages/gameBg.png');

export default function BigFinStoriesScreen() {
  const navigation = useNavigation();
  const scrollPadTop = Platform.OS === 'android' ? 70 : 0;
  const scrollBottom = 120;
  const sidePad = 18;
  const cardPadding = 16;
  const cardPaddingV = 19;
  const cardRadius = 18;
  const labelSize = 20;
  const bodySize = 20;
  const storyImgSize = 200;
  const actionsMarginT = 12;
  const emptyTextSize = 16;
  const cardGap = 20;

  const bigFinGoBack = () => navigation.goBack();

  const shareStory = async story => {
    const sharedInfo =
      `Story: ${story.title}\n` +
      `${story.story}\n` +
      `Message: ${story.message}`;
    await Share.share({ message: sharedInfo });
  };

  const scrollContentStyle = {
    ...bigFinStyles.scrollCont,
    paddingTop: scrollPadTop,
    paddingBottom: scrollBottom,
  };

  if (bigFinStories.length === 0) {
    return (
      <ImageBackground
        source={bigFinBackground}
        style={bigFinStyles.cont}
        resizeMode="cover"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={scrollContentStyle}
        >
          <SafeAreaView style={[bigFinStyles.safeAr, { padding: sidePad }]}>
            <ScreenHeader title="Ocean Diaries" onBack={bigFinGoBack} />
            <View style={bigFinStyles.emptyWrap}>
              <Text
                style={[bigFinStyles.emptyText, { fontSize: emptyTextSize }]}
              >
                You have no stories available.
              </Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={bigFinBackground}
      style={bigFinStyles.cont}
      resizeMode="cover"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={scrollContentStyle}
      >
        <SafeAreaView style={[bigFinStyles.safeAr, { padding: sidePad }]}>
          <ScreenHeader title="Ocean Diaries" onBack={bigFinGoBack} />
          {bigFinStories.map((story, index) => (
            <View
              key={story.id ?? index}
              style={[
                bigFinStyles.cardWrap,
                index > 0 && { marginTop: cardGap },
              ]}
            >
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
                <Text style={[bigFinStyles.lbl, { fontSize: labelSize }]}>
                  Story:
                </Text>
                <Text style={[bigFinStyles.descr, { fontSize: bodySize }]}>
                  {story.story}
                </Text>
                <Text style={[bigFinStyles.lbl, bigFinStyles.lblGap]}>
                  Message:
                </Text>
                <Text style={[bigFinStyles.descr, { fontSize: bodySize }]}>
                  {story.message}
                </Text>
                <Image
                  source={story.img}
                  style={[
                    bigFinStyles.storyimg,
                    { height: storyImgSize, width: storyImgSize },
                  ]}
                  resizeMode="contain"
                />
              </View>
              <View
                style={[bigFinStyles.shareWrap, { marginTop: actionsMarginT }]}
              >
                <BigFinShareButton onPress={() => shareStory(story)} />
              </View>
            </View>
          ))}
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const bigFinStyles = StyleSheet.create({
  cont: { flex: 1 },

  safeAr: { flex: 1 },
  scrollCont: { flexGrow: 1 },

  cardWrap: { width: '100%' },
  storycrd: {
    width: '90%',
    backgroundColor: '#341246E5',
    borderWidth: 3,
    borderColor: '#F9CDF9',
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

  shareWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  emptyText: { color: '#fff' },
});

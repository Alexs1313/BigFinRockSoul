import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  Share,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stories } from '../finData/soulStories';

const bgImg = require('../assets/finImages/gameBg.png');

const STORY_STORAGE = {
  STORIES_UNLOCKED: 'stories_unlocked_count',
};

export default function FinStoriesScreen() {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const [openedStoriesCount, setOpenedStoriesCount] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const readUnlockedCount = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORY_STORAGE.STORIES_UNLOCKED);
      const parsed = saved ? parseInt(saved, 10) : 0;
      return Number.isFinite(parsed) ? parsed : 0;
    } catch (e) {
      console.log('readUnlockedCount error:', e);
      return 0;
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const sync = async () => {
        const count = await readUnlockedCount();
        setOpenedStoriesCount(count);
        setActiveStoryIndex(0);
      };
      sync();
    }, [readUnlockedCount]),
  );

  const availableStories = useMemo(() => {
    return stories.slice(0, openedStoriesCount);
  }, [openedStoriesCount]);

  const hasUnlockedStories = availableStories.length > 0;
  const activeStory = hasUnlockedStories
    ? availableStories[activeStoryIndex]
    : null;

  const canGoNext = availableStories.length > 1;

  const goBack = () => navigation.goBack();

  const goNextStory = () => {
    if (!hasUnlockedStories) return;
    setActiveStoryIndex(prev => (prev + 1) % availableStories.length);
  };

  const shareStory = async () => {
    if (!activeStory) return;

    const text =
      `Story: ${activeStory.title}\n` +
      `${activeStory.story}\n` +
      `Message: ${activeStory.message}`;

    try {
      await Share.share({ message: text });
    } catch (e) {
      console.log('Share error:', e);
    }
  };

  const StoryCard = () => {
    if (!hasUnlockedStories) {
      return (
        <View style={styles.emptyStateWrap}>
          <Text style={styles.emptyStateText}>
            You have no stories available.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.storyCard}>
        <Text style={styles.sectionLabel}>Story:</Text>
        <Text style={styles.storyBody}>{activeStory.story}</Text>

        <Text style={[styles.sectionLabel, styles.messageLabel]}>Message:</Text>
        <Text style={styles.storyBody}>{activeStory.message}</Text>

        <Image source={activeStory.img} style={styles.fish} />
      </View>
    );
  };

  const Header = () => (
    <LinearGradient
      colors={['#FCE6FD', '#C738FA']}
      style={[styles.topBar, { marginBottom: height * 0.06 }]}
    >
      <LinearGradient
        colors={['#610EAC', '#C83DD7']}
        style={{
          padding: Platform.OS === 'ios' ? 2 : 0,
          borderRadius: 16,
          width: '100%',
        }}
      >
        <View style={styles.topBarInner}>
          <TouchableOpacity onPress={goBack} style={styles.back}>
            <Image source={require('../assets/finImages/bxs_up-arrow.png')} />
          </TouchableOpacity>

          <Text style={styles.topBarTitle}>Ocean Diaries</Text>

          <Image
            source={require('../assets/finImages/bottomStars.png')}
            style={styles.bottomStars}
          />
        </View>
      </LinearGradient>
    </LinearGradient>
  );

  const ActionButtons = () => {
    if (!hasUnlockedStories) return null;

    return (
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={shareStory} activeOpacity={0.7}>
          <LinearGradient
            colors={['#DE78E9', '#3D2498']}
            style={styles.pillButton}
          >
            <Text style={styles.pillText}>Share</Text>
          </LinearGradient>
        </TouchableOpacity>

        {canGoNext && (
          <TouchableOpacity onPress={goNextStory} activeOpacity={0.7}>
            <LinearGradient
              colors={['#DE78E9', '#3D2498']}
              style={styles.pillButton}
            >
              <Text style={styles.pillText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={bgImg}
      style={styles.screenRoot}
      resizeMode="cover"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: Platform.OS === 'android' ? height * 0.07 : 0,
          paddingBottom: 20,
        }}
      >
        <SafeAreaView style={styles.safeZone}>
          <Header />
          <StoryCard />
          <ActionButtons />
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenRoot: { flex: 1 },
  safeZone: { flex: 1, padding: 16 },
  bottomStars: {
    position: 'absolute',
    width: '100%',
    height: 60,
    zIndex: -1,
  },
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
  back: {
    position: 'absolute',
    left: 20,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FDEB57',
  },
  storyCard: {
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#341246E5',
    padding: 9,
    paddingVertical: 19,
    borderWidth: 3,
    borderColor: '#F9CDF9',
    alignSelf: 'center',
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 6,
  },
  messageLabel: { marginTop: 12 },
  storyBody: { fontSize: 20, fontWeight: '500', color: '#fff' },
  fish: { alignSelf: 'flex-end' },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },
  pillButton: {
    width: 136,
    height: 44,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  emptyStateWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyStateText: { color: '#fff', fontSize: 16 },
});

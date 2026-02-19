import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import BubbleItem from './BubbleItem';
import ScreenHeader from './ScreenHeader';
import LinearGradient from 'react-native-linear-gradient';

export default function TapGamePlayScreen({
  styles,
  sizes,
  navigation,
  secondsLeft,
  drops,
  onPopBubble,
  onPause,
  paused,
  soundEnabled,
  onToggleSound,
  formatTimer,
  onExitToMenu,
}) {
  const { pauseCardPad, pauseActionH, pauseActionTextSize } = sizes;

  return (
    <ImageBackground
      source={require('../assets/finImages/gameBg.png')}
      style={styles.tapScreen}
    >
      <SafeAreaView style={styles.tapSafeArea}>
        <ScreenHeader
          title="Tap"
          onBack={() => navigation.goBack()}
          variant="purple"
        />

        <View style={styles.tapToolbarRow}>
          <View style={styles.tapTimerBadge}>
            <Text style={styles.tapTimerValue}>{formatTimer(secondsLeft)}</Text>
          </View>
          <TouchableOpacity
            onPress={onPause}
            style={styles.tapPauseButton}
            activeOpacity={0.7}
          >
            <Image
              source={require('../assets/finImages/solar_pause-bold.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tapBubblesArea}>
          {drops.map(item => (
            <BubbleItem
              key={item.id}
              item={item}
              onPop={onPopBubble}
              styles={styles}
            />
          ))}
        </View>

        {paused && (
          <View style={styles.tapPauseOverlay}>
            <LinearGradient
              colors={['#610EAC', '#C83DD7']}
              style={styles.tapPauseCard}
            >
              <View
                style={{
                  padding: pauseCardPad,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={onPause}
                  activeOpacity={0.7}
                  style={[styles.tapPauseActionBtn, { height: pauseActionH }]}
                >
                  <Text
                    style={[
                      styles.tapPauseActionLabel,
                      { fontSize: pauseActionTextSize },
                    ]}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tapPauseActionBtn, { height: pauseActionH }]}
                  activeOpacity={0.7}
                  onPress={onExitToMenu}
                >
                  <Text
                    style={[
                      styles.tapPauseActionLabel,
                      { fontSize: pauseActionTextSize },
                    ]}
                  >
                    Main Menu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tapSoundButton}
                  activeOpacity={0.7}
                  onPress={() => onToggleSound(!soundEnabled)}
                >
                  <Image
                    source={
                      soundEnabled
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

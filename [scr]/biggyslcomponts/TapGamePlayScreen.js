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
  navigation,
  secondsLeft,
  drops,
  onPopBubble,
  onPause,
  onRetry,
  paused,
  soundEnabled,
  onToggleSound,
  formatTimer,
  onExitToMenu,
}) {
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
              <View style={styles.tapPauseCardContent}>
                <TouchableOpacity
                  onPress={onPause}
                  activeOpacity={0.7}
                  style={styles.tapPauseActionBtn}
                >
                  <Text style={styles.tapPauseActionLabel}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onRetry}
                  activeOpacity={0.7}
                  style={styles.tapPauseActionBtn}
                >
                  <Text style={styles.tapPauseActionLabel}>Retry</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tapPauseActionBtn}
                  activeOpacity={0.7}
                  onPress={onExitToMenu}
                >
                  <Text style={styles.tapPauseActionLabel}>Main Menu</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function BigFinLevelCard({
  level,
  mode,
  onPress,
  cardWidth,
  cardHeight,
  cardInnerMargin,
  cardInnerRadius,
  levelTextSize,
}) {
  const disabled = mode === 'locked';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={{ borderRadius: 10 }}
    >
      <LinearGradient colors={['#FCE6FD', '#7F38FA']} style={styles.cardOuter}>
        <View
          style={[
            styles.cardInner,
            {
              width: cardWidth,
              height: cardHeight,
              margin: cardInnerMargin,
              borderRadius: cardInnerRadius,
            },
            mode === 'completed'
              ? styles.levelCompleted
              : mode === 'next'
              ? styles.levelNext
              : styles.levelLocked,
          ]}
        >
          <Text style={[styles.levelText, { fontSize: levelTextSize }]}>
            {level}
          </Text>
          <Image source={require('../assets/finImages/star.png')} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardOuter: { borderRadius: 10 },
  cardInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelLocked: { backgroundColor: '#381DAE' },
  levelCompleted: { backgroundColor: '#AE491D' },
  levelNext: { backgroundColor: '#610EAC' },
  levelText: { fontWeight: '900', color: '#fff' },
});

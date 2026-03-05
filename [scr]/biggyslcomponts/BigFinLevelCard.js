import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function BigFinLevelCard({
  level,
  mode,
  onPress,
}) {
  const disabled = mode === 'locked';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={styles.touchWrap}
    >
      <LinearGradient colors={['#FCE6FD', '#7F38FA']} style={styles.cardOuter}>
        <View
          style={[
            styles.cardInner,
            mode === 'completed'
              ? styles.levelCompleted
              : mode === 'next'
              ? styles.levelNext
              : styles.levelLocked,
          ]}
        >
          <Text style={styles.levelText}>{level}</Text>
          <Image source={require('../assets/finImages/star.png')} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchWrap: { borderRadius: 10 },
  cardOuter: { borderRadius: 10 },
  cardInner: {
    width: 73,
    height: 90,
    margin: 3,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelLocked: { backgroundColor: '#381DAE' },
  levelCompleted: { backgroundColor: '#AE491D' },
  levelNext: { backgroundColor: '#610EAC' },
  levelText: { fontWeight: '900', color: '#fff', fontSize: 28 },
});

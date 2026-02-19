import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ORANGE_GRADIENT } from '../consts/uiConsts';

export default function BigFinStartLevelButton({
  nextLevel,
  onPress,
  height,
  width,
  borderRadius,
  fontSize,
}) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={ORANGE_GRADIENT}
        style={[styles.startBtn, { height, width, borderRadius }]}
      >
        <Text style={[styles.startText, { fontSize }]}>
          {`START LEVEL ${nextLevel}`}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  startBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  startText: {
    color: COLORS.darkText,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

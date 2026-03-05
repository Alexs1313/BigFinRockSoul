import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  PILL_BORDER_COLOR,
  PILL_DARK_GRADIENT,
} from '../biggysoulcnsts/uiConsts';

export default function BigFinPillButton({ label, onPress }) {
  const width = 120;
  const height = 44;
  const borderRadius = 50;
  const fontSize = 18;

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={PILL_DARK_GRADIENT}
        style={[styles.pillBtn, { width, height, borderRadius }]}
      >
        <Text style={[styles.pillBtnText, { fontSize }]}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pillBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: PILL_BORDER_COLOR,
  },
  pillBtnText: {
    color: COLORS.white,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

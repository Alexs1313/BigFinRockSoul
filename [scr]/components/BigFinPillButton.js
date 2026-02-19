import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';
import { COLORS, PILL_BORDER_COLOR, PILL_DARK_GRADIENT } from '../consts/uiConsts';

export default function BigFinPillButton({ label, onPress }) {
  const { pick } = useAdaptiveSizes();
  const width = pick(88, 100, 120);
  const height = pick(32, 38, 44);
  const borderRadius = pick(40, 45, 50);
  const fontSize = pick(14, 16, 18);

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={PILL_DARK_GRADIENT}
        style={[
          styles.pillBtn,
          { width, height, borderRadius },
        ]}
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

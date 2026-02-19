import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ORANGE_GRADIENT } from '../consts/uiConsts';

export default function OnboardActionButton({
  label,
  onPress,
  width,
  height,
  borderRadius,
  fontSize,
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={ORANGE_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.button,
          {
            width,
            height,
            borderRadius,
          },
        ]}
      >
        <Text style={[styles.label, { fontSize }]}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: COLORS.darkText,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

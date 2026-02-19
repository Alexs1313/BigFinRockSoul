import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ORANGE_GRADIENT } from '../consts/uiConsts';

export default function BigFinPrimaryButton({
  label,
  onPress,
  height = 50,
  width = 216,
  borderRadius = 12,
  fontSize = 18,
  marginVertical = 6,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginVertical }}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={ORANGE_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.primaryBtn, { height, width, borderRadius }]}
      >
        <Text style={[styles.primaryText, { fontSize }]}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: COLORS.darkText,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

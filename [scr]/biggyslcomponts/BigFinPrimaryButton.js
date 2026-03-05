import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ORANGE_GRADIENT } from '../biggysoulcnsts/uiConsts';

export default function BigFinPrimaryButton({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrap} activeOpacity={0.7}>
      <LinearGradient colors={ORANGE_GRADIENT} style={styles.primaryBtn}>
        <Text style={styles.primaryText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: 6 },
  primaryBtn: {
    height: 40,
    width: 216,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 18,
    color: COLORS.darkText,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

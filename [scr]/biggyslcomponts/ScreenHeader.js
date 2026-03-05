import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, HEADER_GRADIENTS } from '../biggysoulcnsts/uiConsts';

export default function ScreenHeader({
  title,
  onBack,
  variant = 'default',
  width = '90%',
}) {
  const gradient =
    variant === 'purple' ? HEADER_GRADIENTS.purple : HEADER_GRADIENTS.default;

  return (
    <LinearGradient
      colors={gradient.outer}
      style={[styles.outer, styles.outerSize, { width }]}
    >
      <LinearGradient colors={gradient.inner} style={styles.innerGradient}>
        <View style={styles.inner}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backBtn}
            activeOpacity={0.8}
          >
            <Image source={require('../assets/finImages/bxs_up-arrow.png')} />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>

          <Image
            source={require('../assets/finImages/bottomStars.png')}
            style={styles.stars}
            resizeMode="stretch"
          />
        </View>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  outer: {
    alignSelf: 'center',
    zIndex: 1,
  },
  outerSize: {
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 16,
  },
  innerGradient: {
    padding: Platform.OS === 'ios' ? 2 : 0,
    borderRadius: 16,
    width: '100%',
  },
  inner: {
    padding: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: { position: 'absolute', left: 20 },
  title: { fontWeight: '900', color: COLORS.titleYellow, fontSize: 22 },
  stars: {
    position: 'absolute',
    height: 60,
    width: '100%',
    zIndex: -1,
  },
});

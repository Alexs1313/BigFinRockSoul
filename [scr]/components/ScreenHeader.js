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
import { COLORS, HEADER_GRADIENTS } from '../consts/uiConsts';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';

export default function ScreenHeader({
  title,
  onBack,
  variant = 'default',
  width = '90%',
}) {
  const { pick } = useAdaptiveSizes();

  const marginT = pick(8, 10, 12);
  const marginB = pick(14, 16, 20);
  const radius = pick(12, 14, 16);
  const innerPad = pick(10, 12, 12);
  const innerPadV = pick(14, 18, 20);
  const backLeft = pick(14, 16, 20);
  const titleSize = pick(16, 18, 22);
  const starsHeight = pick(48, 54, 60);

  const gradient =
    variant === 'purple' ? HEADER_GRADIENTS.purple : HEADER_GRADIENTS.default;

  return (
    <LinearGradient
      colors={gradient.outer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.outer,
        {
          width,
          marginTop: marginT,
          marginBottom: marginB,
          borderRadius: radius,
        },
      ]}
    >
      <LinearGradient
        colors={gradient.inner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: Platform.OS === 'ios' ? 2 : 0,
          borderRadius: radius,
          width: '100%',
        }}
      >
        <View
          style={[
            styles.inner,
            {
              padding: innerPad,
              paddingVertical: innerPadV,
            },
          ]}
        >
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backBtn, { left: backLeft }]}
            activeOpacity={0.8}
          >
            <Image
              source={require('../assets/finImages/bxs_up-arrow.png')}
            />
          </TouchableOpacity>

          <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>

          <Image
            source={require('../assets/finImages/bottomStars.png')}
            style={[styles.stars, { height: starsHeight }]}
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
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: { position: 'absolute' },
  title: { fontWeight: '900', color: COLORS.titleYellow },
  stars: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
});

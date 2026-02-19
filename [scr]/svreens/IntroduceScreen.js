import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';
import { onboardSlides } from '../data/onboardData';
import OnboardActionButton from '../components/OnboardActionButton';

export default function IntroduceScreen() {
  const navigation = useNavigation();
  const [bigFinCurrentSlide, setBigFinCurrentSlide] = useState(0);
  const { width, height, pick, xS, s } = useAdaptiveSizes();

  const imageHeight = xS ? 420 : s ? 480 : height < 800 ? 520 : 600;
  const titleSize = pick(20, 24, 32);
  const descriptionSize = pick(14, 16, 20);
  const buttonWidth = width * 0.5;
  const buttonHeight = pick(52, 56, 60);
  const buttonRadius = pick(10, 11, 12);
  const buttonTextSize = pick(18, 22, 24);
  const textContainerPadH = pick(16, 18, 20);
  const textContainerMarginT = pick(-40, -48, -50);
  const titleMarginT = pick(16, 18, 20);
  const descriptionMarginT = pick(8, 10, 10);
  const descriptionPadH = pick(24, 28, 30);
  const buttonContainerMarginT = pick(24, 28, 30);
  const scrollPadBottom = pick(40, 48, 50);
  const gradientHeight = pick(100, 120, 130);
  const starsHeight = pick(80, 90, 100);

  const bigFinGoToNext = () => {
    if (bigFinCurrentSlide === 5) {
      navigation.navigate('BigFinHomeScreen');
      return;
    }
    setBigFinCurrentSlide(previousSlide => previousSlide + 1);
  };

  const currentSlide = onboardSlides[bigFinCurrentSlide];

  return (
    <View style={stules.cont}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          stules.scrolCont,
          { paddingBottom: scrollPadBottom },
        ]}
        bounces={false}
      >
        <View style={stules.imgWrap}>
          <Image
            source={currentSlide.image}
            style={[stules.img, { height: imageHeight }]}
          />
          <LinearGradient
            colors={['#10063D00', '#10063D']}
            style={[stules.gradientOvr, { height: gradientHeight }]}
          />
        </View>

        <View
          style={[
            stules.bigFinTextContainer,
            {
              marginTop: textContainerMarginT,
              paddingHorizontal: textContainerPadH,
            },
          ]}
        >
          <Text
            style={[
              stules.ttl,
              { fontSize: titleSize, marginTop: titleMarginT },
            ]}
          >
            {currentSlide.title}
          </Text>
          <Text
            style={[
              stules.descr,
              {
                fontSize: descriptionSize,
                marginTop: descriptionMarginT,
                paddingHorizontal: descriptionPadH,
              },
            ]}
          >
            {currentSlide.description}
          </Text>
        </View>

        <View style={[stules.buttnWrap, { marginTop: buttonContainerMarginT }]}>
          <OnboardActionButton
            label={currentSlide.buttonLabel}
            onPress={bigFinGoToNext}
            width={buttonWidth}
            height={buttonHeight}
            borderRadius={buttonRadius}
            fontSize={buttonTextSize}
          />
        </View>

        <Image
          source={require('../assets/finImages/bottomStars.png')}
          style={[stules.bottStars, { height: starsHeight }]}
        />
      </ScrollView>
    </View>
  );
}

const stules = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#10063D',
  },
  scrolCont: {
    flexGrow: 1,
  },
  imgWrap: {
    width: '100%',
  },
  img: {
    width: '100%',
  },
  gradientOvr: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  ttl: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  descr: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttnWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  bottStars: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

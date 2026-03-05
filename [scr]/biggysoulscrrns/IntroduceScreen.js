import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { onboardSlides } from '../biggysouldt/onboardData';
import OnboardActionButton from '../biggyslcomponts/OnboardActionButton';

export default function IntroduceScreen() {
  const navigation = useNavigation();
  const [bigFinCurrentSlide, setBigFinCurrentSlide] = useState(0);

  const bigFinGoToNext = () => {
    if (bigFinCurrentSlide === 6) {
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
        contentContainerStyle={stules.scrolCont}
        bounces={false}
      >
        <View style={stules.imgWrap}>
          {bigFinCurrentSlide === 6 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 50,
              }}
            >
              <Image
                source={require('../assets/finImages/on11.png')}
                style={{ top: 50, left: 30 }}
              />
              <Image source={require('../assets/finImages/on9.png')} />
              <Image source={require('../assets/finImages/on10.png')} />
            </View>
          )}

          <Image
            source={currentSlide.image}
            style={[
              stules.img,
              bigFinCurrentSlide === 6 && {
                height: 263,
                width: 340,
                alignSelf: 'center',
              },
              bigFinCurrentSlide === 1 && {
                height: 420,
                width: 342,
                alignSelf: 'center',
                marginTop: 60,
              },
            ]}
          />
          {bigFinCurrentSlide !== 6 && (
            <LinearGradient
              colors={['#10063D00', '#10063D']}
              style={stules.gradientOvr}
            />
          )}
        </View>
        <View style={stules.buttnWrap}>
          <View style={stules.bigFinTextContainer}>
            <Text style={stules.ttl}>{currentSlide.title}</Text>
            <Text
              style={[
                stules.descr,
                bigFinCurrentSlide === 1 && { marginBottom: 80 },
              ]}
            >
              {currentSlide.description}
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <OnboardActionButton
              label={currentSlide.buttonLabel}
              onPress={bigFinGoToNext}
            />
          </View>
        </View>

        <Image
          source={require('../assets/finImages/bottomStars.png')}
          style={stules.bottStars}
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
    paddingBottom: 50,
  },
  imgWrap: {
    width: '100%',
  },
  img: {
    width: '100%',
    height: 500,
  },
  gradientOvr: {
    height: 130,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bigFinTextContainer: {
    paddingHorizontal: 20,
  },

  ttl: {
    fontSize: 28,
    marginTop: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  descr: {
    fontSize: 18,
    marginTop: 15,
    paddingHorizontal: 30,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttnWrap: {
    marginTop: 30,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  bottStars: {
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

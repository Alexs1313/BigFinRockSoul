import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ORANGE_GRADIENT } from '../consts/uiConsts';

export default function TapGameResultScreen({
  styles,
  sizes,
  navigation,
  score,
  wallet,
  onShare,
  onPartyZone,
  onExit,
}) {
  const {
    resultPadV,
    scrollBottom,
    resultLineSize,
    resultEarnedSize,
    resultTotalSize,
    resultBtnGap,
    resultBtnMinW,
    resultBtnH,
    resultBtnRadius,
    resultBtnTextSize,
  } = sizes;

  return (
    <ImageBackground
      source={require('../assets/finImages/doneBg.png')}
      style={styles.tapScreen}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: resultPadV,
          paddingBottom: scrollBottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.tapResultSafeArea}>
          <Image
            source={require('../assets/finImages/tapRes.png')}
            style={{ marginBottom: 14 }}
          />
          <Text
            style={[
              styles.tapResultLine,
              { fontSize: resultLineSize },
            ]}
          >
            You crushed it!
          </Text>
          <Text
            style={[
              styles.tapResultLine,
              { fontSize: resultLineSize },
            ]}
          >
            Your fingers were on fire
          </Text>
          <Text
            style={[
              styles.tapResultLine,
              { fontSize: resultLineSize },
            ]}
          >
            All those taps turned into Flamingo Points.
          </Text>
          <Text
            style={[
              styles.tapEarnedLabel,
              { fontSize: resultEarnedSize },
            ]}
          >
            Points earned: +{score}
          </Text>
          <Text
            style={[
              styles.tapTotalLabel,
              { fontSize: resultTotalSize },
            ]}
          >
            Total balance: {wallet}
          </Text>
          <View
            style={[styles.tapResultActions, { gap: resultBtnGap }]}
          >
            <TouchableOpacity
              onPress={onPartyZone}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={ORANGE_GRADIENT}
                style={[
                  styles.tapResultButton,
                  {
                    minWidth: resultBtnMinW,
                    height: resultBtnH,
                    borderRadius: resultBtnRadius,
                  },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={[
                    styles.tapResultButtonLabel,
                    { fontSize: resultBtnTextSize },
                  ]}
                >
                  Party Zone
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={onShare}>
              <LinearGradient
                colors={ORANGE_GRADIENT}
                style={[
                  styles.tapResultButton,
                  {
                    minWidth: resultBtnMinW,
                    height: resultBtnH,
                    borderRadius: resultBtnRadius,
                  },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={[
                    styles.tapResultButtonLabel,
                    { fontSize: resultBtnTextSize },
                  ]}
                >
                  Share
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={onExit}>
              <LinearGradient
                colors={ORANGE_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.tapResultButton,
                  {
                    minWidth: resultBtnMinW,
                    height: resultBtnH,
                    borderRadius: resultBtnRadius,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tapResultButtonLabel,
                    { fontSize: resultBtnTextSize },
                  ]}
                >
                  Exit
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

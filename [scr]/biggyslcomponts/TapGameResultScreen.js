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
import { ORANGE_GRADIENT } from '../biggysoulcnsts/uiConsts';
import { partyZoneAssets } from '../biggysouldt/partyZoneAssets';

export default function TapGameResultScreen({
  styles,
  score,

  onShare,
  onPartyZone,
  onExit,
}) {
  return (
    <ImageBackground
      source={require('../assets/finImages/doneBg.png')}
      style={styles.tapScreen}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.tapResultScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.tapResultSafeArea}>
          <Image
            source={require('../assets/finImages/biggyfinttnice.png')}
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.tapResultLine}>
            Here's how many flamingos you got.
          </Text>
          <Text style={styles.tapResultLine}>
            Ready to use them at the party?
          </Text>
          <View style={styles.tapResultReceivedRow}>
            <Text style={styles.tapResultReceivedLabel}>
              Received: +{score}
            </Text>
            <Image
              source={partyZoneAssets.flamIcon}
              style={styles.tapResultFlamIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.tapResultActions}>
            <TouchableOpacity onPress={onPartyZone} activeOpacity={0.7}>
              <LinearGradient
                colors={ORANGE_GRADIENT}
                style={[styles.tapResultButton, styles.tapResultButtonSize]}
              >
                <Text style={styles.tapResultButtonLabel}>Party Zone</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={onShare}>
              <LinearGradient
                colors={ORANGE_GRADIENT}
                style={[styles.tapResultButton, styles.tapResultButtonSize]}
              >
                <Text style={styles.tapResultButtonLabel}>Share</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={onExit}>
              <LinearGradient
                colors={ORANGE_GRADIENT}
                style={[styles.tapResultButton, styles.tapResultButtonSize]}
              >
                <Text style={styles.tapResultButtonLabel}>Exit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

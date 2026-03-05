import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BigFinLoaderWebview from '../biggyslcomponts/BigFinLoaderWebview';

const bigFinLoaderLogo = require('../assets/finImages/biggyfinmoodloaderic.png');

const BigFinLoaderScreen = () => {
  const navigation = useNavigation();
  const bigFinTimeoutRef = useRef(null);

  useEffect(() => {
    bigFinTimeoutRef.current = setTimeout(() => {
      navigation.replace('IntroduceScreen');
    }, 5000);

    return () => {
      if (bigFinTimeoutRef.current) {
        clearTimeout(bigFinTimeoutRef.current);
        bigFinTimeoutRef.current = null;
      }
    };
  }, [navigation]);

  return (
    <ImageBackground
      style={styles.bgcnt}
      source={require('../assets/finImages/biggyfinmoodloader.png')}
    >
      <ScrollView
        contentContainerStyle={styles.scrolk}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logowrp}>
          <Image source={bigFinLoaderLogo} style={styles.logo} />
        </View>

        <View style={styles.webviewdck}>
          <BigFinLoaderWebview style={styles.webview} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgcnt: { flex: 1 },
  scrolk: { flexGrow: 1 },
  logowrp: {
    flex: 1,
    height: 650,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 22,
    backgroundColor: 'transparent',
  },
  webviewdck: {
    flex: 1,
    bottom: 50,
    position: 'absolute',
    alignSelf: 'center',
  },
  webview: {
    width: 360,
    height: 180,
    backgroundColor: 'transparent',
  },
});

export default BigFinLoaderScreen;

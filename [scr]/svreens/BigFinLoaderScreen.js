import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BigFinLoaderWebview from '../components/BigFinLoaderWebview';
import { useAdaptiveSizes } from '../hooks/useAdaptiveSizes';

const bigFinLoaderLogo = require('../assets/finImages/newicon.png');

const BigFinLoaderScreen = () => {
  const navigation = useNavigation();
  const bigFinTimeoutRef = useRef(null);
  const { pick } = useAdaptiveSizes();

  const logoSize = pick(180, 200, 220);
  const logoRadius = pick(18, 20, 22);
  const logoWrapHeight = pick(520, 580, 650);
  const webviewW = pick(300, 330, 360);
  const webviewH = pick(150, 165, 180);
  const webviewBottom = pick(16, 18, 20);

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
      source={require('../assets/finImages/levelsBg.png')}
    >
      <ScrollView
        contentContainerStyle={styles.scrolk}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.logowrp, { height: logoWrapHeight }]}>
          <Image
            source={bigFinLoaderLogo}
            style={[
              styles.logo,
              {
                width: logoSize,
                height: logoSize,
                borderRadius: logoRadius,
              },
            ]}
          />
        </View>

        <View style={[styles.webviewdck, { bottom: webviewBottom }]}>
          <BigFinLoaderWebview
            style={[styles.webview, { width: webviewW, height: webviewH }]}
          />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: 'transparent',
  },
  webviewdck: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
  },
  webview: {
    backgroundColor: 'transparent',
  },
});

export default BigFinLoaderScreen;

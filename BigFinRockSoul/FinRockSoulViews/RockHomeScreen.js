import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RockHomeScreen = () => {
  const [idx, setIdx] = useState(0);
  const nav = useNavigation();
  const { height } = useWindowDimensions();

  return (
    <ImageBackground
      source={require('../assets/finImages/homeBG.png')}
      style={styles.finContainer}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.contContainer, { paddingTop: height * 0.1 }]}>
          <ImageBackground
            style={styles.topFrame}
            source={require('../assets/finImages/topQ.png')}
          >
            <Text style={styles.description}>20</Text>
          </ImageBackground>

          <View style={styles.buttonsWrapp}>
            <Image source={require('../assets/finImages/menuFrame.png')} />
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={require('../assets/finImages/menuBtn1.png')} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={require('../assets/finImages/menuBtn2.png')} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={require('../assets/finImages/menuBtn3.png')} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={require('../assets/finImages/menuBtn4.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ zIndex: 1, marginTop: 20 }}
              activeOpacity={0.7}
            >
              <Image source={require('../assets/finImages/musBtn.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contContainer: { flex: 1, alignItems: 'center', paddingBottom: 30 },
  finContainer: {
    flex: 1,
  },
  topFrame: {
    width: 132,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 600,
  },
  buttonsWrapp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
  },
  fintitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    color: '#FDEB57',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 30,
    fontWeight: '900',
    left: 10,
  },
  button: {
    marginTop: 30,
    width: 216,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#10063D',
    fontSize: 24,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  bottomWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default RockHomeScreen;

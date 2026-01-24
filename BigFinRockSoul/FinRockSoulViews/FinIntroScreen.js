import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const introFinInfo = [
  {
    ttl: 'Meet Big Fin',
    desc: "Big Fin dreams of singing on stage. But every time he tries, his inner critic whispers: 'You’re not good enough…'",
    img: require('../assets/finImages/on1.png'),
    buttonLbl: 'Begin',
  },
  {
    ttl: 'A Big Dream',
    desc: `Big Fin wants the whole ocean to hear his voice. Not just one fish. Everyone. So he decides to throw the biggest underwater party ever `,
    img: require('../assets/finImages/on2.png'),
    buttonLbl: 'Next',
  },
  {
    ttl: 'But there’s a problem…',
    desc: `No one will come if Big Fin keeps doubting himself.

He needs your help to silence his inner critic and invite friends to the party.`,
    img: require('../assets/finImages/on3.png'),
    buttonLbl: 'Next',
  },
  {
    ttl: 'Face Your Inner Critic',
    desc: `Complete mindset tests about self-doubt and confidence.
Each finished level = 1 new friend at the party`,
    img: require('../assets/finImages/on4.png'),
    buttonLbl: 'Next',
  },
  {
    ttl: 'Collect Flamingo Points',
    desc: `Play the tap game to earn   Flamingo Points
Use them to buy party decorations and upgrades!`,
    img: require('../assets/finImages/on5.png'),
    buttonLbl: 'Next',
  },
  {
    ttl: 'Build the Ultimate Party',
    desc: `Invite friends
Read their stories
Decorate the dance floor
Make Big Fin a star
Let’s make this party legendary!`,
    img: require('../assets/finImages/on6.png'),
    buttonLbl: 'Let’s Rock!',
  },
];

const FinIntroScreen = () => {
  const [idx, setIdx] = useState(0);
  const nav = useNavigation();

  const handleNext = () => {
    if (idx < introFinInfo.length - 1) {
      setIdx(idx + 1);
    } else {
      nav.navigate('RockHomeScreen');
    }
  };

  return (
    <View style={styles.finContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, paddingBottom: 50 }}>
          <View>
            <Image source={introFinInfo[idx].img} style={styles.image} />
            <LinearGradient
              colors={['#10063D00', '#10063D']}
              style={styles.gradient}
            />
          </View>

          <View style={{ marginTop: -50 }}>
            <Text style={styles.fintitle}>{introFinInfo[idx].ttl}</Text>
            <Text style={styles.description}>{introFinInfo[idx].desc}</Text>
          </View>

          <View style={styles.bottomWrap}>
            <TouchableOpacity
              style={{ zIndex: 1 }}
              activeOpacity={0.7}
              onPress={handleNext}
            >
              <LinearGradient
                colors={['#FE9200', '#FDEF70', '#FD3213']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Begin</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../assets/finImages/bottomStars.png')}
            style={{
              width: '100%',
              height: 100,
              position: 'absolute',
              bottom: 0,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  finContainer: {
    flex: 1,
    backgroundColor: '#10063D',
  },
  image: {
    width: '100%',
    height: 600,
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
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 30,
    fontWeight: '400',
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

export default FinIntroScreen;

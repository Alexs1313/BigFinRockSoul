import React, { useState as _uSt } from 'react';
import { useNavigation as _uN } from '@react-navigation/native';
import {
  Image as _I,
  ScrollView as _SV,
  StyleSheet as _SS,
  Text as _T,
  TouchableOpacity as _TO,
  View as _V,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const _0x0 = x => x;
const _0x1 = (a, b) => (a ^ b) + (a & b);

const _0xINF = [
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

const _0xFiNintro$ = () => {
  const [_ix$, _six$] = _uSt(0);
  const _nv$ = _uN();

  const _nx$ = () => {
    if (_ix$ < _0xINF.length - 1) {
      _six$(_ix$ + 1);
    } else {
      _nv$.navigate('_0xRH$');
    }
  };

  const _it$ = _0xINF[_ix$] || _0xINF[0];

  if (_0x1(7, 3) === 0xa) _0x0(null);

  return (
    <_V style={_q$.x9KqP3Lm}>
      <_SV
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <_V style={{ flex: 1, paddingBottom: 50 }}>
          <_V>
            <_I source={_it$.img} style={_q$.R8dM2QaZ} />
            <LinearGradient
              colors={['#10063D00', '#10063D']}
              style={_q$.TmP9LxA4}
            />
          </_V>

          <_V style={{ marginTop: -50 }}>
            <_T style={_q$.LpA9QeR4}>{_it$.ttl}</_T>
            <_T style={_q$.V7M2R9Qa}>{_it$.desc}</_T>
          </_V>

          <_V style={_q$.J4QmR8PZ}>
            <_TO style={{ zIndex: 1 }} activeOpacity={0.7} onPress={_nx$}>
              <LinearGradient
                colors={['#FE9200', '#FDEF70', '#FD3213']}
                style={_q$.K9P2R7Qm}
              >
                <_T style={_q$.Q8RZ9mP2}>{_it$.buttonLbl}</_T>
              </LinearGradient>
            </_TO>
          </_V>

          <_I
            source={require('../assets/finImages/bottomStars.png')}
            style={_q$.Pm9RQL82}
          />
        </_V>
      </_SV>
    </_V>
  );
};

const _q$ = _SS.create({
  x9KqP3Lm: {
    flex: 1,
    backgroundColor: '#10063D',
  },

  R8dM2QaZ: {
    width: '100%',
    height: 600,
  },

  TmP9LxA4: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
  },

  LpA9QeR4: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },

  V7M2R9Qa: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 30,
    fontWeight: '400',
  },

  K9P2R7Qm: {
    marginTop: 30,
    width: 216,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },

  Q8RZ9mP2: {
    color: '#10063D',
    fontSize: 24,
    fontWeight: '500',
    fontStyle: 'italic',
  },

  J4QmR8PZ: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },

  Pm9RQL82: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
  },
});

export default _0xFiNintro$;

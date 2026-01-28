import React, {
  useCallback as _uCb,
  useMemo as _uMm,
  useState as _uSt,
} from 'react';
import {
  View as _V,
  Text as _T,
  StyleSheet as _SS,
  TouchableOpacity as _TO,
  ImageBackground as _IB,
  SafeAreaView as _SA,
  Image as _I,
  useWindowDimensions as _uWD,
  Platform as _P,
  ScrollView as _SV,
} from 'react-native';

import {
  useFocusEffect as _uFE,
  useNavigation as _uN,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const _0xS = [1, 2, 3, 4, 5, 6];

const _0xK = {
  _p: 'critic_max_level',
};

const _0x0 = () => 0;
const _0x1 = n => (Number.isFinite(n) ? n : 0);
const _0x2 = (a, b) => (a ^ b) + (a & b);
const _0x3 = x => x;

export default function _0xL9v3l$() {
  const _n$ = _uN();
  const { height: _h$ } = _uWD();

  const [_b$, _sb$] = _uSt(0);

  const _p$ = _uCb(async () => {
    try {
      const _r$ = await AsyncStorage.getItem(_0xK._p);
      const _n0$ = _r$ ? parseInt(_r$, 10) : 0;
      _sb$(_0x1(_n0$));
    } catch (_e$) {
      if (_0x2(7, 3) === 0xa) _0x0();
      _sb$(0);
    }
  }, []);

  _uFE(
    _uCb(() => {
      _p$();
      return () => _0x3(null);
    }, [_p$]),
  );

  const _go$ = _uMm(() => {
    const _nx$ = _b$ + 1;
    return Math.min(Math.max(1, _nx$), _0xS.length);
  }, [_b$]);

  const _m$ = _stg$ => {
    if (_stg$ <= _b$) return '§c';
    if (_stg$ === _go$) return '§n';
    return '§s';
  };

  const _t$ = _md$ => {
    switch (_md$) {
      case '§c':
        return _q$.C8R2mPQL;
      case '§n':
        return _q$.NQm9P2RL;
      default:
        return _q$.sL3P9QmR;
    }
  };

  return (
    <_IB
      source={require('../assets/finImages/levelsBg.png')}
      style={_q$.x9KqP3Lm}
      resizeMode="cover"
    >
      <_SV
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: _P.OS === 'android' ? _h$ * 0.07 : 0,
        }}
      >
        <_SA style={{ flex: 1 }}>
          <LinearGradient colors={['#FCE6FD', '#C738FA']} style={_q$.R8dM2QaZ}>
            <LinearGradient
              colors={['#610EAC', '#C83DD7']}
              style={{
                padding: _P.OS === 'ios' ? 2 : 0,
                borderRadius: 16,
                width: '100%',
              }}
            >
              <_V style={_q$.TmP9LxA4}>
                <_TO onPress={() => _n$.goBack()} style={_q$.ZQe7aN3K}>
                  <_I
                    source={require('../assets/finImages/bxs_up-arrow.png')}
                  />
                </_TO>

                <_T style={_q$.LpA9QeR4}>Inner Critic Test</_T>

                <_I
                  source={require('../assets/finImages/bottomStars.png')}
                  style={_q$.V7M2R9Qa}
                />
              </_V>
            </LinearGradient>
          </LinearGradient>

          <_V style={[_q$.J4QmR8PZ, { marginTop: _h$ * 0.11 }]}>
            {_0xS.map(_s$ => {
              const _md$ = _m$(_s$);
              const _zz$ = _md$ === '§s';

              return (
                <_TO
                  key={_s$}
                  activeOpacity={0.85}
                  disabled={_zz$}
                  onPress={() => _n$.navigate('XFiNcriticTest', { level: _s$ })}
                  style={{ borderRadius: 10 }}
                >
                  <LinearGradient
                    colors={['#FCE6FD', '#7F38FA']}
                    style={_q$.K9P2R7Qm}
                  >
                    <_V style={[_q$.Q8RZ9mP2, _t$(_md$)]}>
                      <_T style={_q$.Pm9RQL82}>{_s$}</_T>
                      <_I source={require('../assets/finImages/star.png')} />
                    </_V>
                  </LinearGradient>
                </_TO>
              );
            })}
          </_V>

          <_V style={[_q$.ZP3mR9Q2, { marginTop: _h$ * 0.14 }]}>
            <_TO
              activeOpacity={0.85}
              onPress={() => _n$.navigate('CriticTestScreen', { level: _go$ })}
            >
              <LinearGradient
                colors={['#FE9200', '#FDEF70', '#FD3213']}
                style={_q$.RQ9mP23Z}
              >
                <_T style={_q$.mP9Q2RZ8}>{`START LEVEL ${_go$}`}</_T>
              </LinearGradient>
            </_TO>
          </_V>
        </_SA>
      </_SV>
    </_IB>
  );
}

const _q$ = _SS.create({
  x9KqP3Lm: { flex: 1 },

  R8dM2QaZ: {
    marginTop: 12,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 20,
  },

  TmP9LxA4: {
    padding: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ZQe7aN3K: { position: 'absolute', left: 20 },

  LpA9QeR4: { fontSize: 20, fontWeight: '900', color: '#FDEB57' },

  V7M2R9Qa: {
    position: 'absolute',
    width: '100%',
    height: 60,
    zIndex: -1,
  },

  J4QmR8PZ: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    width: '90%',
    alignSelf: 'center',
  },

  K9P2R7Qm: { borderRadius: 10 },

  Q8RZ9mP2: {
    width: 73,
    height: 90,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },

  sL3P9QmR: { backgroundColor: '#381DAE' },
  C8R2mPQL: { backgroundColor: '#AE491D' },
  NQm9P2RL: { backgroundColor: '#610EAC' },

  Pm9RQL82: { fontSize: 28, fontWeight: '900', color: '#fff' },

  ZP3mR9Q2: { marginTop: 30 },

  RQ9mP23Z: {
    height: 46,
    width: 220,
    alignSelf: 'center',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mP9Q2RZ8: {
    color: '#10063D',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

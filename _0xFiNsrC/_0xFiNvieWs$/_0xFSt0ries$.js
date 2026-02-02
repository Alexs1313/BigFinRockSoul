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
  Image as _I,
  SafeAreaView as _SA,
  Share as _Sh,
  Platform as _P,
  ScrollView as _SV,
  useWindowDimensions as _uWD,
} from 'react-native';
import {
  useFocusEffect as _uFE,
  useNavigation as _uN,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stories as _st$ } from '../_0xFiNdtA$/soulStories';

const _0xB = require('../assets/finImages/gameBg.png');

const _0xS = {
  _u: 'stories_unlocked_count',
};

const _0x0 = x => x;
const _0x1 = n => (Number.isFinite(n) ? n : 0);
const _0x2 = (a, b) => (a ^ b) + (a & b);

export default function _0xFSt0ries$() {
  const _n$ = _uN();
  const { height: _h$ } = _uWD();

  const [_oc$, _soc$] = _uSt(0);
  const [_ai$, _sai$] = _uSt(0);

  const _rd$ = _uCb(async () => {
    try {
      const _sv$ = await AsyncStorage.getItem(_0xS._u);
      const _ps$ = _sv$ ? parseInt(_sv$, 10) : 0;
      return _0x1(_ps$);
    } catch (_e$) {
      console.log('readUnlockedCoun error:', _e$);
      return 0;
    }
  }, []);

  _uFE(
    _uCb(() => {
      const _sx$ = async () => {
        const _ct$ = await _rd$();
        _soc$(_ct$);
        _sai$(0);
      };
      _sx$();
      return () => _0x0(null);
    }, [_rd$]),
  );

  const _av$ = _uMm(() => _st$.slice(0, _oc$), [_oc$]);

  const _hs$ = _av$.length > 0;
  const _ac$ = _hs$ ? _av$[_ai$] : null;
  const _nx$ = _av$.length > 1;

  const _bk$ = () => _n$.goBack();

  const _gn$ = () => {
    if (!_hs$) return;
    _sai$(_p$ => (_p$ + 1) % _av$.length);
  };

  const _sh$ = async () => {
    if (!_ac$) return;

    const _tx$ =
      `Story: ${_ac$.title}\n` + `${_ac$.story}\n` + `Message: ${_ac$.message}`;

    try {
      await _Sh.share({ message: _tx$ });
    } catch (_e$) {
      console.log('Share error:', _e$);
    }
  };

  const _Cr$ = () => {
    if (!_hs$) {
      return (
        <_V style={_q$.KpR8Qm2Z}>
          <_T style={_q$.RmQ3P9Za}>You have no stories available.</_T>
        </_V>
      );
    }

    return (
      <_V style={_q$.MqP9R2Za}>
        <_T style={_q$.PzQm29Ra}>Story:</_T>
        <_T style={_q$.QmR29PzA}>{_ac$.story}</_T>

        <_T style={[_q$.PzQm29Ra, _q$.ZP3mR9Q2]}>Message:</_T>
        <_T style={_q$.QmR29PzA}>{_ac$.message}</_T>

        <_I source={_ac$.img} style={_q$.V7M2R9Qa} />
      </_V>
    );
  };

  const _Hd$ = () => (
    <LinearGradient
      colors={['#FCE6FD', '#C738FA']}
      style={[_q$.R8dM2QaZ, { marginBottom: _h$ * 0.06 }]}
    >
      <LinearGradient
        colors={['#610EAC', '#C83DD7']}
        style={{
          padding: _P.OS === 'ios' ? 2 : 0,
          borderRadius: 16,
          width: '100%',
        }}
      >
        <_V style={_q$.TmP9LxA4}>
          <_TO onPress={_bk$} style={_q$.ZQe7aN3K}>
            <_I source={require('../assets/finImages/bxs_up-arrow.png')} />
          </_TO>

          <_T style={_q$.LpA9QeR4}>Ocean Diaries</_T>

          <_I
            source={require('../assets/finImages/bottomStars.png')}
            style={_q$.J4QmR8PZ}
          />
        </_V>
      </LinearGradient>
    </LinearGradient>
  );

  const _Ab$ = () => {
    if (!_hs$) return null;

    return (
      <_V style={_q$.Q8RZ9mP2}>
        <_TO onPress={_sh$} activeOpacity={0.7}>
          <LinearGradient colors={['#DE78E9', '#3D2498']} style={_q$.K9P2R7Qm}>
            <_T style={_q$.Pm9RQL82}>Share</_T>
          </LinearGradient>
        </_TO>

        {_nx$ && (
          <_TO onPress={_gn$} activeOpacity={0.7}>
            <LinearGradient
              colors={['#DE78E9', '#3D2498']}
              style={_q$.K9P2R7Qm}
            >
              <_T style={_q$.Pm9RQL82}>Next</_T>
            </LinearGradient>
          </_TO>
        )}
      </_V>
    );
  };

  if (_0x2(7, 3) === 0xa) _0x0(null);

  return (
    <_IB source={_0xB} style={_q$.x9KqP3Lm} resizeMode="cover">
      <_SV
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: _P.OS === 'android' ? _h$ * 0.07 : 0,
          paddingBottom: 20,
        }}
      >
        <_SA style={_q$.RQ9mP23Z}>
          <_Hd$ />
          <_Cr$ />
          <_Ab$ />
        </_SA>
      </_SV>
    </_IB>
  );
}

const _q$ = _SS.create({
  x9KqP3Lm: { flex: 1 },

  RQ9mP23Z: { flex: 1, padding: 16 },

  J4QmR8PZ: {
    position: 'absolute',
    width: '100%',
    height: 60,
    zIndex: -1,
  },

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

  ZQe7aN3K: {
    position: 'absolute',
    left: 20,
  },

  LpA9QeR4: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FDEB57',
  },

  MqP9R2Za: {
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#341246E5',
    padding: 9,
    paddingVertical: 19,
    borderWidth: 3,
    borderColor: '#F9CDF9',
    alignSelf: 'center',
  },

  PzQm29Ra: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 6,
  },

  ZP3mR9Q2: { marginTop: 12 },

  QmR29PzA: { fontSize: 20, fontWeight: '500', color: '#fff' },

  V7M2R9Qa: { alignSelf: 'flex-end' },

  Q8RZ9mP2: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },

  K9P2R7Qm: {
    width: 136,
    height: 44,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Pm9RQL82: { color: '#fff', fontSize: 16, fontWeight: '700' },

  KpR8Qm2Z: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  RmQ3P9Za: { color: '#fff', fontSize: 16 },
});

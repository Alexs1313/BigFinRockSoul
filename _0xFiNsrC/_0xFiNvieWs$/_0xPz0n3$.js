import React, {
  useMemo as _uMm,
  useState as _uSt,
  useCallback as _uCb,
} from 'react';
import {
  View as _V,
  Text as _T,
  StyleSheet as _SS,
  TouchableOpacity as _TO,
  ImageBackground as _IB,
  Image as _I,
  SafeAreaView as _SA,
  Modal as _MD,
  Platform as _P,
  useWindowDimensions as _uWD,
  ScrollView as _SV,
  Alert as _AL,
} from 'react-native';
import {
  useNavigation as _uN,
  useFocusEffect as _uFE,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const _0xST = {
  _s: 'flamingo_total_score',
  _p: 'party_fish_unlocked',
  _g: 'party_fish1_accessories',
  _k: 'party_fish1_skin',
};

const _0xAR = {
  _b: require('../assets/finImages/danceBg.png'),
  _a: require('../assets/finImages/bxs_up-arrow.png'),
  _t: require('../assets/finImages/bottomStars.png'),
  _x: require('../assets/finImages/addIcon.png'),
  _q: require('../assets/finImages/topQ.png'),
};

const _0xFI = {
  _0: require('../assets/finImages/acsses1.1.png'),
  _1: require('../assets/finImages/accses1.png'),
  _2: require('../assets/finImages/accses2.png'),
  _3: require('../assets/finImages/accses3.png'),
  _4: require('../assets/finImages/accses4.png'),
  _5: require('../assets/finImages/accses6.png'),
  _6: require('../assets/finImages/accses7.png'),
  _7: require('../assets/finImages/accses9.png'),
};

const _0xGE = [
  { img: require('../assets/finImages/accses5.png') },
  { img: require('../assets/finImages/accses5.png') },
  { img: require('../assets/finImages/accses8.png') },
];

const _0x0 = x => x;
const _0x1 = n => (Number.isFinite(n) ? n : 0);
const _0x2 = (a, b) => (a ^ b) + (a & b);

export default function _0xPz0n3$() {
  const _n$ = _uN();
  const { width: _w$, height: _h$ } = _uWD();

  const _pr$ = 30;

  const [_sc$, _ssc$] = _uSt(0);
  const [_uf$, _suf$] = _uSt(1);
  const [_go$, _sgo$] = _uSt([0, 0, 0]);
  const [_lk$, _slk$] = _uSt(0);

  const [_sh$, _ssh$] = _uSt(false);
  const [_ss$, _sss$] = _uSt(null);

  const _dk$ = _uMm(
    () => [
      _0xFI._0,
      _0xFI._2,
      _0xFI._3,
      _0xFI._4,
      _0xFI._5,
      _0xFI._6,
      _0xFI._7,
    ],
    [],
  );

  const _fl$ = _uMm(() => {
    return [
      { left: _w$ * 0.52, top: _h$ * 0.23, w: 140, h: 160 },
      { left: _w$ * 0.2, top: _h$ * 0.28, w: 90, h: 90 },
      { left: _w$ * 0.13, top: _h$ * 0.44, w: 120, h: 120 },
      { right: _w$ * 0.05, top: _h$ * 0.53, w: 110, h: 110 },
      { left: _w$ * 0.4, top: _h$ * 0.4, w: 117, h: 138 },
      { right: _w$ * 0, top: _h$ * 0.33, w: 95, h: 95 },
      { left: 0, top: _h$ * 0.05, w: 92, h: 67 },
    ];
  }, [_w$, _h$]);

  const _gl$ = _uMm(() => {
    return [
      {
        img: _0xGE[0].img,
        style: { position: 'absolute', left: 0, top: _h$ * 0.24 },
      },
      {
        img: _0xGE[1].img,
        style: { position: 'absolute', left: _w$ * 0.08, top: _h$ * 0.16 },
      },
      {
        img: _0xGE[2].img,
        style: { position: 'absolute', left: 0, top: _h$ * 0.6 },
      },
    ];
  }, [_w$, _h$]);

  const _pl$ = _uMm(() => {
    return [
      { left: _w$ * 0.08, top: _h$ * 0.44 },
      { left: _w$ * 0.46, top: _h$ * 0.3 },
      { left: _w$ * 0.22, top: _h$ * 0.68 },
    ];
  }, [_w$, _h$]);

  const _hy$ = _uCb(async () => {
    try {
      const _rs$ = await AsyncStorage.getItem(_0xST._s);
      const _ps$ = _rs$ ? parseInt(_rs$, 10) : 0;
      _ssc$(_0x1(_ps$));

      const _rf$ = await AsyncStorage.getItem(_0xST._p);
      const _pf$ = _rf$ ? parseInt(_rf$, 10) : 1;
      _suf$(Math.max(1, Math.min(7, _0x1(_pf$ || 1))));

      const _rg$ = await AsyncStorage.getItem(_0xST._g);
      if (_rg$) {
        const _pg$ = JSON.parse(_rg$);
        if (Array.isArray(_pg$) && _pg$.length === 3)
          _sgo$(_pg$.map(v => (v ? 1 : 0)));
      } else {
        await AsyncStorage.setItem(_0xST._g, JSON.stringify([0, 0, 0]));
        _sgo$([0, 0, 0]);
      }

      const _rl$ = await AsyncStorage.getItem(_0xST._k);
      if (_rl$ === null) {
        await AsyncStorage.setItem(_0xST._k, '0');
        _slk$(0);
      } else {
        _slk$(Number(_rl$) ? 1 : 0);
      }
    } catch (_e$) {
      console.log('PartyZone load error:', _e$);
    }
  }, []);

  _uFE(
    _uCb(() => {
      _hy$();
      return () => _0x0(null);
    }, [_hy$]),
  );

  const _os$ = _sl$ => {
    if (_go$[_sl$] === 1) return;
    _sss$(_sl$);
    _ssh$(true);
  };

  const _cs$ = () => {
    _ssh$(false);
    _sss$(null);
  };

  const _cb$ = _uCb(async () => {
    if (_ss$ === null) return;

    _cs$();

    if (_go$[_ss$] === 1) return;

    const _nx$ = _sc$ - _pr$;
    const _no$ = [..._go$];
    _no$[_ss$] = 1;

    let _nl$ = _lk$;
    if (_ss$ === 1) _nl$ = 1;

    if (_nx$ < 0) {
      _AL.alert(
        'Not enough points',
        'You do not have enough points to buy this accessory.',
      );
      return;
    }

    try {
      await AsyncStorage.setItem(_0xST._s, String(_nx$));
      await AsyncStorage.setItem(_0xST._g, JSON.stringify(_no$));
      await AsyncStorage.setItem(_0xST._k, String(_nl$));

      _ssc$(_nx$);
      _sgo$(_no$);
      _slk$(_nl$);
    } catch (_e$) {
      console.log('buyAccessory error:', _e$);
    }
  }, [_ss$, _sc$, _pr$, _go$, _lk$]);

  if (_0x2(7, 3) === 0xa) _0x0(null);

  return (
    <_IB source={_0xAR._b} style={_q$.x9KqP3Lm} resizeMode="cover">
      <_SV
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: _P.OS === 'android' ? _h$ * 0.07 : 0,
          height: '600',
        }}
      >
        <_SA style={_q$.R8dM2QaZ}>
          <_V style={_q$.TmP9LxA4}>
            <LinearGradient
              colors={['#FCE6FD', '#C738FA']}
              style={_q$.ZQe7aN3K}
            >
              <LinearGradient
                colors={['#610EAC', '#C83DD7']}
                style={_q$.LpA9QeR4}
              >
                <_V style={_q$.V7M2R9Qa}>
                  <_TO
                    onPress={() => _n$.goBack()}
                    style={_q$.J4QmR8PZ}
                    activeOpacity={0.8}
                  >
                    <_I source={_0xAR._a} />
                  </_TO>

                  <_T style={_q$.K9P2R7Qm}>Party Zone</_T>

                  <_I
                    source={_0xAR._t}
                    style={_q$.Q8RZ9mP2}
                    resizeMode="stretch"
                  />
                </_V>
              </LinearGradient>
            </LinearGradient>

            <_IB style={_q$.Pm9RQL82} source={_0xAR._q}>
              <_T style={_q$.ZP3mR9Q2}>{_sc$}</_T>
            </_IB>
          </_V>

          <_V style={_q$.RQ9mP23Z}>
            {_gl$.map((_g$, _sl$) => {
              if (!_go$[_sl$]) return null;
              if (_sl$ === 1 && _lk$ === 1) return null;

              return (
                <_I
                  key={_sl$}
                  source={_g$.img}
                  style={_g$.style}
                  resizeMode="contain"
                />
              );
            })}

            {_dk$.slice(0, _uf$).map((_im$, _i$) => {
              const _p$ = _fl$[_i$] || _fl$[0];

              const _fi$ =
                _i$ === 0 ? (_lk$ === 1 ? _0xFI._1 : _0xFI._0) : _im$;

              return (
                <_I
                  key={_i$}
                  source={_fi$}
                  resizeMode="contain"
                  style={[
                    _q$.mP9Q2RZ8,
                    {
                      position: 'absolute',
                      left: _p$.left,
                      right: _p$.right,
                      top: _p$.top,
                      bottom: _p$.bottom,
                      width: _p$.w,
                      height: _p$.h,
                    },
                  ]}
                />
              );
            })}

            {_pl$.map((_ps$, _sl$) => {
              if (_go$[_sl$] === 1) return null;

              return (
                <_TO
                  key={_sl$}
                  activeOpacity={0.85}
                  onPress={() => _os$(_sl$)}
                  style={[
                    _q$.sL3P9QmR,
                    { position: 'absolute', left: _ps$.left, top: _ps$.top },
                  ]}
                >
                  <_I source={_0xAR._x} />
                </_TO>
              );
            })}
          </_V>

          <_MD
            transparent
            visible={_sh$}
            animationType="fade"
            onRequestClose={_cs$}
          >
            <_V style={_q$.C8R2mPQL}>
              <_V style={_q$.NQm9P2RL}>
                <LinearGradient
                  colors={['#610EAC', '#C83DD7']}
                  style={_q$.KpR8Qm2Z}
                >
                  <_V style={{ padding: 18, paddingTop: 24 }}>
                    <_T style={_q$.Qm2R9PzA}>Add accessory for:</_T>

                    <_V style={_q$.QmR29PzA}>
                      <_T style={_q$.RmQ3P9Za}>{_pr$}</_T>
                      <_I source={require('../assets/finImages/flam.png')} />
                    </_V>

                    <_V style={_q$.PzQm29Ra}>
                      <_0xPb1lZ9$ label="No" onPress={_cs$} />
                      <_0xPb1lZ9$ label="Yes" onPress={_cb$} />
                    </_V>
                  </_V>
                </LinearGradient>
              </_V>
            </_V>
          </_MD>
        </_SA>
      </_SV>
    </_IB>
  );
}

function _0xPb1lZ9$({ label: _lb$, onPress: _op$ }) {
  return (
    <_TO activeOpacity={0.85} onPress={_op$}>
      <LinearGradient colors={['#1E033D', '#1E033D']} style={_q$.VxP2R9Qa}>
        <_T style={_q$.AzQ9mP2R}>{_lb$}</_T>
      </LinearGradient>
    </_TO>
  );
}

const _q$ = _SS.create({
  x9KqP3Lm: { flex: 1 },
  R8dM2QaZ: { flex: 1 },
  TmP9LxA4: { alignItems: 'center' },

  ZQe7aN3K: { width: '92%', borderRadius: 16, padding: 2 },
  LpA9QeR4: { borderRadius: 14, padding: 2 },
  V7M2R9Qa: {
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  J4QmR8PZ: { position: 'absolute', left: 20, zIndex: 2 },
  K9P2R7Qm: { fontSize: 22, fontWeight: '900', color: '#FDEB57' },

  Q8RZ9mP2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 54,
    opacity: 0.9,
  },

  Pm9RQL82: {
    width: 132,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  ZP3mR9Q2: {
    color: '#FDEB57',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },

  RQ9mP23Z: { flex: 1, position: 'relative' },

  mP9Q2RZ8: { zIndex: 3 },

  sL3P9QmR: { zIndex: 10 },

  C8R2mPQL: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  NQm9P2RL: {
    width: '88%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F9CDF9',
    overflow: 'hidden',
  },

  KpR8Qm2Z: { borderRadius: 16 },

  Qm2R9PzA: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
  },

  QmR29PzA: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },

  RmQ3P9Za: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },

  PzQm29Ra: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 10,
  },

  VxP2R9Qa: {
    width: 120,
    height: 44,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#691D7A',
  },

  AzQ9mP2R: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

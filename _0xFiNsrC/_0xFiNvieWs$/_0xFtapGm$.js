import React, {
  useState as _uSt,
  useEffect as _uEf,
  useRef as _uRf,
  useCallback as _uCb,
} from 'react';
import {
  View as _V,
  Text as _T,
  StyleSheet as _SS,
  TouchableOpacity as _TO,
  ImageBackground as _IB,
  SafeAreaView as _SA,
  Dimensions as _Dm,
  Image as _I,
  Platform as _P,
  ScrollView as _SV,
  Share as _Sh,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  useFocusEffect as _uFE,
  useNavigation as _uN,
} from '@react-navigation/native';
import { useFinStore as _uFS } from '../_0xFiNstrG/_0xFiNcntxt$';

const { width: _w$, height: _h$ } = _Dm.get('window');

const _0xP = {
  _t: 'flamingo_total_score',
  _s: 'flamingo_last_game_time',
};

const _0xT = 4 * 60 * 60 * 1000;

const _0x0 = x => x;
const _0x1 = n => (Number.isFinite(n) ? n : 0);
const _0x2 = (a, b) => (a ^ b) + (a & b);

export function _0xFtapGm$() {
  const _n$ = _uN();
  const { finSoundEnabled: _fs$, setFinSoundEnabled: _sfs$ } = _uFS();

  const [_md$, _smd$] = _uSt('start');
  const [_rs$, _srs$] = _uSt(0);
  const [_sl$, _ssl$] = _uSt(30);
  const [_wl$, _swl$] = _uSt(0);

  const [_dp$, _sdp$] = _uSt([]);
  const [_rn$, _srn$] = _uSt(false);
  const [_pz$, _spz$] = _uSt(false);

  const [_ap$, _sap$] = _uSt(true);
  const [_cd$, _scd$] = _uSt(0);
  const [_bt$, _sbt$] = _uSt(true);

  const _lv$ = _uRf(0);
  const _id$ = _uRf(0);

  const _t1$ = _uRf(null);
  const _t2$ = _uRf(null);
  const _t3$ = _uRf(null);
  const _t4$ = _uRf(null);

  _uFE(
    _uCb(() => {
      _hy$();
      return () => _0x0(null);
    }, []),
  );

  _uFE(
    _uCb(() => {
      _hs$();
      return () => _0x0(null);
    }, []),
  );

  const _hs$ = async () => {
    try {
      const _rw$ = await AsyncStorage.getItem('toggleSound');
      const _on$ = JSON.parse(_rw$);
      _sfs$(_on$);
    } catch (_e$) {
      console.error('Error loading fin music', _e$);
    }
  };

  _uEf(() => {
    if (!_ap$) {
      _t4$.current = setInterval(() => {
        _rc$();
      }, 1000);
    }

    return () => {
      if (_t4$.current) clearInterval(_t4$.current);
    };
  }, [_ap$]);

  _uEf(() => {
    if (_rn$ && !_pz$) {
      _t1$.current = setInterval(() => {
        _ssl$(_p$ => {
          if (_p$ <= 1) {
            _er$();
            return 0;
          }
          return _p$ - 1;
        });
      }, 1000);

      _t2$.current = setInterval(() => {
        _db$();
      }, 800);

      _t3$.current = setInterval(() => {
        _sdp$(_p$ =>
          _p$
            .map(_d$ => ({ ..._d$, y: _d$.y + 8 }))
            .filter(_d$ => _d$.y < _h$ + 100),
        );
      }, 30);
    }

    return () => {
      if (_t1$.current) clearInterval(_t1$.current);
      if (_t2$.current) clearInterval(_t2$.current);
      if (_t3$.current) clearInterval(_t3$.current);
    };
  }, [_rn$, _pz$]);

  const _hy$ = async () => {
    try {
      const _sw$ = await AsyncStorage.getItem(_0xP._t);
      const _ls$ = await AsyncStorage.getItem(_0xP._s);

      if (_sw$) _swl$(parseInt(_sw$, 10));

      if (_ls$) {
        const _el$ = Date.now() - parseInt(_ls$, 10);
        if (_el$ < _0xT) {
          _sap$(false);
          _scd$(_0xT - _el$);
        }
      }
    } catch (_e$) {
      console.log('Error loading game data:', _e$);
    } finally {
      _sbt$(false);
    }
  };

  const _rc$ = async () => {
    try {
      const _ls$ = await AsyncStorage.getItem(_0xP._s);
      if (!_ls$) return;

      const _el$ = Date.now() - parseInt(_ls$, 10);
      if (_el$ >= _0xT) {
        _sap$(true);
        _scd$(0);
        if (_t4$.current) clearInterval(_t4$.current);
      } else {
        _scd$(_0xT - _el$);
      }
    } catch (_e$) {
      console.log('Error checking cooldown:', _e$);
    }
  };

  const _pc$ = _ms$ => {
    const _ts$ = Math.floor(_ms$ / 1000);
    const _hh$ = Math.floor(_ts$ / 3600);
    const _mm$ = Math.floor((_ts$ % 3600) / 60);
    const _ss$ = _ts$ % 60;
    return `${_hh$}:${_mm$.toString().padStart(2, '0')}:${_ss$
      .toString()
      .padStart(2, '0')}`;
  };

  const _cl$ = (_fr$, _ex$) => {
    const _mg$ = 100;

    for (let _it$ of _ex$) {
      const _ds$ = Math.sqrt(
        Math.pow(_fr$.x - _it$.x, 2) + Math.pow(_fr$.y - _it$.y, 2),
      );
      if (_ds$ < _mg$) return true;
    }
    return false;
  };

  const _db$ = () => {
    _sdp$(_pv$ => {
      const _fl$ = Math.random() > 0.4;
      const _sz$ = 70 + Math.random() * 10;

      const _mt$ = 10;
      let _tr$ = 0;
      let _fr$;

      do {
        const _xx$ = Math.random() * (_w$ - _sz$ - 40) + 20;
        const _yy$ = -_sz$ - Math.random() * 200;
        _fr$ = {
          id: _id$.current,
          x: _xx$,
          y: _yy$,
          size: _sz$,
          isFlamingo: _fl$,
        };
        _tr$++;
      } while (_cl$(_fr$, _pv$) && _tr$ < _mt$);

      if (_tr$ < _mt$) {
        _id$.current += 1;
        return [..._pv$, _fr$];
      }
      return _pv$;
    });
  };

  _uEf(() => {
    if (_md$ === 'start') {
      AsyncStorage.getItem(_0xP._t).then(_v$ => {
        _swl$(_v$ ? Number(_v$) : 0);
      });
    }
  }, [_md$]);

  const _bp$ = _it$ => {
    if (_it$.isFlamingo) {
      _lv$.current += 1;
      _srs$(_lv$.current);
    }
    _sdp$(_pv$ => _pv$.filter(_b$ => _b$.id !== _it$.id));
  };

  const _br$ = () => {
    if (!_ap$) return;

    _srs$(0);
    _lv$.current = 0;

    _ssl$(30);
    _sdp$([]);
    _id$.current = 0;

    _srn$(true);
    _spz$(false);
    _smd$('game');
  };

  const _er$ = async () => {
    _srn$(false);

    const _ed$ = _lv$.current;

    try {
      const _rw$ = await AsyncStorage.getItem(_0xP._t);
      const _ct$ = _rw$ ? Number(_rw$) : 0;

      const _nt$ = _ct$ + _ed$;

      await AsyncStorage.setItem(_0xP._t, String(_nt$));
      await AsyncStorage.setItem(_0xP._s, String(Date.now()));

      _swl$(_nt$);
    } catch (_e$) {
      console.log('finishGame save error:', _e$);
    }

    _smd$('result');
  };

  const _fp$ = () => {
    _spz$(_p$ => !_p$);
  };

  const _pt$ = _s$ => {
    const _m$ = Math.floor(_s$ / 60);
    const _c$ = _s$ % 60;
    return `${_m$.toString().padStart(2, '0')}:${_c$
      .toString()
      .padStart(2, '0')}`;
  };

  const _sf$ = async _nx$ => {
    try {
      await AsyncStorage.setItem('toggleSound', JSON.stringify(_nx$));
      _sfs$(_nx$);
    } catch (_e$) {
      console.log('Error toggle sound', _e$);
    }
  };

  const _shr$ = () => {
    _Sh
      .share({ message: `I just scored ${_rs$} points!` })
      .then(_r$ => console.log(_r$))
      .catch(_e$ => console.log(_e$));
  };

  if (_0x2(7, 3) === 0xa) _0x0(null);

  if (_bt$) {
    return (
      <_IB
        source={require('../assets/finImages/levelsBg.png')}
        style={_q$.x9KqP3Lm}
      >
        <_SA style={_q$.R8dM2QaZ}>
          <_V style={_q$.TmP9LxA4}>
            <_T style={_q$.LpA9QeR4}>Loading...</_T>
          </_V>
        </_SA>
      </_IB>
    );
  }

  if (_md$ === 'start') {
    return (
      <_IB
        source={require('../assets/finImages/levelsBg.png')}
        style={_q$.x9KqP3Lm}
      >
        <_SA style={_q$.R8dM2QaZ}>
          <LinearGradient colors={['#FCE6FD', '#C738FA']} style={_q$.V7M2R9Qa}>
            <LinearGradient
              colors={['#610EAC', '#C83DD7']}
              style={{
                padding: _P.OS === 'ios' ? 2 : 0,
                borderRadius: 16,
                width: '100%',
              }}
            >
              <_V style={_q$.J4QmR8PZ}>
                <_TO onPress={() => _n$.goBack()} style={_q$.K9P2R7Qm}>
                  <_I
                    source={require('../assets/finImages/bxs_up-arrow.png')}
                  />
                </_TO>

                <_T style={_q$.Q8RZ9mP2}>Tap</_T>

                <_I
                  source={require('../assets/finImages/bottomStars.png')}
                  style={_q$.Pm9RQL82}
                />
              </_V>
            </LinearGradient>
          </LinearGradient>

          <_IB
            style={_q$.ZP3mR9Q2}
            source={require('../assets/finImages/topQ.png')}
          >
            <_T style={_q$.RQ9mP23Z}>{_wl$}</_T>
          </_IB>

          <_V style={_q$.mP9Q2RZ8}>
            {_ap$ ? (
              <>
                <_T style={_q$.KpR8Qm2Z}>
                  30 seconds. Show your tapping power!
                </_T>

                <_TO onPress={_br$} activeOpacity={0.7}>
                  <LinearGradient
                    colors={['#610EAC', '#C83DD7']}
                    style={_q$.RmQ3P9Za}
                  >
                    <_T style={_q$.PzQm29Ra}>START</_T>

                    <_I
                      source={require('../assets/finImages/buttonStars.png')}
                      style={{ position: 'absolute', right: 10, bottom: 5 }}
                    />
                  </LinearGradient>
                </_TO>
              </>
            ) : (
              <>
                <_T style={_q$.Qm2R9PzA}>Next game available in:</_T>

                <LinearGradient
                  colors={[
                    'rgba(128, 90, 213, 0.6)',
                    'rgba(138, 43, 226, 0.5)',
                  ]}
                  style={_q$.RmQ3P9Za}
                >
                  <_T style={_q$.QmR29PzA}>{_pc$(_cd$)}</_T>

                  <_I
                    source={require('../assets/finImages/buttonStars.png')}
                    style={{ position: 'absolute', right: 10, bottom: 5 }}
                  />
                </LinearGradient>
              </>
            )}
          </_V>

          <_V style={_q$.VxP2R9Qa} />
        </_SA>
      </_IB>
    );
  }

  if (_md$ === 'game') {
    return (
      <_IB
        source={require('../assets/finImages/gameBg.png')}
        style={_q$.x9KqP3Lm}
      >
        <_SA style={_q$.R8dM2QaZ}>
          <LinearGradient colors={['#FCE6FD', '#C738FA']} style={_q$.V7M2R9Qa}>
            <LinearGradient
              colors={['#610EAC', '#C83DD7']}
              style={{
                padding: _P.OS === 'ios' ? 2 : 0,
                borderRadius: 16,
                width: '100%',
              }}
            >
              <_V style={_q$.J4QmR8PZ}>
                <_TO onPress={() => _n$.goBack()} style={_q$.K9P2R7Qm}>
                  <_I
                    source={require('../assets/finImages/bxs_up-arrow.png')}
                  />
                </_TO>

                <_T style={_q$.Q8RZ9mP2}>Tap</_T>

                <_I
                  source={require('../assets/finImages/bottomStars.png')}
                  style={_q$.Pm9RQL82}
                />
              </_V>
            </LinearGradient>
          </LinearGradient>

          <_V style={_q$.AzQ9mP2R}>
            <_V style={_q$.bLm29QpR}>
              <_T style={_q$.cP9Rm2QZ}>{_pt$(_sl$)}</_T>
            </_V>

            <_TO onPress={_fp$} style={_q$.dR2Qm9PZ} activeOpacity={0.7}>
              <_I
                source={require('../assets/finImages/solar_pause-bold.png')}
              />
            </_TO>
          </_V>

          <_V style={_q$.eQm2P9RZ}>
            {_dp$.map(_it$ => (
              <_TO
                key={_it$.id}
                activeOpacity={0.7}
                onPress={() => _bp$(_it$)}
                style={[
                  _q$.fP9Qm2RZ,
                  {
                    left: _it$.x,
                    top: _it$.y,
                    width: _it$.size,
                    height: _it$.size,
                  },
                ]}
              >
                <_I
                  source={require('../assets/finImages/emptyBubble.png')}
                  style={_q$.gR2Pm9QZ}
                  resizeMode="contain"
                />
                {_it$.isFlamingo && (
                  <_I
                    source={require('../assets/finImages/flamingoBubble.png')}
                    style={_q$.hQm2R9Pz}
                    resizeMode="contain"
                  />
                )}
              </_TO>
            ))}
          </_V>

          {_pz$ && (
            <_V style={_q$.iP9Qm2RZ}>
              <LinearGradient
                colors={['#610EAC', '#C83DD7']}
                style={_q$.jR2Pm9QZ}
              >
                <_V style={{ padding: 15, alignItems: 'center' }}>
                  <_TO onPress={_fp$} activeOpacity={0.7} style={_q$.kQm2R9Pz}>
                    <_T style={_q$.lP9Qm2RZ}>Continue</_T>
                  </_TO>

                  <_TO
                    style={_q$.kQm2R9Pz}
                    activeOpacity={0.7}
                    onPress={() => {
                      _srn$(false);
                      _spz$(false);
                      _n$.goBack();
                    }}
                  >
                    <_T style={_q$.lP9Qm2RZ}>Main Menu</_T>
                  </_TO>

                  <_TO
                    style={_q$.mR2Pm9QZ}
                    activeOpacity={0.7}
                    onPress={() => _sf$(!_fs$)}
                  >
                    <_I
                      source={
                        _fs$
                          ? require('../assets/finImages/musBtn.png')
                          : require('../assets/finImages/musicOff.png')
                      }
                    />
                  </_TO>
                </_V>
              </LinearGradient>
            </_V>
          )}
        </_SA>
      </_IB>
    );
  }

  if (_md$ === 'result') {
    return (
      <_IB
        source={require('../assets/finImages/doneBg.png')}
        style={_q$.x9KqP3Lm}
      >
        <_SV
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <_SA style={_q$.nQm2R9Pz}>
            <_I
              source={require('../assets/finImages/tapRes.png')}
              style={{ marginBottom: 14 }}
            />

            <_T style={_q$.oP9Qm2RZ}>You crushed it!</_T>
            <_T style={_q$.oP9Qm2RZ}>Your fingers were on fire</_T>
            <_T style={_q$.oP9Qm2RZ}>
              All those taps turned into Flamingo Points.
            </_T>

            <_T style={_q$.pR2Pm9QZ}>Points earned: +{_rs$}</_T>
            <_T style={_q$.qQm2R9Pz}>Total balance: {_wl$}</_T>

            <_V style={_q$.rP9Qm2RZ}>
              <_TO
                onPress={() => _n$.navigate('_0xPz0n3$')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#FE9200', '#FDEF70', '#FD3213']}
                  style={_q$.sR2Pm9QZ}
                >
                  <_T style={_q$.tQm2R9Pz}>Party Zone</_T>
                </LinearGradient>
              </_TO>

              <_TO activeOpacity={0.7} onPress={_shr$}>
                <LinearGradient
                  colors={['#FE9200', '#FDEF70', '#FD3213']}
                  style={_q$.sR2Pm9QZ}
                >
                  <_T style={_q$.tQm2R9Pz}>Share</_T>
                </LinearGradient>
              </_TO>

              <_TO onPress={() => _smd$('start')} activeOpacity={0.7}>
                <LinearGradient
                  colors={['#FE9200', '#FDEF70', '#FD3213']}
                  style={_q$.sR2Pm9QZ}
                >
                  <_T style={_q$.tQm2R9Pz}>Exit</_T>
                </LinearGradient>
              </_TO>
            </_V>
          </_SA>
        </_SV>
      </_IB>
    );
  }

  return null;
}

const _q$ = _SS.create({
  x9KqP3Lm: { flex: 1 },

  R8dM2QaZ: { flex: 1 },

  TmP9LxA4: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  LpA9QeR4: { color: '#fff', fontSize: 20, fontWeight: '600' },

  V7M2R9Qa: {
    marginTop: 12,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 20,
    zIndex: 1,
  },

  J4QmR8PZ: {
    padding: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  K9P2R7Qm: { position: 'absolute', left: 20 },

  Q8RZ9mP2: { fontSize: 22, fontWeight: '900', color: '#FDEB57' },

  Pm9RQL82: {
    position: 'absolute',
    width: '100%',
    height: 60,
    zIndex: -1,
  },

  ZP3mR9Q2: {
    width: 132,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  RQ9mP23Z: {
    color: '#FDEB57',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },

  mP9Q2RZ8: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  KpR8Qm2Z: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '500',
  },

  Qm2R9PzA: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },

  QmR29PzA: { color: '#FDEB57', fontSize: 24, fontWeight: '700' },

  RmQ3P9Za: {
    width: 258,
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },

  PzQm29Ra: { color: '#FDEB57', fontSize: 24, fontWeight: '900' },

  VxP2R9Qa: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(128, 90, 213, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(252, 230, 253, 0.2)',
  },

  AzQ9mP2R: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    zIndex: 1,
  },

  bLm29QpR: {
    backgroundColor: '#1C0234',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#691D7A',
    minWidth: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cP9Rm2QZ: { color: '#FDEB57', fontSize: 22, fontWeight: '900' },

  dR2Qm9PZ: {
    backgroundColor: '#1C0234',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#691D7A',
  },

  eQm2P9RZ: { flex: 1, position: 'relative' },

  fP9Qm2RZ: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gR2Pm9QZ: { width: '100%', height: '100%', position: 'absolute' },

  hQm2R9Pz: { width: '60%', height: '60%' },

  iP9Qm2RZ: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    zIndex: 2,
  },

  jR2Pm9QZ: {
    width: '70%',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F9CDF9',
  },

  kQm2R9Pz: {
    backgroundColor: 'rgba(16, 6, 61, 0.9)',
    width: '100%',
    height: 40,
    borderRadius: 50,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lP9Qm2RZ: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },

  mR2Pm9QZ: {
    marginTop: 16,
    backgroundColor: 'rgba(16, 6, 61, 0.9)',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nQm2R9Pz: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  oP9Qm2RZ: {
    fontSize: 16,
    color: '#FDE6D9',
    textAlign: 'center',
    marginVertical: 2,
    fontWeight: '500',
  },

  pR2Pm9QZ: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginTop: 30,
    marginBottom: 8,
  },

  qQm2R9Pz: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FDEB57',
    marginBottom: 40,
  },

  rP9Qm2RZ: { gap: 12 },

  sR2Pm9QZ: {
    borderRadius: 50,
    minWidth: 216,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tQm2R9Pz: {
    color: '#10063D',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

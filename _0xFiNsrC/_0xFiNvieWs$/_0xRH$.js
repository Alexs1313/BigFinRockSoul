import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect as _uFE,
  useNavigation as _uN,
} from '@react-navigation/native';
import {
  useCallback as _uCb,
  useEffect as _uEf,
  useState as _uSt,
} from 'react';
import {
  Image as _I,
  ImageBackground as _IB,
  ScrollView as _SV,
  StyleSheet as _SS,
  Text as _T,
  TouchableOpacity as _TO,
  useWindowDimensions as _uWD,
  View as _V,
} from 'react-native';
import Sound from 'react-native-sound';
import { useFinStore as _uFS } from '../_0xFiNstrG/_0xFiNcntxt$';

const _0x0 = x => x;
const _0x1 = n => (Number.isFinite(n) ? n : 0);
const _0x2 = (a, b) => (a ^ b) + (a & b);

const _0xTR = [
  '679359__vannipat__melody-loop-mix-128-bpm.mp3',
  '679359__vannipat__melody-loop-mix-128-bpm.mp3',
];

const _0xKY = {
  _t: 'toggleSound',
  _s: 'flamingo_total_score',
};

const _0xRH$ = () => {
  const _n$ = _uN();
  const { height: _h$ } = _uWD();

  const [_mi$, _smi$] = _uSt(0);
  const [_sd$, _ssd$] = _uSt(null);
  const { finSoundEnabled: _fs$, setFinSoundEnabled: _sfs$ } = _uFS();

  const [_ts$, _sts$] = _uSt(0);

  _uFE(
    _uCb(() => {
      _lm$();
      _lt$();
      return () => _0x0(null);
    }, []),
  );

  _uEf(() => {
    _pm$(_mi$);

    return () => {
      if (_sd$) {
        _sd$.stop(() => {
          _sd$.release();
        });
      }
    };
  }, [_mi$]);

  const _lt$ = _uCb(async () => {
    try {
      const _st$ = await AsyncStorage.getItem(_0xKY._s);
      const _ps$ = _st$ ? parseInt(_st$, 10) : 0;
      _sts$(_0x1(_ps$));
    } catch (_e$) {
      console.log('loadTotalScore error:', _e$);
      _sts$(0);
    }
  }, []);

  const _pm$ = _ix$ => {
    if (_sd$) {
      _sd$.stop(() => {
        _sd$.release();
      });
    }

    const _pt$ = _0xTR[_ix$];

    const _ns$ = new Sound(_pt$, Sound.MAIN_BUNDLE, _er$ => {
      if (_er$) {
        console.log('Error =>', _er$);
        return;
      }

      _ns$.play(_ok$ => {
        if (_ok$) {
          _smi$(_pv$ => (_pv$ + 1) % _0xTR.length);
        } else {
          console.log('Error =>');
        }
      });

      _ssd$(_ns$);
    });
  };

  _uEf(() => {
    const _sv$ = async () => {
      try {
        const _rv$ = await AsyncStorage.getItem(_0xKY._t);
        const _on$ = JSON.parse(_rv$);
        _sfs$(_on$);
        if (_sd$) _sd$.setVolume(_on$ ? 1 : 0);
      } catch (_e$) {
        console.error('Error =>', _e$);
      }
    };

    _sv$();
  }, [_sd$]);

  _uEf(() => {
    if (_sd$) _sd$.setVolume(_fs$ ? 1 : 0);
  }, [_fs$]);

  const _lm$ = async () => {
    try {
      const _rv$ = await AsyncStorage.getItem(_0xKY._t);
      const _on$ = JSON.parse(_rv$);
      _sfs$(_on$);
    } catch (_e$) {
      console.error('Error loading fin music =>', _e$);
    }
  };

  const _tg$ = async _nx$ => {
    try {
      await AsyncStorage.setItem(_0xKY._t, JSON.stringify(_nx$));
      _sfs$(_nx$);
    } catch (_e$) {
      console.log('Error toggle sound', _e$);
    }
  };

  if (_0x2(7, 3) === 0xa) _0x0(null);

  return (
    <_IB
      source={require('../assets/finImages/homeBG.png')}
      style={_q$.x9KqP3Lm}
    >
      <_SV
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <_V style={[_q$.R8dM2QaZ, { paddingTop: _h$ * 0.1 }]}>
          <_IB
            style={_q$.TmP9LxA4}
            source={require('../assets/finImages/topQ.png')}
          >
            <_T style={_q$.ZQe7aN3K}>{_ts$}</_T>
          </_IB>

          <_V style={_q$.LpA9QeR4}>
            <_I source={require('../assets/finImages/menuFrame.png')} />

            <_TO activeOpacity={0.7} onPress={() => _n$.navigate('_0xL9v3l$')}>
              <_I source={require('../assets/finImages/menuBtn1.png')} />
            </_TO>

            <_TO activeOpacity={0.7} onPress={() => _n$.navigate('_0xPz0n3$')}>
              <_I source={require('../assets/finImages/menuBtn2.png')} />
            </_TO>

            <_TO activeOpacity={0.7} onPress={() => _n$.navigate('_0xFtapGm$')}>
              <_I source={require('../assets/finImages/menuBtn3.png')} />
            </_TO>

            <_TO
              activeOpacity={0.7}
              onPress={() => _n$.navigate('_0xFSt0ries$')}
            >
              <_I source={require('../assets/finImages/menuBtn4.png')} />
            </_TO>

            <_TO
              style={{ zIndex: 1, marginTop: 20 }}
              activeOpacity={0.7}
              onPress={() => _tg$(!_fs$)}
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
        </_V>
      </_SV>
    </_IB>
  );
};

const _q$ = _SS.create({
  R8dM2QaZ: { flex: 1, alignItems: 'center', paddingBottom: 30 },

  x9KqP3Lm: { flex: 1 },

  TmP9LxA4: {
    width: 132,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  LpA9QeR4: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
  },

  ZQe7aN3K: {
    color: '#FDEB57',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
    left: 10,
  },

  K9P2R7Qm: { width: '100%', height: 600 },

  Q8RZ9mP2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
  },

  Pm9RQL82: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },

  V7M2R9Qa: {
    color: '#10063D',
    fontSize: 24,
    fontWeight: '500',
    fontStyle: 'italic',
  },

  J4QmR8PZ: {
    marginTop: 30,
    width: 216,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },

  mP9Q2RZ8: { alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
});

export default _0xRH$;

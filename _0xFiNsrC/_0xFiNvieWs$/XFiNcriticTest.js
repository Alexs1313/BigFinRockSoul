import React, {
  useEffect as _uEf,
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
  Share as _Sh,
  Alert as _Al,
  Platform as _P,
} from 'react-native';
import {
  useNavigation as _uN,
  useRoute as _uR,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { quizQuestions as _qz$ } from '../_0xFiNdtA$/quizQuestions';

const _0xP = {
  _m: 'critic_max_level',
  _f: 'party_fish_unlocked',
};

const _0xD = {
  _c: 'stories_unlocked_count',
  _l: 'story_max_level',
};

const _0x0 = () => 0;
const _0x1 = n => (Number.isFinite(n) ? n : 0);
const _0x2 = (a, b) => (a ^ b) + (a & b);
const _0x3 = x => x;

export function XFiNcriticTest() {
  const _n$ = _uN();
  const _r$ = _uR();

  const _lv$ = _uMm(() => {
    const _raw$ = Number(_r$?.params?.level || 1);
    const _cl$ = Math.max(1, Math.min(6, _0x1(_raw$)));
    return _cl$;
  }, [_r$?.params?.level]);

  const [_a$, _sa$] = _uSt(_lv$);
  const [_qi$, _sqi$] = _uSt(0);
  const [_pk$, _spk$] = _uSt(null);
  const [_ph$, _sph$] = _uSt('quiz'); // quiz | done | over

  _uEf(() => {
    _sa$(_lv$);
    _sqi$(0);
    _spk$(null);
    _sph$('quiz');
  }, [_lv$]);

  const _lp$ = _uMm(() => _qz$[_a$], [_a$]);
  const _cc$ = _lp$[_qi$];

  const _sv$ = async _dl$ => {
    try {
      const _mx$ = await AsyncStorage.getItem(_0xP._m);
      const _ms$ = _mx$ ? parseInt(_mx$, 10) : 0;
      const _nm$ = Math.max(_ms$, _dl$);
      await AsyncStorage.setItem(_0xP._m, String(_nm$));

      const _sh$ = Math.min(7, _dl$ + 1);
      const _fx$ = await AsyncStorage.getItem(_0xP._f);
      const _fs$ = _fx$ ? parseInt(_fx$, 10) : 1;
      const _nf$ = Math.max(_fs$, _sh$);
      await AsyncStorage.setItem(_0xP._f, String(_nf$));

      const _sl$ = await AsyncStorage.getItem(_0xD._l);
      const _ls$ = _sl$ ? parseInt(_sl$, 10) : 0;

      if (_dl$ > _ls$) {
        const _cx$ = await AsyncStorage.getItem(_0xD._c);
        const _cs$ = _cx$ ? parseInt(_cx$, 10) : 0;
        const _nc$ = Math.min(6, _cs$ + 1);

        await AsyncStorage.setItem(_0xD._c, String(_nc$));
        await AsyncStorage.setItem(_0xD._l, String(_dl$));
      }
    } catch (_e$) {
      if (_0x2(7, 3) === 0xa) _0x0();
      console.log('saveLevelRewards error:', _e$);
    }
  };

  _uEf(() => {
    if (_ph$ === 'done') _sv$(_a$);
  }, [_ph$, _a$]);

  const _rs$ = _nx$ => {
    _sa$(_nx$);
    _sqi$(0);
    _spk$(null);
    _sph$('quiz');
  };

  const _sw$ = async () => {
    try {
      await _Sh.share({
        message: `Level  ${_a$} done! Someone just joined your party`,
      });
    } catch (_e$) {
      _Al.alert('Share error', String(_e$?.message || _e$));
    }
  };

  const _sl$ = async () => {
    try {
      await _Sh.share({
        message: `Game over (Level ${_a$}). The music stopped!`,
      });
    } catch (_e$) {
      _Al.alert('Share error', String(_e$?.message || _e$));
    }
  };

  const _pkf$ = _ix$ => {
    if (_pk$ !== null) return;

    _spk$(_ix$);
    const _nx$ = _qi$ + 1;

    setTimeout(() => {
      if (_ix$ !== _cc$.correct) {
        _sph$('over');
        return;
      }

      if (_nx$ >= _lp$.length) {
        _sph$('done');
      } else {
        _sqi$(_nx$);
        _spk$(null);
      }
    }, 600);
  };

  if (_ph$ === 'over') {
    return (
      <_IB
        source={require('../assets/finImages/loseBg.png')}
        style={_u$.x9KqP3Lm}
      >
        <_SA style={_u$.KpR8Qm2Z}>
          <_I source={require('../assets/finImages/gameOverText.png')} />
          <_T style={[_u$.RmQ3P9Za, { marginBottom: 60 }]}>
            The music stopped...
          </_T>

          <_0xO
            _lb="Retry Level"
            _op={() => {
              _sqi$(0);
              _spk$(null);
              _sph$('quiz');
            }}
          />
          <_0xO _lb="Share" _op={_sl$} />
          <_0xO _lb="Exit" _op={() => _n$.goBack()} />
        </_SA>
      </_IB>
    );
  }

  if (_ph$ === 'done') {
    const _hn$ = Boolean(_qz$[_a$ + 1]);

    return (
      <_IB
        source={require('../assets/finImages/doneBg.png')}
        style={_u$.x9KqP3Lm}
      >
        <_SA style={_u$.KpR8Qm2Z}>
          <_I source={require('../assets/finImages/doneText.png')} />
          <_T style={_u$.RmQ3P9Za}>Someone just joined your party!</_T>

          <_T style={_u$.PzQm29Ra}>
            Looks like a new fish heard Big Fin’s voice{'\n'}
            and decided to join the party!
          </_T>

          <_I
            source={require('../assets/finImages/fin_happy.png')}
            style={_u$.Qm2R9PzA}
          />

          <_0xO
            _lb={_hn$ ? 'Next level' : 'Party Zone'}
            _op={() => {
              if (_hn$) _rs$(_a$ + 1);
              else _n$.navigate('_0xPz0n3$');
            }}
          />

          <_0xO _lb="Party Zone" _op={() => _n$.navigate('_0xPz0n3$')} />
          <_0xO _lb="Share" _op={_sw$} />
          <_0xO _lb="Exit" _op={() => _n$.goBack()} />
        </_SA>
      </_IB>
    );
  }

  return (
    <_IB
      source={require('../assets/finImages/gameBg.png')}
      style={_u$.x9KqP3Lm}
    >
      <_SA style={{ flex: 1 }}>
        <LinearGradient colors={['#FCE6FD', '#C738FA']} style={_u$.R8dM2QaZ}>
          <LinearGradient
            colors={['#610EAC', '#C83DD7']}
            style={{
              padding: _P.OS === 'ios' ? 2 : 0,
              borderRadius: 16,
              width: '100%',
            }}
          >
            <_V style={_u$.TmP9LxA4}>
              <_TO onPress={() => _n$.goBack()} style={_u$.ZQe7aN3K}>
                <_I source={require('../assets/finImages/bxs_up-arrow.png')} />
              </_TO>

              <_T style={_u$.LpA9QeR4}>{` Level ${_a$}`}</_T>

              <_I
                source={require('../assets/finImages/bottomStars.png')}
                style={_u$.V7M2R9Qa}
              />
            </_V>
          </LinearGradient>
        </LinearGradient>

        <_V style={_u$.MqP9R2Za}>
          <_T style={_u$.ZmQ2R9Pa}>{_cc$?.q}</_T>
        </_V>

        <_V style={_u$.PmR9Q2Za}>
          {_cc$?.answers?.map((_lb$, _i$) => {
            const _ok$ = _pk$ !== null && _i$ === _cc$.correct;
            const _bad$ = _pk$ === _i$ && _i$ !== _cc$.correct;

            return (
              <_TO
                key={`${_a$}-${_qi$}-${_i$}`}
                disabled={_pk$ !== null}
                activeOpacity={0.7}
                onPress={() => _pkf$(_i$)}
                style={{ alignSelf: 'center', width: '60%' }}
              >
                <LinearGradient
                  colors={
                    _ok$
                      ? ['#78E9DC', '#249881']
                      : _bad$
                      ? ['#E98178', '#982424']
                      : ['#DE78E9', '#3D2498']
                  }
                  style={_u$.RQm2P9Za}
                >
                  <_V style={{ paddingHorizontal: 8 }}>
                    <_T style={_u$.QmR29PzA}>{_lb$}</_T>
                  </_V>
                </LinearGradient>
              </_TO>
            );
          })}
        </_V>
      </_SA>
    </_IB>
  );
}

function _0xO({ _lb, _op }) {
  return (
    <_TO onPress={_op} style={{ marginVertical: 6 }} activeOpacity={0.7}>
      <LinearGradient
        colors={['#FE9200', '#FDEF70', '#FD3213']}
        style={_u$.RQ9mP23Z}
      >
        <_T style={_u$.mP9Q2RZ8}>{_lb}</_T>
      </LinearGradient>
    </_TO>
  );
}

const _u$ = _SS.create({
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

  MqP9R2Za: {
    marginHorizontal: 24,
    marginTop: 40,
    padding: 24,
    backgroundColor: '#341246E5',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#F9CDF9',
    minHeight: 200,
    justifyContent: 'center',
  },

  ZmQ2R9Pa: { color: '#fff', fontSize: 20, textAlign: 'center' },

  PmR9Q2Za: { marginTop: 30, gap: 16 },

  RQm2P9Za: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    minWidth: 200,
    borderWidth: 1,
    borderColor: '#F9CDF9',
  },

  QmR29PzA: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  KpR8Qm2Z: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  RmQ3P9Za: {
    fontSize: 18,
    color: '#FDEB57',
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 14,
  },

  PzQm29Ra: {
    fontSize: 16,
    color: '#FDE6D9',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },

  Qm2R9PzA: { marginVertical: 20 },

  RQ9mP23Z: {
    height: 40,
    width: 216,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mP9Q2RZ8: {
    color: '#10063D',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

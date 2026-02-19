import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from './ScreenHeader';

export default function BigFinCriticQuizPhase({
  activeLevel,
  questionIndex,
  currentCard,
  pickedIndex,
  questionCardMarginT,
  questionCardMinH,
  questionCardPad,
  questionCardRadius,
  questionTextSize,
  answersWrapMarginT,
  answersGap,
  answerBtnMinH,
  answerBtnMinW,
  answerTextSize,
  onPickAnswer,
  onBack,
}) {
  return (
    <ImageBackground
      source={require('../assets/finImages/gameBg.png')}
      style={styles.root}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenHeader title={` Level ${activeLevel}`} onBack={onBack} />

        <View
          style={[
            styles.questionCard,
            {
              marginTop: questionCardMarginT,
              minHeight: questionCardMinH,
              padding: questionCardPad,
              borderRadius: questionCardRadius,
            },
          ]}
        >
          <Text style={[styles.questionText, { fontSize: questionTextSize }]}>
            {currentCard?.q}
          </Text>
        </View>

        <View
          style={[
            styles.answersWrap,
            { marginTop: answersWrapMarginT, gap: answersGap },
          ]}
        >
          {currentCard?.answers?.map((label, i) => {
            const isCorrect = pickedIndex !== null && i === currentCard.correct;
            const isWrong = pickedIndex === i && i !== currentCard.correct;

            return (
              <TouchableOpacity
                key={`${activeLevel}-${questionIndex}-${i}`}
                disabled={pickedIndex !== null}
                activeOpacity={0.7}
                onPress={() => onPickAnswer(i)}
                style={{ alignSelf: 'center', width: '60%' }}
              >
                <LinearGradient
                  colors={
                    isCorrect
                      ? ['#78E9DC', '#249881']
                      : isWrong
                      ? ['#E98178', '#982424']
                      : ['#DE78E9', '#9b24ceff', '#3D2498']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.answerBtn,
                    {
                      minHeight: answerBtnMinH,
                      minWidth: answerBtnMinW,
                    },
                  ]}
                >
                  <View style={{ paddingHorizontal: 8 }}>
                    <Text style={[styles.answerText, { fontSize: answerTextSize }]}>
                      {label}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  questionCard: {
    marginHorizontal: 24,
    backgroundColor: '#f282f0ff',
    borderWidth: 3,
    borderColor: '#F9CDF9',
    justifyContent: 'center',
  },
  questionText: { color: '#fff', textAlign: 'center' },
  answersWrap: {},
  answerBtn: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F9CDF9',
  },
  answerText: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

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
  onPickAnswer,
  onBack,
}) {
  return (
    <ImageBackground
      source={require('../assets/finImages/gameBg.png')}
      style={styles.root}
    >
      <SafeAreaView style={styles.safe}>
        <ScreenHeader title={` Level ${activeLevel}`} onBack={onBack} />

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentCard?.q}</Text>
        </View>

        <View style={styles.answersWrap}>
          {currentCard?.answers?.map((label, i) => {
            const isCorrect = pickedIndex !== null && i === currentCard.correct;
            const isWrong = pickedIndex === i && i !== currentCard.correct;

            return (
              <TouchableOpacity
                key={`${activeLevel}-${questionIndex}-${i}`}
                disabled={pickedIndex !== null}
                activeOpacity={0.7}
                onPress={() => onPickAnswer(i)}
                style={styles.answerWrap}
              >
                <LinearGradient
                  colors={
                    isCorrect
                      ? ['#78E9DC', '#249881']
                      : isWrong
                      ? ['#E98178', '#982424']
                      : ['#FDEB57', '#FE9200']
                  }
                  style={[styles.answerBtn, styles.answerBtnSize]}
                >
                  <View style={styles.answerTextWrap}>
                    <Text style={styles.answerText}>{label}</Text>
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
  safe: { flex: 1 },
  questionCard: {
    marginTop: 40,
    minHeight: 200,
    padding: 24,
    borderRadius: 12,
    marginHorizontal: 24,
    backgroundColor: 'rgba(52, 18, 70, 0.9)',
    borderWidth: 3,
    borderColor: '#F9CDF9',
    justifyContent: 'center',
  },
  questionText: { color: '#fff', textAlign: 'center', fontSize: 20 },
  answersWrap: { marginTop: 30, gap: 16 },
  answerWrap: { alignSelf: 'center', width: '60%' },
  answerBtn: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F9CDF9',
  },
  answerBtnSize: { minHeight: 40, minWidth: 216 },
  answerTextWrap: { paddingHorizontal: 8 },
  answerText: {
    fontSize: 16,
    color: '#3D1B06',
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

export default function BubbleItem({ item, onPop, styles }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.25,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onPop(item));
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={[
        styles.tapBubbleWrap,
        {
          left: item.x,
          top: item.y,
          width: item.size,
          height: item.size,
        },
      ]}
    >
      <Animated.View
        style={[
          {
            width: item.size,
            height: item.size,
            alignItems: 'center',
            justifyContent: 'center',
          },
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image
          source={require('../assets/finImages/emptyBubble.png')}
          style={styles.tapBubbleBack}
          resizeMode="contain"
        />
        {item.isFlamingo && (
          <Image
            source={require('../assets/finImages/flamingoBubble.png')}
            style={styles.tapBubbleFront}
            resizeMode="contain"
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

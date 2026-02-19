import { useMemo } from 'react';
import { useWindowDimensions, Platform } from 'react-native';

export function useAdaptiveSizes() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const comp = height < 740 || width < 360;
    const s = height < 680 || width < 350;
    const xS = height < 640 || width < 340;

    const pick = (xsVal, sVal, baseVal) => (xS ? xsVal : s ? sVal : baseVal);

    const sidePad = pick(12, 14, 18);
    const topPad = Platform.OS === 'ios' ? pick(6, 8, 14) : pick(4, 6, 10);
    const scrollBottom = Platform.OS === 'android' ? 120 : 120;

    return {
      width,
      height,
      comp,
      s,
      xS,
      pick,
      sidePad,
      topPad,
      scrollBottom,
    };
  }, [width, height]);
}

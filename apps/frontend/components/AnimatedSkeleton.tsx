import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const AnimatedSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }} className="mr-4 w-56">
      <Animated.View style={{ opacity }} className="mb-3 h-60 w-full rounded-lg bg-slate-700" />

      <Animated.View style={{ opacity }} className="mb-2 h-4 rounded-md bg-slate-600" />

      <Animated.View style={{ opacity }} className="mb-2 h-3 w-3/4 rounded-md bg-slate-600" />

      <Animated.View style={{ opacity }} className="h-3 w-1/2 rounded-md bg-slate-600" />
    </Animated.View>
  );
};

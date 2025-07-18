import { useFonts } from 'expo-font';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export function useSplashAnimation() {
    const opacity = useRef(new Animated.Value(0)).current; // 🔹 Comienza invisible
    const [isReady, setIsReady] = useState(false);

    useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.delay(1500),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            })
        ]).start(() => setIsReady(true));
    }, []);

    return { opacity, isReady };
}
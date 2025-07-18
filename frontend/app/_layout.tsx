import { SessionProvider } from '@/contexts/authentication';
import { useSplashAnimation } from '@/hooks/useSplashAnimation';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Animated, View } from 'react-native';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native/components/ToastManager';

export default function RootLayout() {
  const { opacity, isReady } = useSplashAnimation();

  if (!isReady) {
    return (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}>
        <Animated.Image
          source={require("../assets/images/splash-icon.png")}
          style={{ opacity, width: 300, height: 300 }}
        />
      </View>
    );
  }

  return (
    <SessionProvider>
      <ToastManager
        position="bottom"
        textStyle={{
          fontSize: 14,
          color: "#fff",
        }}
        style={{
          width: "100%",
          backgroundColor: "#222",
          borderRadius: 8,
          shadowColor: "#000",
        }}
      />
      <StatusBar style={"dark"} />
      <Slot />
    </SessionProvider>
  );
}

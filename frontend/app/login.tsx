import InputFormik from "@/components/Input";
import useLogin from "@/hooks/auth/useLogin";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function Login() {
    const router = useRouter();
    const {
        values,
        errors,
        touched,
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useLogin();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={"dark"} />
            <Text style={styles.title}>
                Login in
                <Text style={styles.titlePink}> Roomies</Text>
            </Text>

            <View style={styles.form}>
                <InputFormik
                    label="Email"
                    name="email"
                    value={values.email}
                    error={(touched.email && !!errors.email) as boolean}
                    errorText={errors.email as string}
                    handleChange={handleChange("email")}
                    handleBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    left={<TextInput.Icon icon="email" size={20} style={{ opacity: .25 }} />}
                />

                <InputFormik
                    label="Password"
                    name="password"
                    value={values.password}
                    error={(touched.password && !!errors.password) as boolean}
                    errorText={errors.password as string}
                    handleChange={handleChange("password")}
                    handleBlur={handleBlur("password")}
                    secureTextEntry
                    left={<TextInput.Icon icon="lock" size={20} style={{ opacity: .25 }} />}
                />

                <Text
                    onPress={() => router.push("/reset-password")}
                    style={styles.resetPassword}
                >
                    Have you forgotten your password?
                </Text>

                <TouchableOpacity
                    onPress={(e: any) => handleSubmit(e)}
                    disabled={loading}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text>If you don't have an account, register </Text>
                    <Text
                        onPress={() => router.push("/register")}
                        style={styles.footerLink}
                    >
                        here
                    </Text>
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 50
    },
    title: {
        color: "#0f0f0f",
        fontWeight: 900,
        fontSize: 40,
        textAlign: "center",
        marginBottom: 30,
    },
    titlePink: {
        color: "#F45B68"
    },
    logo: {
        marginVertical: 5,
        marginHorizontal: "auto",
    },
    form: {
        paddingHorizontal: 20,
        gap: 10,
    },
    resetPassword: {
        marginTop: 10,
        textDecorationLine: "underline",
    },
    button: {
        alignItems: "center",
        fontWeight: 900,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "#0f0f0f",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 700,
        color: "white"
    },
    footer: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "center",
    },
    footerLink: {
        padding: 0,
        margin: 0,
        color: "0f0f0f",
        fontWeight: 700,
    },
});

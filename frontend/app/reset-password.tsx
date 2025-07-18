import InputFormik from "@/components/Input";
import useResetPassword from "@/hooks/auth/useResetPassword";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const ResetPassword = () => {
    const router = useRouter();
    const {
        values,
        errors,
        touched,
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useResetPassword();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>

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

                <Button
                    mode="contained"
                    onPress={(e: any) => handleSubmit(e)}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                    buttonColor="#0f0f0f"
                    textColor="white"
                >
                    Send instructions
                </Button>

                <View style={styles.footer}>
                    <Text>Return to </Text>
                    <Text
                        onPress={() => router.push("/login")}
                        style={styles.footerLink}
                    >
                        login
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    title: {
        color: "#0f0f0f",
        fontWeight: 900,
        fontSize: 38,
        textAlign: "center",
        marginBottom: 30,
    },
    logo: {
        marginVertical: 5,
        marginHorizontal: "auto",
    },
    form: {
        paddingHorizontal: 10,
        gap: 10,
    },
    button: {
        fontWeight: 900,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 10,
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

export default ResetPassword;
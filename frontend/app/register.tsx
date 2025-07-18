import CountryPrefixInput from "@/components/CountryPrefixInput";
import InputFormik from "@/components/Input";
import useRegister from "@/hooks/auth/useRegister";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function Register() {
    const router = useRouter();
    const {
        values,
        errors,
        touched,
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = useRegister();
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={"dark"} />
            <Text style={styles.title}>
                Register in
                <Text style={styles.titlePink}> Roomies</Text>
            </Text>

            <View style={styles.form}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <InputFormik
                        style={{ width: "45%" }}
                        label="First Name"
                        name="name"
                        value={values.name}
                        error={(touched.name && !!errors.name) as boolean}
                        errorText={errors.name as string}
                        handleChange={handleChange("name")}
                        handleBlur={handleBlur("name")}
                        left={<TextInput.Icon icon="human" size={20} style={{ opacity: .25 }} />}
                    />

                    <InputFormik
                        style={{ width: "45%" }}
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        error={(touched.lastName && !!errors.lastName) as boolean}
                        errorText={errors.lastName as string}
                        handleChange={handleChange("lastName")}
                        handleBlur={handleBlur("lastName")}
                        left={<TextInput.Icon icon="human" size={20} style={{ opacity: .25 }} />}
                    />
                </View>

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

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 5
                    }}
                >
                    <CountryPrefixInput
                        label={"Prefix"}
                        name={"countryCode"}
                        value={values.countryCode}
                        error={(touched.countryCode && !!errors.countryCode) as boolean}
                        errorText={errors.countryCode as string}
                        setFieldValue={setFieldValue}
                        handleBlur={(field) => (e) => {
                            handleBlur(field)(e);
                        }}
                        keyboardType="phone-pad"
                        left={<TextInput.Icon icon="earth" size={20} style={{ opacity: .25 }} />}
                    />
                    <InputFormik
                        label="Telephone"
                        name="phone"
                        value={values.phone}
                        error={(touched.phone && !!errors.phone) as boolean}
                        errorText={errors.phone as string}
                        handleChange={handleChange("phone")}
                        handleBlur={handleBlur("phone")}
                        keyboardType="phone-pad"
                        style={{ width: "60%" }}
                        left={<TextInput.Icon icon="phone" size={20} style={{ opacity: .25 }} />}
                    />
                </View>

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
                    <Text style={styles.buttonText}>Register now</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text>If you already have an account, log in </Text>
                    <Text
                        onPress={() => router.push("/login")}
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
        paddingHorizontal: 20
    },
    title: {
        color: "#0f0f0f",
        fontWeight: 900,
        fontSize: 38,
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
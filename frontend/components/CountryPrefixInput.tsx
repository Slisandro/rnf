import { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, Text, TextInputFocusEventData, TouchableOpacity, View } from "react-native";
import {
    CountryButton,
    CountryPicker,
} from "react-native-country-codes-picker";
import { TextInput } from "react-native-paper";

interface InputFormikProps {
    name: string;
    label: string;
    value: string;
    error: boolean;
    errorText: string;
    setFieldValue: (field: string, value: any) => void;
    handleBlur: (field: string) => (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    keyboardType?: "default" | "email-address" | "phone-pad";
    secureTextEntry?: boolean;
    left?: React.ReactNode,
    right?: React.ReactNode
}

function ListHeaderComponent({ countries, lang, onPress }: { countries: any[], lang: any, onPress: any }) {
    return (
        <View style={{ paddingBottom: 20 }}>
            <Text style={{ marginVertical: 10 }}>Populares</Text>
            {countries?.map((country, index) => (
                <CountryButton
                    key={index}
                    item={country}
                    name={country?.name?.[lang || "en"]}
                    onPress={() => onPress(country)}
                    style={{ countryButtonStyles: styles.countryButtonStyles }}
                />
            ))}
        </View>
    );
}

export default function CountryPrefixInput({
    name,
    label,
    value,
    error,
    errorText,
    setFieldValue,
    handleBlur,
    keyboardType = "default",
    secureTextEntry = false,
    left,
    right
}: InputFormikProps) {
    const [show, setShow] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                // @ts-expect-error
                onPress={(event) => { setShow(true); handleBlur(name)(event) }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 50,
                    zIndex: 5,
                }}
            />
            <TextInput
                label={label}
                value={value}
                mode="flat"
                onBlur={handleBlur(name)}
                editable={false}
                style={styles.input}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                error={error}
                outlineColor="transparent"
                activeOutlineColor="transparent"
                left={left}
                right={right}
            />

            {error && <Text style={styles.error}>{errorText}</Text>}

            <CountryPicker
                show={show}
                lang="es"
                inputPlaceholder="Search your country"
                ListHeaderComponent={ListHeaderComponent}
                // popularCountries={["NI", "US"]}
                pickerButtonOnPress={(item) => {
                    setFieldValue(name, item.dial_code);
                    setShow(false);
                }}
                onBackdropPress={() => setShow(false)}
                style={{
                    modal: { height: 500 },
                    line: styles.line,
                    textInput: styles.textInput,
                    countryButtonStyles: styles.countryButtonStyles,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "35%",
    },
    error: {
        color: "red",
        fontSize: 12,
    },
    input: {
        backgroundColor: "transparent",
        textAlign: "center",
        borderWidth: 0,
        borderBottomColor: "#00000050"
    },
    textInput: {
        height: 50,
        paddingLeft: 15,
        backgroundColor: "transparent",
        borderColor: "#0f0f0f",
        borderWidth: 1,
        marginVertical: 5,
    },
    line: {
        height: 1,
        backgroundColor: "#0f0f0f",
    },
    countryButtonStyles: {
        height: 50,
        marginBottom: 5,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#0f0f0f",
    },
});
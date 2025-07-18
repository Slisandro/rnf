import Feather from "@expo/vector-icons/Feather";
import { View, TextInput, Pressable } from "react-native";

export default function SearchBar(
    { value, onChange, onSubmit }
        : { value: string, onChange: (v: string) => void, onSubmit: () => void }
) {
    return (
        <View style={{ paddingHorizontal: 20, position: "relative" }}>
            <TextInput
                placeholder="Search by city"
                value={value}
                onChangeText={onChange}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    borderBottomColor: "#00000050",
                    fontSize: 16,
                }}
            />
            <Pressable
                style={{
                    position: "absolute",
                    right: 35,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                }}
                onPress={onSubmit}
            >
                <Feather name="search" size={18} color="#00000050" />
            </Pressable>
        </View>
    );
}

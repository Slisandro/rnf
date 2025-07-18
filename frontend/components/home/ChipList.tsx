import { FlatList, TouchableOpacity, Text } from "react-native";
import styles from "@/styles/homeStyles";

export default function ChipList(
    { chips, selected, onSelect }: 
    { chips: any[], selected: any, onSelect: (id: string) => void }
) {
    return (
        <FlatList
            data={chips}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
                const isSelected = item === selected;
                return (
                    <TouchableOpacity
                        onPress={() => onSelect(item)}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                    >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                );
            }}
            style={{ paddingHorizontal: 10, marginVertical: 15 }}
        />
    );
}

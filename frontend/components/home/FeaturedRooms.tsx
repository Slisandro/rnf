import { FlatList, TouchableOpacity, Image, Text, Dimensions } from "react-native";
import styles from "@/styles/homeStyles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function FeaturedRooms(
    { data, onSelect }
        : { data: any[], onSelect: (id: string) => void }
) {
    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => onSelect(item.id)}
                    style={{
                        width: screenWidth * 0.5,
                        height: screenHeight * 0.45,
                        justifyContent: "flex-start"
                    }}
                >
                    <Image resizeMode={item.imageResize} source={item.image} style={styles.image} />
                    <Text style={styles.label}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </TouchableOpacity>
            )}
            style={{ paddingHorizontal: 10 }}
        />
    );
}

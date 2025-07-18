import { FlatList, Pressable, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import styles from "@/styles/homeStyles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function PopularDestinations(
  { data, onSelect }
    : { data: any[], onSelect: (id: string) => void }
) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelect(item.id)}
          style={{
            width: screenWidth * 0.5,
            height: screenHeight * 0.4,
          }}
        >
          <Image resizeMode={item.imageResize} source={item.image} style={styles.image} />
          <Text style={[styles.label, { paddingLeft: 10, textAlign: "center", fontSize: 20 }]}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
}

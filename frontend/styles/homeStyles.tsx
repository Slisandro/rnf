import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
    sectionTitle: {
        paddingHorizontal: 10,
        fontWeight: "bold",
        fontSize: 22,
        color: "#0D141C",
        marginBottom: 10
    },
    container: {
        padding: 10,
    },
    title: {
        fontWeight: 900,
        fontSize: 40,
        textAlign: "center",
        marginVertical: 15,
        color: "#F45B68"
    },
    card: {
        width: screenWidth * 0.5,
        height: screenHeight * 0.3,
        marginRight: 12,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        alignItems: "center",
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 8,
        backgroundColor: "#fff",
    },
    chipSelected: {
        backgroundColor: "#007bff",
        borderColor: "#007bff",
    },
    chipText: {
        color: "#333",
        fontWeight: "500",
    },
    chipTextSelected: {
        color: "#fff",
    },
    image: {
        width: "90%",
        height: "80%",
        borderRadius: 12,
        marginHorizontal: "auto"
    },
    label: {
        paddingTop: 8,
        fontSize: 16,
        fontWeight: "500",
        color: "#0D141C",
    },
    description: {
        fontSize: 14,
        color: "#4A739C"
    },
    row: {
        justifyContent: "space-between",
    },
    item: {
        backgroundColor: "#ddd",
        padding: 20,
        marginBottom: 10,
        width: screenWidth / 2 - 20, // ajusta el padding
        borderRadius: 10,
        alignItems: "center",
    },
});

export default styles
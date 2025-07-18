import ChipList from "@/components/home/ChipList";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import PopularDestinations from "@/components/home/PopularDestinations";
import SearchBar from "@/components/home/SearchBar";
import useSearchRoomsByCity from "@/hooks/home/useSearchRoomsByCity";
import styles from "@/styles/homeStyles";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

import { chipOptions, popularCountries, rooms } from "@/constants/homeData";

export default function HomeScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const { values, handleChange, handleSubmit } = useSearchRoomsByCity();

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.title}>Roomies</Text>
            <SearchBar value={values.city} onChange={handleChange} onSubmit={handleSubmit} />
            <ChipList chips={chipOptions} selected={selected} onSelect={setSelected} />
            <Text style={styles.sectionTitle}>Featured rooms</Text>
            <FeaturedRooms data={rooms} onSelect={setSelected} />
            <Text style={styles.sectionTitle}>Popular destinations</Text>
            <PopularDestinations data={popularCountries} onSelect={setSelected} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

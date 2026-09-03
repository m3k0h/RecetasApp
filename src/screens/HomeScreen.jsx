import { Caveat_600SemiBold } from "@expo-google-fonts/caveat";
import { Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_700Bold } from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";
import { FlatList, Text } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import RecetaCard from "../components/RecetaCard";
import { RECETAS } from "../data/recetas";

function ListaDeRecetas() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      className="flex-1 bg-cafe-50"
      data={RECETAS}
      keyExtractor={(receta) => receta.id}
      renderItem={({ item }) => <RecetaCard {...item} />}
      ListHeaderComponent={
        <>
          <Header />
          <Text
            className="mb-2 mt-4 px-4 text-xl text-cafe-500"
            style={{ fontFamily: "Caveat_600SemiBold", lineHeight: 30 }}
          >
            Recetas de la familia
          </Text>
        </>
      }
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
    />
  );
}

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({ Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_700Bold, Caveat_600SemiBold });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ListaDeRecetas />
    </SafeAreaProvider>
  );
}

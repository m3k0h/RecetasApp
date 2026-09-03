import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="items-center rounded-b-[36px] bg-cafe-900 px-6 pb-9 shadow-lg shadow-cafe-900/40"
      style={{ elevation: 6, paddingTop: insets.top + 24 }}
    >
      <View className="flex-row items-center">
        <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-cafe-50 shadow-sm shadow-cafe-900/30">
          <Text className="text-2xl">🍲</Text>
        </View>
        <Text
          className="text-3xl text-cafe-50"
          style={{ fontFamily: "Quicksand_700Bold", lineHeight: 40 }}
        >
          Recetas
        </Text>
      </View>
      <Text
        className="mt-2 px-2 text-center text-lg text-cafe-200"
        style={{ fontFamily: "Caveat_600SemiBold", lineHeight: 30 }}
      >
        Las recetas de la familia, todas juntas
      </Text>
    </View>
  );
}

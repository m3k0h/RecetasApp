import { Text, View } from "react-native";

export default function InfoItem({ icono, texto }) {
  return (
    <View className="mr-4 flex-row items-center">
      <Text className="mr-1 text-sm">{icono}</Text>
      <Text
        className="text-sm text-cafe-500"
        style={{ fontFamily: "Quicksand_500Medium" }}
      >
        {texto}
      </Text>
    </View>
  );
}
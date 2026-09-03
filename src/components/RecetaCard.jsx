import { Image, Text, View } from "react-native";
import Badge from "./Badge";
import InfoItem from "./InfoItem";

export default function RecetaCard({
  nombre,
  imagen,
  tiempoMin,
  porciones,
  dificultad,
  categoria,
}) {
  return (
    <View
      className="mx-4 mb-4 overflow-hidden rounded-2xl bg-white shadow-md shadow-cafe-900/20"
      style={{ elevation: 3 }}
    >
      <Image source={imagen} className="h-40 w-full" />

      <View className="p-4">
        <Text className="mb-2 text-lg font-bold text-cafe-900">{nombre}</Text>

        <View className="mb-2 flex-row">
          <Badge texto={dificultad} tipo="dificultad" />
          <Badge texto={categoria} tipo="categoria" />
        </View>

        <View className="flex-row">
          <InfoItem icono="⏱️" texto={`${tiempoMin} min`} />
          <InfoItem icono="🍽️" texto={`${porciones} porciones`} />
        </View>
      </View>
    </View>
  );
}

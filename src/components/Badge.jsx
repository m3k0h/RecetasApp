import { Text, View } from "react-native";

const DIFICULTAD_STYLES = {
  Fácil: { bg: "bg-cafe-100", text: "text-cafe-700" },
  Media: { bg: "bg-cafe-300", text: "text-cafe-900" },
  Difícil: { bg: "bg-cafe-900", text: "text-cafe-50" },
};
const CATEGORIA_STYLE = {
  bg: "border border-cafe-200 bg-white",
  text: "text-cafe-700",
};

export default function Badge({ texto, tipo }) {
  const { bg, text } =
    tipo === "dificultad"
      ? (DIFICULTAD_STYLES[texto] ?? DIFICULTAD_STYLES.Media)
      : CATEGORIA_STYLE;

  return (
    <View className={`mr-2 rounded-full px-3 py-1 ${bg}`}>
      <Text
        className={`text-xs ${text}`}
        style={{ fontFamily: "Quicksand_600SemiBold" }}
      >
        {texto}
      </Text>
    </View>
  );
}
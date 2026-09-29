import { Text, View } from "react-native";

const DIFICULTAD_STYLES = {
    Fácil: { bg: "bg-marron-100", text: "text-marron-700" },
    Media: { bg: "bg-marron-300", text: "text-marron-900" },
    Difícil: { bg: "bg-marron-900", text: "text-marron-50" },
};
const CATEGORIA_STYLE = {
    bg: "border border-marron-200 bg-white",
    text: "text-marron-700",
};

export default function Badge({ texto, tipo }) {
    const { bg, text } =
        tipo === "dificultad"
            ? (DIFICULTAD_STYLES[texto] ?? DIFICULTAD_STYLES.Media)
            : CATEGORIA_STYLE;

    return (
        <View className={`mr-2 rounded-full px-3 py-1 ${bg}`}>
            <Text className={`text-xs font-semibold ${text}`}>{texto}</Text>
        </View>
    );
}

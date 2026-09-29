import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const ICONOS = {
    "⏱️": "time-outline",
    "🍽️": "restaurant-outline",
};

export default function InfoItem({ icono, texto }) {
    const nombreIcono = ICONOS[icono];
    const theme = useTheme();

    return (
        <View className="mr-4 flex-row items-center">
            {nombreIcono ? (
                <Ionicons
                    name={nombreIcono}
                    size={14}
                    color={theme.colors.textMuted}
                    style={{ marginRight: 4 }}
                />
            ) : (
                <Text className="mr-1 text-sm">{icono}</Text>
            )}
            <Text className="text-sm" style={{ color: theme.colors.textMuted }}>
                {texto}
            </Text>
        </View>
    );
}

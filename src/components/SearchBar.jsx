import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { useTheme } from "styled-components/native";

export default function SearchBar({ value, onChangeText }) {
    const theme = useTheme();

    return (
        <View
            className="mx-4 mb-2 mt-4 flex-row items-center rounded-full px-4 py-2 shadow-sm shadow-marron-900/20"
            style={{ elevation: 2, backgroundColor: theme.colors.surface }}
        >
            <Ionicons
                name="search"
                size={18}
                color={theme.colors.textMuted}
                style={{ marginRight: 8 }}
            />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Buscar por nombre, categoría o dificultad..."
                placeholderTextColor={theme.colors.textMuted}
                autoCapitalize="none"
                className="flex-1"
                style={{ color: theme.colors.text }}
            />
        </View>
    );
}

import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

export default function Header() {
    const insets = useSafeAreaInsets();
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const theme = useTheme();

    return (
        <View
            className="items-center rounded-b-[36px] px-6 pb-9 shadow-lg shadow-marron-900/40"
            style={{
                elevation: 6,
                paddingTop: insets.top + 24,
                backgroundColor: theme.colors.headerBackground,
            }}
        >
            <Pressable
                onPress={toggleColorScheme}
                className="absolute right-6 h-10 w-10 items-center justify-center rounded-full"
                style={{
                    top: insets.top + 12,
                    backgroundColor: theme.colors.accentCircle,
                }}
            >
                <Ionicons
                    name={colorScheme === "dark" ? "sunny" : "moon"}
                    size={18}
                    color={theme.colors.accentIcon}
                />
            </Pressable>

            <View className="flex-row items-center">
                <View
                    className="mr-3 h-12 w-12 items-center justify-center rounded-full shadow-sm shadow-marron-900/30"
                    style={{ backgroundColor: theme.colors.accentCircle }}
                >
                    <Ionicons
                        name="restaurant"
                        size={22}
                        color={theme.colors.accentIcon}
                    />
                </View>
                <Text
                    className="text-3xl font-bold"
                    style={{ color: theme.colors.headerText }}
                >
                    Recetas
                </Text>
            </View>
            <Text
                className="mt-2 px-2 text-center text-lg"
                style={{ color: theme.colors.headerTextMuted }}
            >
                Descubrí nuevas recetas para cocinar
            </Text>
        </View>
    );
}

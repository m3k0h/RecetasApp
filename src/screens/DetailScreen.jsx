import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import Badge from "../components/Badge";
import InfoItem from "../components/InfoItem";

export default function DetailScreen() {
    const { receta: recetaParam } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const receta = recetaParam ? JSON.parse(recetaParam) : null;

    if (!receta) return null;

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: theme.colors.background }}
            bounces={false}
        >
            <View>
                <Image source={receta.imagen} className="h-72 w-full" />
                <Pressable
                    onPress={() => router.back()}
                    className="absolute left-4 h-10 w-10 items-center justify-center rounded-full shadow-md shadow-marron-900/30"
                    style={{
                        top: insets.top + 12,
                        elevation: 4,
                        backgroundColor: theme.colors.surface,
                    }}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color={theme.colors.icon}
                    />
                </Pressable>
            </View>

            <View
                className="-mt-6 rounded-t-[28px] px-5 pt-6"
                style={{ backgroundColor: theme.colors.background }}
            >
                <Text
                    className="mb-1 text-2xl font-bold"
                    style={{ color: theme.colors.text }}
                >
                    {receta.nombre}
                </Text>
                <Text
                    className="mb-4 text-sm"
                    style={{ color: theme.colors.textMuted }}
                >
                    Por {receta.autor}
                </Text>

                <View className="mb-2 flex-row">
                    <Badge texto={receta.dificultad} tipo="dificultad" />
                    <Badge texto={receta.categoria} tipo="categoria" />
                </View>
                <View className="mb-6 flex-row">
                    <InfoItem icono="⏱️" texto={`${receta.tiempoMin} min`} />
                    <InfoItem
                        icono="🍽️"
                        texto={`${receta.porciones} porciones`}
                    />
                </View>

                <Text
                    className="mb-3 text-lg font-bold"
                    style={{ color: theme.colors.text }}
                >
                    Ingredientes
                </Text>
                <View className="mb-6">
                    {receta.ingredientes.map((ing) => (
                        <View key={ing} className="mb-2 flex-row items-start">
                            <View
                                className="mr-2 mt-2 h-1.5 w-1.5 rounded-full"
                                style={{
                                    backgroundColor: theme.colors.accentDot,
                                }}
                            />
                            <Text
                                className="flex-1"
                                style={{ color: theme.colors.textBody }}
                            >
                                {ing}
                            </Text>
                        </View>
                    ))}
                </View>

                <Text
                    className="mb-3 text-lg font-bold"
                    style={{ color: theme.colors.text }}
                >
                    Preparación
                </Text>
                <Text
                    className="mb-8 leading-6"
                    style={{ color: theme.colors.textBody }}
                >
                    {receta.pasos.join("\n\n")}
                </Text>
            </View>
        </ScrollView>
    );
}

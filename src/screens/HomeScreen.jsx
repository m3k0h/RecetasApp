import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import Header from "../components/Header";
import RecetaCard from "../components/RecetaCard";
import SearchBar from "../components/SearchBar";
import { obtenerRecetasDeTheMealDB } from "../data/mealdb";

function ListaDeRecetas() {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const [busqueda, setBusqueda] = useState("");
    const [favoritoIds, setFavoritoIds] = useState([]);

    const { data: recetas = [], isLoading: cargandoApi } = useQuery({
        queryKey: ["recetas"],
        queryFn: () => obtenerRecetasDeTheMealDB(),
    });

    const toggleFavorito = (id) => {
        setFavoritoIds((prev) =>
            prev.includes(id)
                ? prev.filter((favId) => favId !== id)
                : [...prev, id],
        );
    };

    const recetasFiltradas = useMemo(() => {
        const query = busqueda.trim().toLowerCase();
        if (!query) return recetas;

        return recetas.filter(
            (receta) =>
                receta.nombre.toLowerCase().includes(query) ||
                receta.categoria.toLowerCase().includes(query) ||
                receta.dificultad.toLowerCase().includes(query),
        );
    }, [recetas, busqueda]);

    return (
        <FlatList
            className="flex-1"
            style={{ backgroundColor: theme.colors.background }}
            data={recetasFiltradas}
            keyExtractor={(receta) => receta.id}
            renderItem={({ item }) => {
                const esFavorito = favoritoIds.includes(item.id);
                return (
                    <View>
                        <Link
                            href={{
                                pathname: "/receta/[id]",
                                params: {
                                    id: item.id,
                                    receta: JSON.stringify(item),
                                },
                            }}
                            asChild
                        >
                            <Pressable>
                                <RecetaCard {...item} />
                            </Pressable>
                        </Link>
                        <Pressable
                            onPress={() => toggleFavorito(item.id)}
                            className="absolute right-8 top-4 h-9 w-9 items-center justify-center rounded-full shadow-sm shadow-marron-900/20"
                            style={{
                                backgroundColor: theme.colors.surface,
                                opacity: 0.9,
                            }}
                        >
                            <Ionicons
                                name={esFavorito ? "heart" : "heart-outline"}
                                size={18}
                                color={theme.colors.textMuted}
                            />
                        </Pressable>
                    </View>
                );
            }}
            ListHeaderComponent={
                <>
                    <Header />
                    <SearchBar value={busqueda} onChangeText={setBusqueda} />
                    <Text
                        className="mb-2 mt-2 px-4 text-xl font-bold"
                        style={{ color: theme.colors.textMuted }}
                    >
                        Recetas
                    </Text>
                </>
            }
            ListFooterComponent={
                cargandoApi ? (
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.textMuted}
                        style={{ marginVertical: 16 }}
                    />
                ) : null
            }
            ListEmptyComponent={
                cargandoApi ? null : (
                    <Text
                        className="px-4 py-8 text-center"
                        style={{ color: theme.colors.textMuted }}
                    >
                        No encontramos recetas para "{busqueda}"
                    </Text>
                )
            }
            contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        />
    );
}

export default function HomeScreen() {
    return (
        <SafeAreaProvider>
            <ListaDeRecetas />
        </SafeAreaProvider>
    );
}

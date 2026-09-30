import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ThemeProvider } from "styled-components/native";
import "../global.css";
import { darkTheme, lightTheme } from "../src/theme";

const queryClient = new QueryClient();

export default function RootLayout() {
    const { colorScheme } = useColorScheme();
    const theme = colorScheme === "dark" ? darkTheme : lightTheme;

    useEffect(() => {
        if (Platform.OS === "web") {
            document.documentElement.classList.toggle(
                "dark",
                colorScheme === "dark",
            );
        }
    }, [colorScheme]);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Stack screenOptions={{ headerShown: false }} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

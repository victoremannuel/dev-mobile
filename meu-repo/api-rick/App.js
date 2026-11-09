import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Characters from "./src/screens/Characters";
import { Character, Episodes, Location } from "./src/screens/Details";

const Stack = createNativeStackNavigator();

export default function App() {
  return <NavigationContainer><Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#176b45" }, headerTintColor: "#fff", headerBackTitle: "Voltar" }}>
    <Stack.Screen name="Characters" component={Characters} options={{ title: "Personagens" }} />
    <Stack.Screen name="Character" component={Character} options={{ title: "Personagem" }} />
    <Stack.Screen name="Location" component={Location} options={{ title: "Localização" }} />
    <Stack.Screen name="Episodes" component={Episodes} options={{ title: "Episódios" }} />
    <Stack.Screen name="RelatedCharacters" component={Characters} options={({ route }) => ({ title: route.params.title })} />
  </Stack.Navigator></NavigationContainer>;
}

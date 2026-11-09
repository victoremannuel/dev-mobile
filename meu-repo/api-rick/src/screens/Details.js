import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Button, Field, State, styles } from "../components/ui";
import { getMany, request } from "../services/api";

function useData(load, dependencies) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    load(controller.signal).then((result) => {
      if (!controller.signal.aborted) setData(result);
    }).catch((err) => {
      if (!controller.signal.aborted) setError(err.message);
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [...dependencies, attempt]);
  return { data, loading, error, retry: () => setAttempt((value) => value + 1) };
}

export function Character({ route, navigation }) {
  const { url } = route.params;
  const state = useData((signal) => request(url, signal), [url]);
  if (state.loading || state.error) return <View style={styles.screen}><State {...state} /></View>;
  const character = state.data;
  function location(label, place) {
    return place?.url ? <Pressable accessibilityRole="button" onPress={() => navigation.push("Location", { url: place.url })}><Text style={styles.link}>{label}: {place.name}</Text></Pressable> : <Field label={label} value={place?.name} />;
  }
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <Image source={{ uri: character.image }} style={styles.portrait} />
    <Text style={styles.title}>{character.name}</Text>
    <Field label="Status" value={character.status} /><Field label="Espécie" value={character.species} /><Field label="Tipo" value={character.type} /><Field label="Gênero" value={character.gender} />
    {location("Origem", character.origin)}{location("Última localização conhecida", character.location)}
    <Button title="Episódios" onPress={() => navigation.push("Episodes", { urls: character.episode, name: character.name })} />
  </ScrollView>;
}

export function Location({ route, navigation }) {
  const { url } = route.params;
  const state = useData((signal) => request(url, signal), [url]);
  if (state.loading || state.error) return <View style={styles.screen}><State {...state} /></View>;
  const location = state.data;
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <Text style={styles.title}>{location.name}</Text><Field label="Tipo" value={location.type} /><Field label="Dimensão" value={location.dimension} />
    <Button title="Residentes" onPress={() => navigation.push("RelatedCharacters", { urls: location.residents, title: "Residentes" })} />
    {!location.residents.length && <Text style={styles.text}>Esta localização não possui residentes.</Text>}
  </ScrollView>;
}

export function Episodes({ route, navigation }) {
  const { urls } = route.params;
  const state = useData((signal) => getMany("episode", urls, signal), [urls]);
  if (state.loading || state.error) return <View style={styles.screen}><State {...state} /></View>;
  return <FlatList style={styles.screen} contentContainerStyle={{ padding: 16, flexGrow: 1 }} data={state.data} keyExtractor={(item) => String(item.id)} ListEmptyComponent={<State empty="Nenhum episódio encontrado." />} renderItem={({ item }) => <View style={styles.card}><Text style={styles.title}>{item.name}</Text><Field label="Data de exibição" value={item.air_date} /><Field label="Episódio" value={item.episode} /><View style={{ marginTop: 12 }}><Button title="Personagens" onPress={() => navigation.push("RelatedCharacters", { urls: item.characters, title: `Personagens: ${item.episode}` })} /></View></View>} />;
}

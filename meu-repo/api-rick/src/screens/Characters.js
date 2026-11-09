import React, { useEffect, useRef, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { Button, CharacterCard, State, styles } from "../components/ui";
import { charactersUrl, getMany, request } from "../services/api";

export default function Characters({ navigation, route }) {
  const urls = route.params?.urls;
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [version, setVersion] = useState(0);
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [moreError, setMoreError] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const active = useRef(null);
  const more = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    active.current = controller;
    more.current = false;
    setLoadingMore(false);
    setLoading(true);
    setError("");
    setMoreError("");
    setItems([]);
    setNext(null);
    (async () => {
      try {
        const data = urls ? await getMany("character", urls, controller.signal) : await request(charactersUrl(query), controller.signal);
        if (!controller.signal.aborted) {
          setItems(urls ? data : data.results);
          setNext(urls ? null : data.info.next);
        }
      } catch (err) {
        if (!controller.signal.aborted) setError(err.status === 404 ? "Nenhum personagem encontrado." : err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [query, version, urls]);

  async function loadMore() {
    if (!next || loading || more.current) return;
    const controller = active.current;
    more.current = true;
    setLoadingMore(true);
    setMoreError("");
    try {
      const data = await request(next, controller.signal);
      if (!controller.signal.aborted) {
        setItems((current) => {
          const ids = new Set(current.map((item) => item.id));
          return [...current, ...data.results.filter((item) => !ids.has(item.id))];
        });
        setNext(data.info.next);
      }
    } catch (err) {
      if (!controller.signal.aborted) setMoreError(err.message);
    } finally {
      if (!controller.signal.aborted) { more.current = false; setLoadingMore(false); }
    }
  }
  function search() {
    const value = input.trim();
    if (value === query) setVersion((v) => v + 1); else setQuery(value);
  }
  return <View style={styles.screen}>
    {!urls && <View style={[styles.row, { padding: 16 }]}><TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Nome do personagem" accessibilityLabel="Nome do personagem" returnKeyType="search" onSubmitEditing={search} /><Button title="Buscar" onPress={search} /></View>}
    {loading || error ? <State loading={loading} error={error} retry={error && !error.includes("Nenhum personagem") ? () => setVersion((v) => v + 1) : null} /> : <FlatList data={items} keyExtractor={(item) => String(item.id)} contentContainerStyle={{ padding: 16, paddingTop: 0, flexGrow: 1 }} renderItem={({ item }) => <CharacterCard character={item} onPress={() => navigation.push("Character", { url: item.url })} />} ListEmptyComponent={<State empty="Nenhum personagem encontrado." />} onEndReached={moreError ? undefined : loadMore} onEndReachedThreshold={0.4} ListFooterComponent={loadingMore || moreError ? <State loading={loadingMore} error={moreError} retry={loadMore} /> : null} />}
  </View>;
}

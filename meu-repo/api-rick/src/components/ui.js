import React from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f3f6f4" },
  content: { padding: 16, gap: 12 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#dce6df" },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  image: { width: 84, height: 84, borderRadius: 10 },
  portrait: { width: 200, height: 200, borderRadius: 12, alignSelf: "center" },
  title: { color: "#173529", fontSize: 20, fontWeight: "700", flexShrink: 1 },
  text: { color: "#283e34", fontSize: 16, lineHeight: 24 },
  button: { backgroundColor: "#176b45", borderRadius: 8, minHeight: 48, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
  link: { color: "#176b45", textDecorationLine: "underline", fontSize: 16, paddingVertical: 8 },
  input: { flex: 1, backgroundColor: "white", borderColor: "#879b8e", borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, minHeight: 48, fontSize: 16 },
  center: { padding: 20, alignItems: "center", gap: 12 },
});

export function Button({ title, onPress }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}><Text style={styles.buttonText}>{title}</Text></Pressable>;
}
export function State({ loading, error, retry, empty }) {
  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#176b45" /><Text style={styles.text}>Carregando...</Text></View>;
  if (error) return <View style={styles.center}><Text style={styles.text}>{error}</Text>{retry && <Button title="Tentar novamente" onPress={retry} />}</View>;
  return empty ? <View style={styles.center}><Text style={styles.text}>{empty}</Text></View> : null;
}
export function CharacterCard({ character, onPress }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalhes de ${character.name}`} onPress={onPress} style={[styles.card, styles.row]}><Image source={{ uri: character.image }} style={styles.image} /><View style={{ flex: 1 }}><Text style={styles.title}>{character.name}</Text><Text style={styles.text}>Status: {character.status || "Desconhecido"}</Text><Text style={styles.text}>Espécie: {character.species || "Desconhecida"}</Text></View></Pressable>;
}
export function Field({ label, value }) {
  return <Text style={styles.text}><Text style={{ fontWeight: "700" }}>{label}: </Text>{value || "Desconhecido"}</Text>;
}

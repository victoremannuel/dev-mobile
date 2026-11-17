import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Keyboard, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_HISTORICO = "@calculadora:historico";
const operacoes = ["+", "−", "×", "÷"];

function lerNumero(valor) {
  const texto = valor.trim().replace(",", ".");
  if (!/^-?(\d+([.]\d*)?|[.]\d+)$/.test(texto)) return null;
  const numero = Number(texto);
  return Number.isFinite(numero) ? numero : null;
}

export default function App() {
  const [tela, setTela] = useState("calculadora");
  const [primeiro, setPrimeiro] = useState("");
  const [segundo, setSegundo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [disponivel, setDisponivel] = useState(true);
  const salvando = useRef(false);

  useEffect(() => {
    async function carregarHistorico() {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_HISTORICO);
        const itens = dados ? JSON.parse(dados) : [];
        if (!Array.isArray(itens)) throw new Error("Histórico inválido");
        setHistorico(itens);
      } catch {
        setDisponivel(false);
        setErro("Não foi possível carregar o histórico. Feche e abra o aplicativo novamente.");
      } finally {
        setCarregando(false);
      }
    }
    carregarHistorico();
  }, []);

  async function calcular(operacao) {
    if (salvando.current || !disponivel || carregando) return;
    const a = lerNumero(primeiro);
    const b = lerNumero(segundo);
    if (a === null || b === null) {
      setErro("Digite dois números válidos.");
      return;
    }
    if (operacao === "÷" && b === 0) {
      setErro("Não é possível dividir por zero.");
      return;
    }

    let valor;
    switch (operacao) {
      case "+": valor = a + b; break;
      case "−": valor = a - b; break;
      case "×": valor = a * b; break;
      default: valor = a / b;
    }
    if (!Number.isFinite(valor)) {
      setErro("O resultado é muito grande para ser exibido.");
      return;
    }
    const exibicao = Number(valor.toPrecision(12)).toString().replace(".", ",");
    const registro = { id: `${Date.now()}-${Math.random()}`, conta: `${primeiro.trim()} ${operacao} ${segundo.trim()}`, resultado: exibicao };
    const novoHistorico = [registro, ...historico];
    salvando.current = true;
    setErro("");
    try {
      await AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(novoHistorico));
      setHistorico(novoHistorico);
      setResultado(exibicao);
      Keyboard.dismiss();
    } catch {
      setErro("Não foi possível salvar a operação. Tente novamente.");
    } finally {
      salvando.current = false;
    }
  }

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f5f0" />
      <View style={styles.container}>
        <Text style={styles.titulo}>{tela === "calculadora" ? "Calculadora" : "Histórico"}</Text>
        <Text style={styles.subtitulo}>{tela === "calculadora" ? "Escolha uma operação para calcular" : "Suas operações mais recentes"}</Text>

        {tela === "calculadora" ? (
          <View style={styles.conteudo}>
            <Text style={styles.label}>Primeiro número</Text>
            <TextInput style={styles.input} value={primeiro} onChangeText={setPrimeiro} keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"} placeholder="Ex: 10" accessibilityLabel="Primeiro número" />
            <Text style={styles.label}>Segundo número</Text>
            <TextInput style={styles.input} value={segundo} onChangeText={setSegundo} keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"} placeholder="Ex: 5" accessibilityLabel="Segundo número" />
            <Text style={styles.label}>Operação</Text>
            <View style={styles.operacoes}>
              {operacoes.map((operacao, indice) => (
                <Pressable key={operacao} style={styles.botaoOperacao} onPress={() => calcular(operacao)} accessibilityRole="button" accessibilityLabel={["Somar", "Subtrair", "Multiplicar", "Dividir"][indice]} disabled={carregando || !disponivel}>
                  <Text style={styles.textoOperacao}>{operacao}</Text>
                </Pressable>
              ))}
            </View>
            {erro ? <Text style={styles.erro} accessibilityRole="alert">{erro}</Text> : null}
            {resultado !== null && <View style={styles.resultado}><Text style={styles.label}>Resultado</Text><Text style={styles.valor}>{resultado}</Text></View>}
          </View>
        ) : (
          <View style={styles.conteudo}>
            {carregando ? <ActivityIndicator color="#ad5c42" /> : (
              <FlatList data={historico} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                <View style={styles.item}><Text style={styles.conta}>{item.conta}</Text><Text style={styles.valorItem}>= {item.resultado}</Text></View>
              )} ListEmptyComponent={<Text style={styles.vazio}>{disponivel ? "Nenhuma operação realizada ainda." : "Não foi possível carregar o histórico."}</Text>} />
            )}
          </View>
        )}
        <Pressable style={styles.botaoNavegacao} onPress={() => { Keyboard.dismiss(); setTela(tela === "calculadora" ? "historico" : "calculadora"); }} accessibilityRole="button">
          <Text style={styles.textoNavegacao}>{tela === "calculadora" ? "Ver histórico" : "Voltar para calculadora"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: "#f8f5f0", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  container: { flex: 1, padding: 24 },
  titulo: { fontSize: 32, fontWeight: "bold", color: "#322d2b", marginTop: 16 },
  subtitulo: { fontSize: 15, color: "#81746d", marginTop: 6, marginBottom: 28 },
  conteudo: { flex: 1 },
  label: { fontSize: 14, fontWeight: "600", color: "#675b55", marginBottom: 8 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eadfd6", borderRadius: 16, padding: 14, fontSize: 18, color: "#322d2b", marginBottom: 20 },
  operacoes: { flexDirection: "row", gap: 10 },
  botaoOperacao: { flex: 1, backgroundColor: "#f2dfd5", borderRadius: 16, alignItems: "center", padding: 12 },
  textoOperacao: { color: "#ad5c42", fontWeight: "bold", fontSize: 24 },
  erro: { color: "#b42318", marginTop: 16 },
  resultado: { backgroundColor: "#fff", borderRadius: 18, padding: 18, marginTop: 24, borderLeftWidth: 4, borderLeftColor: "#ad5c42" },
  valor: { color: "#322d2b", fontSize: 28, fontWeight: "bold" },
  item: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: "#eadfd6" },
  conta: { color: "#81746d", fontSize: 16 },
  valorItem: { color: "#ad5c42", fontSize: 20, fontWeight: "bold", marginTop: 5 },
  vazio: { color: "#81746d", textAlign: "center", marginTop: 24 },
  botaoNavegacao: { backgroundColor: "#ad5c42", borderRadius: 16, padding: 16, alignItems: "center", marginTop: 16, marginBottom: 8 },
  textoNavegacao: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

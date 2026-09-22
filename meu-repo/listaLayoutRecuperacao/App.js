import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const pessoas = [1, 2, 3, 4, 5, 6, 7];

export default function App() {
  const avisar = (mensagem) => Alert.alert('Ação', mensagem);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.phoneArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Aplicativo</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Informações"
            style={styles.infoButton}
            onPress={() => avisar('Botão de informações pressionado.')}
          >
            <Text style={styles.infoText}>i</Text>
          </Pressable>
        </View>

        <View style={styles.separator} />

        <View style={styles.buttonRow}>
          {[1, 2, 3].map((numero) => (
            <Pressable
              key={numero}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
              ]}
              onPress={() => avisar(`Botão ${numero} pressionado.`)}
            >
              <Text style={styles.actionButtonText}>Botão {numero}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.separator} />

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator
        >
          {pessoas.map((item) => (
            <Pressable
              key={item}
              style={({ pressed }) => [styles.personRow, pressed && styles.personRowPressed]}
              onPress={() => avisar(`Pessoa ${item} selecionada.`)}
            >
              <Image
                source={require('./assets/avatar.png')}
                style={styles.avatar}
                resizeMode="cover"
              />

              <View style={styles.personTextArea}>
                <Text style={styles.personName}>Nome da pessoa</Text>
                <Text style={styles.secondaryText}>Texto secundário...</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneArea: {
    width: '92%',
    maxWidth: 430,
    height: '88%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c7c7c7',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#111111',
  },
  infoButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#9aa0a6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef5ff',
  },
  infoText: {
    color: '#1683d8',
    fontSize: 21,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  separator: {
    height: 1,
    backgroundColor: '#555555',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minHeight: 40,
    backgroundColor: '#cfe3ff',
    borderWidth: 1,
    borderColor: '#6d7e91',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  actionButtonPressed: {
    opacity: 0.7,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c1c1c',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 8,
  },
  personRow: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    paddingVertical: 8,
  },
  personRowPressed: {
    backgroundColor: '#f2f7ff',
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 10,
    backgroundColor: '#444444',
  },
  personTextArea: {
    flex: 1,
  },
  personName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 2,
  },
  secondaryText: {
    fontSize: 13,
    color: '#333333',
  },
});

import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ManualCalculatorScreen from './src/screens/ManualCalculatorScreen';
import ButtonCalculatorScreen from './src/screens/ButtonCalculatorScreen';
import { COLORS } from './src/theme';

export default function App() {
  // Navegação simples via useState, sem necessidade de biblioteca de rotas.
  const [selectedVersion, setSelectedVersion] = useState('home');

  let screen = <HomeScreen onSelectVersion={setSelectedVersion} />;
  if (selectedVersion === 'manual') {
    screen = <ManualCalculatorScreen onBack={() => setSelectedVersion('home')} />;
  } else if (selectedVersion === 'buttons') {
    screen = <ButtonCalculatorScreen onBack={() => setSelectedVersion('home')} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.background}>{screen}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  background: { flex: 1 },
});

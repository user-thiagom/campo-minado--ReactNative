import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Field from './src/components/Field';
import params from './src/params';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Iniciando o Mines!</Text>
      <Text>Tamanho da Grade: {params.getRowsAmount()}x{params.getColumsAmount()}</Text>
      <Field/>
      <Field opened/>
      <Field opened nearMines={1}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

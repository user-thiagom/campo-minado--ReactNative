import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Field from './src/components/Field';
import params from './src/params';
import { createMineBoard } from './src/functions';
import { useState } from 'react';
import MineField from './src/components/MineField';

export default function App() {
  const [state,setState] = useState(createState())

  minesAmount = () => {
    const cols = params.getColumsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMineBoard(rows, cols, this.minesAmount())
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Iniciando o Mines!</Text>
      <Text>Tamanho da Grade: {params.getRowsAmount()}x{params.getColumsAmount()}</Text>
      <View style={styles.board}>
        <MineField board={state.board}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems:'center',
    backgroundColor:'#aaa'
  }
});

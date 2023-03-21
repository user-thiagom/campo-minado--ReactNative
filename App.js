import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Field from './src/components/Field';
import params from './src/params';
import { cloneBoard, createMineBoard, hadExplosion, openField, showMines, wonGame } from './src/functions';
import { useState } from 'react';
import MineField from './src/components/MineField';

export default function App() {

  minesAmount = () => {
    const cols = params.getColumsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMineBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false
    }
  }

  onOpenField = (row,column)=>{
    const board = cloneBoard(state.board)
    openField(board,row,column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if(lost){
      showMines(board)
      Alert.alert('Perdeuuuu!', 'Que buuuuurro!')
    }

    if(won){
      Alert.alert('Parabéns!', 'Você Venceu!')
    }

    setState({board, lost, won})
  }

  const [state,setState] = useState(createState())

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Iniciando o Mines!</Text>
      <Text>Tamanho da Grade: {params.getRowsAmount()}x{params.getColumsAmount()}</Text>
      <View style={styles.board}>
        <MineField board={state.board} onOpenField={onOpenField}/>
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

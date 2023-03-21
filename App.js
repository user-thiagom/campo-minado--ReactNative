import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Field from './src/components/Field';
import params from './src/params';
import { cloneBoard, createMineBoard, flagsUsed, hadExplosion, invertFlag, openField, showMines, wonGame } from './src/functions';
import { useState } from 'react';
import MineField from './src/components/MineField';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';

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
      lost: false,
      showLevelSelection:false
    }
  }

  const [state,setState] = useState(createState())

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

    setState(state=>({
      ...state,
      board,
      won,
      lost
    }))
  }

  onSelectField = (row,column)=>{
    const board = cloneBoard(state.board)
    invertFlag(board,row,column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns!', 'Você venceu!!!')
    }

    setState(state=>({
      ...state,
      board,
      won
    }))
  }

  onLevelSelected = level =>{
    params.difficultLevel = level
    setState(createState())
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <LevelSelection isVisible={state.showLevelSelection} onLevelSelected={onLevelSelected} onCancel={()=>setState(state=>({...state,showLevelSelection:false}))}/>
      <Header flagsLeft={minesAmount() - flagsUsed(state.board)} onNewGame={()=>setState(createState())} onFlagPress={()=>setState(state=>({...state,showLevelSelection:true}))}/>
      <View style={styles.board}>
        <MineField board={state.board} onOpenField={onOpenField} onSelectField={onSelectField}/>
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

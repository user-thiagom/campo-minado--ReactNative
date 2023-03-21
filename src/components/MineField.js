import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Field from './Field'

const MineField = ({board, onOpenField, onSelectField}) => {
    const rows = board.map((row,r)=>{
        const columns = row.map((field,c)=>{
            return <Field {...field} key={c}
                onOpen={()=>onOpenField(r,c)}
                onSelect={()=>onSelectField(r,c)}/>
        })
        return <View style={{flexDirection:'row'}} key={r}>{columns}</View>
    })

    return (
        <View style={styles.container}>
            {rows}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        //flexDirection:'row',
        backgroundColor:'#eee'
    }
})

export default MineField
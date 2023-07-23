import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {FontAwesome} from '@expo/vector-icons'

export default function Tarefa({data, deleteItem}) {
    //vai receber a propriedade data que foi passada no renderItem
    //e depois o valor passado por parametro
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={deleteItem}> 
               {/* vai chamar o delete item */}
                <FontAwesome name="trash" size={20} color={'#22272e'}/>
            </TouchableOpacity>
            <Text style={styles.textTarefas}>{data.item}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'rgba(196,196,196,.2)',
        marginTop: 12,
        padding: 12,
        borderRadius: 4, 
        flexDirection: 'row',   
    }, 
    button: {
        marginRight: 10
    },
    textTarefas: {
        fontSize: 18
    }
});
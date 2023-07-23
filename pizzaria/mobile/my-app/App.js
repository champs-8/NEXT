import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList} from "react-native"
// view é como se fosse a div, um espaço em branco
//o text é para poder escrever texto
import React, {useState} from "react"
import {FontAwesome} from '@expo/vector-icons' //icones para ilustrações
import Tarefa from './src/Tarefa'

export default function app(){

  const [tarefa, setTarefa] = useState('');

  const [list, setList] = useState([]);

  function handleAdd() {
    if(tarefa === ''){
      return;
    }

    const dados = {
      key: Date.now(), // data de hoje
      item: tarefa
    }

    setList(oldArr => [dados, ...oldArr]); // pega os dados que ja tinha no array
    //e adiciona com os novos dados

    setTarefa('');//zerar o valor do input
  }

  function handleDelete(item) {
    let filtro = list.filter((tarefa) => {
      return (tarefa.item !== item) //vai devolver todas aquelas que nao serão apagadas
    });

    setList(filtro);
  }
 
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput  
          placeholder="Digite sua tarefa..." 
          style={styles.input}
          value={tarefa}
          onChangeText={(text)=> setTarefa(text)} //toda vez que digitar algo no input
          //aciona um evento e repassa o nome para a useState
        />
        <TouchableOpacity style={styles.buttonPlus} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color='#FFF'/>
        </TouchableOpacity>
      </View>

      {/* FlatList serve para poder ter lista dinamicas e interativas */}
      <FlatList
        data={list} //onde vai receber os dados
        keyExtractor={(item) => item.key }
        renderItem={({item}) => <Tarefa data={item} deleteItem={() => handleDelete(item.item)}/> } 
        //vai renderizar esse componente   
        // a propriedade item no data, vai servir para receber as informações da lista
        style={styles.list}
      />
    </View>
  );
}

// criar componentes de estilos
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#22272e',
    paddingTop: 28,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
    marginTop: '%5',
    paddingStart: '%5',
    marginBottom: 12,
    textAlign: 'center'
  },
  containerInput: {
    flexDirection: "row",
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22
  },
  input: {
    width:'75%',
    backgroundColor:'#FBFBFB',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 10
  },
  buttonPlus: {
    width:'15%',
    height: 44,
    backgroundColor:'#73f7ff',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  list: {
    flex: 1,
    backgroundColor:'#fff',
    paddingStart: '4%',
    paddingEnd: '4%',
  }
});
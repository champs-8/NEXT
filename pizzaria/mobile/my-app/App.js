import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
// view é como se fosse a div, um espaço em branco
//o text é para poder escrever texto
import React, {useState} from "react"

export default function app(){

  const [nome, setNome] = useState('Irineu')

  function handleMudarNome() {
    if(nome === 'Irineu'){
      setNome('ChamPizza')
    }else{
      setNome('Irineu')
    }
  }
  
  return(
    <View style={styles.container}>
      {/* ja vem com o flexbox ativado 
      flex 1 faz ocupar a tela toda*/}

      <Text style={styles.title}>{nome}</Text>

      {/* onPress é como se fosse o ONCLICK do JS */}
      <TouchableOpacity style={styles.button} onPress={handleMudarNome}>
        <Text style={styles.buttonText}>Mudar nome</Text>
      </TouchableOpacity>
    </View>
  );
}

// criar componentes de estilos
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#505055',
    paddingTop: 28,
  },
  title: {
    fontSize:32,
    color: '#121212',
    fontWeight:"bold",
    textAlign:'center',
  },
  text: {
    color: 'red'
  },
  button: {
    backgroundColor:'blue', 
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 35,
  }, 
  buttonText: {
    color:'#FFF',
    fontWeight: 'bold'
  }
});
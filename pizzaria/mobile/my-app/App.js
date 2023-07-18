import { View, Text} from "react-native"
// view é como se fosse a div, um espaço em branco
//o text é para poder escrever texto
import React from "react"

export default function app(){
  return(
    <View style={{flex:1, backgroundColor:'#505050', paddingTop: 25}}>
      {/* ja vem com o flexbox ativado 
      flex 1 faz ocupar a tela toda*/}

      <Text style={{fontSize: 28}}>ChamPizza</Text>
      <Text>Seja bem-vindo</Text>
    </View>
  );
}
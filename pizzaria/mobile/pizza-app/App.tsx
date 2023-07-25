
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import SingIn from './src/pages/signIn/index'

export default function App() {
  return (
    <View>
      <Text>ChamPizza</Text>
      <StatusBar backgroundColor={'#1d1d2e'} barStyle={'light-content'} translucent={false}/>
      {/* translucent -> os itens da tela podem passar por baixo da statusBar? */}
      <SingIn/>
    </View>
  );
}
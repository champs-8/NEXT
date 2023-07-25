
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import Routes from './src/routes';

// o NavigationContainer vai ficar por fora de toda nossa aplicação.
// chama o componente que vai controlar as rotas dentro do Navigation


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#1d1d2e'} barStyle={'light-content'} translucent={false}/>
      <Routes/>
    </NavigationContainer>
  );
}
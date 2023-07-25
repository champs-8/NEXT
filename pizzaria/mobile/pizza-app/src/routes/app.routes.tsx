//
// SO USUARIOS LOGADOS PODEM ACESSAR
//
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Dashboard from "../pages/Dashboard";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="dashboard" component={Dashboard}/>
        </Stack.Navigator>
    );
}
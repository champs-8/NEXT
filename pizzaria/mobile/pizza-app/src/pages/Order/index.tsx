import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {useRoute, RouteProp} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'

type RouteDetailParams = {
    Order: {
        table: number|string;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;



export default function Order() {

    const route = useRoute<OrderRouteProps>();
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.table}</Text>
                <TouchableOpacity>
                    <Feather name='trash-2' size={28} color={'#ff3f4b'}/>
                </TouchableOpacity>
            </View>



            <TouchableOpacity style={styles.input}>
                <Text style={{color: '#fff'}}>Pizzas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.input}>
                <Text style={{color: '#fff'}}>Calabresa</Text>
            </TouchableOpacity>


            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput 
                    placeholder='1' 
                    placeholderTextColor={'#f0f0f0'} 
                    keyboardType='numeric' 
                    style={[styles.input, {width: '60%', textAlign: 'center'}]} 
                    value='1'
                    
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical:'5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 16 
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#Fff',
        fontSize: 18
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fFF'
    },
    qtdInput: {

    }
});
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { ProdAddProps } from '../../pages/Order';
import { Feather } from '@expo/vector-icons'


interface ItemProps {
    data: {
        id: string,
        product_id: string,
        name: string,
        amount: number | string
    }
}

export function ListProducts({data}: ItemProps) {
    return(
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>
            <TouchableOpacity>
                <Feather name='trash-2' color={'#ff3d4b'} size={25}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor:'#101026',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal:12,
        borderRadius: 4,
        borderWidth: .3,
        borderColor: '#8a8a8a'
    },
    item: {
        color: '#fff'
    }
});
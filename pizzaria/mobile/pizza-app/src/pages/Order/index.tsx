import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {useRoute, RouteProp} from '@react-navigation/native'

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
            <Text>Tela order</Text>

            {/* sera necessario informar que ha algumas tipagens nesse componente,
            para poder navegar nele */}
            <Text>{route.params.table}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    }
});
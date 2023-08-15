import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal} from 'react-native'
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import {Feather} from '@expo/vector-icons'
import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker';

type RouteDetailParams = {
    Order: {
        table: number|string;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export type CategoryProps = {
    id: string,
    name: string
}



export default function Order() {

    //armazenar categorias encontradas
    //nessa tipagem, pode receber objetos de um array, ou se nao tiver nada, um array vazio
    const [category, setCategory] = useState<CategoryProps[]|[]>([]);
    const [catSelected, setCatSelected] = useState<CategoryProps>(); 

    //quantidade que vai querer de cada produto
    const [amount, setAmount] = useState('1');


    //controlar quando o modal vai estar aberto ou fechado
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    //buscar categorias
    useEffect(() => {
        async function loadInfo() {

            const response = await api.get('/categories');

            setCategory(response.data);
            setCatSelected(response.data[0]);

        }
        loadInfo();
    }, [])

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function deleteOrder() {
        try{
             await api.delete('/orders', {
                params: {
                    //o ? é se nao vier dados no params
                    id_order: route.params?.order_id
                }
             })

            //  navigation.navigate('Dashboard');
             navigation.goBack();
            
        }catch(err){
            console.log(err);
        }

    }

    const route = useRoute<OrderRouteProps>();

    function handleChangeCategory(item: CategoryProps) {
        setCatSelected(item)
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.table}</Text>
                <TouchableOpacity onPress={deleteOrder}>
                    <Feather name='trash-2' size={28} color={'#ff3f4b'}/>
                </TouchableOpacity>
            </View>

            {/* se caso nao ter respondido nenhuma categoria */}
            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{color: '#fff'}}>{catSelected?.name}</Text>
                </TouchableOpacity>
            )}
            
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
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonNext}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <Modal 
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker
                    //precisa passar todas as categorias pra ele, o metodo para fechar ele
                    // e qual que esta selecionado

                    handleCloseModal = {() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem = { handleChangeCategory }
                />
            </Modal>

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
        color: '#fff',
        paddingBottom:15,
        paddingHorizontal:10
        
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonAdd: {
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        width: '20%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText : {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonNext: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
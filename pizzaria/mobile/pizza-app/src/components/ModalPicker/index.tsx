import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps {
    options : CategoryProps[];
    handleCloseModal: () => void;
    selectItem: () => void;
}

//pegar dimensoes do usuario
//renomeou as variaveis
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export function ModalPicker({handleCloseModal, options, selectItem}: ModalPickerProps) {

    //é uma categoria selecionada
    function onPressItem(item: CategoryProps) {
        console.log(item);
    }
    
    
    // vai fazer a verificação da listagem e colocar no modal
    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}> 
                {item?.name}
            </Text>
        </TouchableOpacity>
    ));
    
    return(
        <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
            <View style={styles.content}>

                {/* para nao ter a barrinha lateral */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: WIDTH,
        height: HEIGHT/2,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#8a8a8a'
    },
    option : {

    },
    item: {
        
    }
});
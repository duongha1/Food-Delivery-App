import React from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    VirtualizedList,
    Touchable
} from 'react-native';

import {icons, images, SIZES, COLORS, FONTS} from '../constants'

const Home = () =>{
    function renderHeader(){
        return(
            <View style={{flexDirection: 'row', height: 50}}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding*2
                    }}
                >

                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <View>
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    }
})

export default Home;
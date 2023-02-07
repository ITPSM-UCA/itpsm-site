import React from "react";
import {View, StyleSheet} from 'react-native'



const LoaderOverlay=()=>{
    return(
        <View style ={ [StyleSheet.absoluteFillObject, styles.container]}>
            {/* <LottieView source={require('../../assets/icons/Loader/loader.json')} autoPlay loop/> */}
            <h1>Cargando</h1>
        </View>
    )

}

const styles= StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        zIndex:1
    }
})

export default LoaderOverlay
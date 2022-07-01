import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import {ColorUtil} from '../utils/ColourUtils'
const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("HomeScreen");
          }, 3000);
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
 
        <ActivityIndicator color={ColorUtil.black} />
        <Text style={{ fontFamily: "Nunito-ExtraBold", }}>Loading...</Text>
      </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})

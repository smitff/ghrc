import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStackNavigatior from './HomeNavigation';
import { ColorUtil } from '../utils/ColourUtils';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();
const DrawerNav = () => {
    return (
        <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
            // gestureEnabled:false
        }}
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{flex: 1}}
        drawerContent={props => {
                return (
                
                    <DrawerContent {...props}/>
                    );
            
           
        }}
    >
        <Drawer.Screen name='Home' component={HomeStackNavigatior} />
        
    </Drawer.Navigator>
 
    )
}
const ScreenApp = ()=>{
    return(
        <View>
        <Text>hello</Text>
    </View>
    );
}

export default DrawerNav

const styles = StyleSheet.create({
    drawerStyles: {flex: 1, width: '70%', backgroundColor: ColorUtil.white},
})


import { createStackNavigator } from "@react-navigation/stack";

import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
import DoctorsDetailScreen from '../screens/DoctorsDetailScreen';
import DoctorsFullScreen from "../screens/DoctorsFullScreen";
import DonateScreen from "../screens/DonateScreen";
import HealthTips from "../screens/HealthTips";
import HealthTipsDetailScreen from '../screens/HealthTipsDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from "../screens/InfoScreen";
import NewsDetailScreen from '../screens/NewsDetailScreen';
import NewsScreen from "../screens/NewsScreen";
import QueryScreen from "../screens/QueryScreen";
import SplashScreen from "../screens/SplashScreen";
import TrustiesDetailScreen from "../screens/TrustiesDetailScreen";
import TrustiesScreen from "../screens/TrustiesScreen";
import VirtualTourScreen from "../screens/VirtualTourScreen";
import HomeNews from "../screens/HomeNews";
import HomeDoctors from "../screens/HomeDoctors";
import HomeHealthTips from "../screens/HomeHealthTips";

const UserStack = createStackNavigator ();

export default function HomeStackNavigatior(){


    return(
        <View style={styles.stack}>
        <UserStack.Navigator
         initialRouteName={"SplashScreen"}
            screenOptions={{
                headerShown: false,
                
            }}
        >
            <UserStack.Screen name="SplashScreen" component={SplashScreen}/>
            <UserStack.Screen name="HomeScreen" component={HomeScreen}/>
            <UserStack.Screen name="DoctorsDetailScreen" component={DoctorsDetailScreen}/> 
            <UserStack.Screen name="NewsDetailScreen" component={NewsDetailScreen}/>
            <UserStack.Screen name="HealthTipsDetailScreen" component={HealthTipsDetailScreen}/>
            <UserStack.Screen name="VirtualTourScreen" component={VirtualTourScreen}/>
            <UserStack.Screen name="DonateScreen" component={DonateScreen}/>
            <UserStack.Screen name="HealthTips" component={HealthTips}/>
            <UserStack.Screen name="NewsScreen" component={NewsScreen}/>
            <UserStack.Screen name="InfoScreen" component={InfoScreen}/>
            <UserStack.Screen name="DoctorsFullScreen" component={DoctorsFullScreen}/>
            <UserStack.Screen name="TrustiesScreen" component={TrustiesScreen}/>
            <UserStack.Screen name="TrustiesDetailScreen" component={TrustiesDetailScreen}/>
            <UserStack.Screen name="QueryScreen" component={QueryScreen}/>

            <UserStack.Screen name="HomeHealthTips" component={HomeHealthTips}/>
            <UserStack.Screen name="HomeDoctors" component={HomeDoctors}/>
            <UserStack.Screen name="HomeNews" component={HomeNews}/>

           
            
        </UserStack.Navigator>
    </View>

    )
}
const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },
})
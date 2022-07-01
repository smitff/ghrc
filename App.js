
import React,{useEffect,useState} from 'react';
import {  SafeAreaView, View,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigatior from './src/navigation/HomeNavigation';
import DrawerNav from './src/navigation/DrawerNav';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import NavigationService from './src/navigation/NavigationService';
import { ApiUtils } from './src/utils/ApiUtils';
import axios from 'axios';
// import PushNotification from 'react-native-push-notification';
import {requestUserPermission,notificationListener} from './src/utils/notificationService';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
const App= () => {


// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("TOKEN:", token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//   //   notification.finish(PushNotificationIOS.FetchResult.NoData);



//   },


//   // Should the initial notification be popped automatically
//   // default: true
//   // popInitialNotification: true,
//   senderId: "1058859937223",

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */       
//   requestPermissions: true,
// });


useEffect(() => {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    PushNotification.localNotification({
      message: remoteMessage.data.message,
      title: remoteMessage.data.title,
      // bigPictureUrl: remoteMessage.notification.android.imageUrl,
      // smallIcon: remoteMessage.notification.android.imageUrl,
    });
  });
  return unsubscribe;
}, []);



  
  useEffect(() => {

    requestUserPermission()
    notificationListener()

    dynamicLinks().getInitialLink().then((link) => {
      handleDynamicLink(link)
    })
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    }
  }, [])

  const handleDynamicLink = (link) => {
    console.log("link url++++", link)
    if (!!link?.url) {
     
      if(link.url.toString().includes("doctors")){
        // console.
        let getId = link.url?.split('=').pop()
        console.log("user id", getId)
        setTimeout(() => {
          NavigationService.navigate('DoctorsDetailScreen', { id: getId })
        }, 3000);
      }
      else if(link.url.toString().includes("healthtipsall")){
        let getId = link.url?.split('=').pop()
        console.log("user id", getId)
        setTimeout(() => {
          NavigationService.navigate('HealthTipsDetailScreen', { id: getId })
        }, 3000);

      }

      else{

        let getId = link.url?.split('=').pop()
        console.log("user id", getId)
        setTimeout(() => {
          NavigationService.navigate('NewsDetailScreen', { id: getId })
        }, 3000);

      }





    }
  }



 
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1}}>

      <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
     <DrawerNav />
      </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};



export default App;

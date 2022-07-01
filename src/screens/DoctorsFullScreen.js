import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, Pressable,Dimensions } from 'react-native'
import { ColorUtil } from '../utils/ColourUtils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ResponsiveUtil } from '../utils/ResponsiveUtils'
import axios from 'axios'
import { ApiUtils, ImageService } from '../utils/ApiUtils'

const DoctorsFullScreen = ({navigation}) => {
     const [doctorsdata, setdoctorsdata] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        getdata()

    }, [])
    const getdata = async () => {
        setloading(true)
        await axios.get(ApiUtils.Doctorsfull).then(data => {
            const maindata = data.data;
            console.log(maindata)
            setloading(false)
            setdoctorsdata(maindata.data)

        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <View>
            <View style={{
                    position: 'absolute',
                    top: 10,
                    left: 0,
                    zIndex: 1,
                    flexDirection:"row",
                    alignItems:"center"
                    // backgroundColor:ColorUtil.Gray
                }}>
                    <AntDesign
                        onPress={() => {
                            navigation.goBack()
                        }} name="left" color={ColorUtil.Purple} size={25} />
                           <Text style={[styles.cardttiletext, { 
                               fontSize:ResponsiveUtil.font(20) ,
                               marginLeft:ResponsiveUtil.width(20)
                        }]} numberOfLines={1}>All Doctors</Text>
                              
                </View>
                {
                  loading ? <ActivityIndicator style={{marginTop:ResponsiveUtil.height(30)}} color={ColorUtil.Purple} size={25}  />
              :   
              <FlatList
              style={{ 
                  marginTop: ResponsiveUtil.width(60),
                  paddingHorizontal:ResponsiveUtil.width(10)
             }}
             showsVerticalScrollIndicator={false}
             data={doctorsdata}
             showsHorizontalScrollIndicator={false}
             keyExtractor={(item, index) => index}
             ItemSeparatorComponent={() => (
                 <View style={{ width: 10 }} />
             )}
             renderItem={({ item, index }) => {
                 return (
                     <Pressable
                         onPress={() => {
                             navigation.navigate("DoctorsDetailScreen", { id: index })
                         }}
                         style={{
                             // width: (Dimensions.get('screen').width) / 2.5,
                             backgroundColor: ColorUtil.white,
                             borderRadius: 10,
                             overflow: "hidden",
                             elevation: 5,
                             margin: ResponsiveUtil.width(5),
                             marginBottom: ResponsiveUtil.height(10),
                             flexDirection: 'row',
                             // paddingVertical:ResponsiveUtil.height(5),
                             alignItems: "center"

                         }}
                         key={index}>
                         <View style={{

                             backgroundColor: ColorUtil.Purple,
                             position: "absolute",
                             right: 0,
                             height: "100%",
                             alignItems: "center",
                             justifyContent: 'center'

                         }}>
                             <AntDesign name="right" size={25} color={ColorUtil.white} />
                         </View>
                         <Image style={{
                             height: ResponsiveUtil.height(100),
                             width: ResponsiveUtil.width(100),
                             borderRadius: 10,
                             alignSelf: "center",
                             marginLeft: ResponsiveUtil.width(10),
                             marginVertical: ResponsiveUtil.height(10)
                         }}
                             source={{
                                 uri: `${ImageService.doctor}${item.Image}`
                             }} />
                         <View style={{
                             paddingHorizontal: ResponsiveUtil.width(5),
                             marginLeft: ResponsiveUtil.width(10),
                             paddingBottom: ResponsiveUtil.height(5),
                             justifyContent: "flex-start"
                         }}>

                             <Text style={[styles.cardttiletext, { marginTop: ResponsiveUtil.height(0), fontSize: ResponsiveUtil.font(16), }]} numberOfLines={1}>{item.Name}</Text>
                             <Text style={[styles.carddestext, { marginTop: ResponsiveUtil.height(5) }]} numberOfLines={1}>{item.Designation}</Text>
                             <Text style={[styles.carddestext, { marginTop: ResponsiveUtil.height(0) }]} numberOfLines={1}>{item.MobileNo}</Text>



                         </View>


                     </Pressable>
                 )
             }}

         />
              }
        </View>
    )
}

export default DoctorsFullScreen

const styles = StyleSheet.create({
    cardttiletext: {
        fontFamily: "Nunito-ExtraBold",
        fontSize: ResponsiveUtil.font(14),
        color: '#555'
    },
    carddestext: {
        fontFamily: "Nunito-Regular",
        fontSize: ResponsiveUtil.font(12),
        color: '#555'
    }
})

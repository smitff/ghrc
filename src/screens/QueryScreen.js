import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, Linking, Pressable, Dimensions, ScrollView } from 'react-native'
import { ColorUtil } from '../utils/ColourUtils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ResponsiveUtil } from '../utils/ResponsiveUtils'
import axios from 'axios'
import { ApiUtils, ImageService } from '../utils/ApiUtils'
import ServicesText from '../components/ServicesText'

const QueryScreen = () => {
    const [info, setinfo] = useState(null)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        getdata()
    }, [])
    const getdata = async () => {
        setloading(true)
        await axios.get(ApiUtils.Query).then(data => {
            const maindata = data.data;
            console.log(maindata)
            setinfo(maindata)
            setloading(false)

        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: ResponsiveUtil.width(10),
                paddingVertical: ResponsiveUtil.height(10),
                flexDirection: "row",
                alignItems: "center"
            }}>
                <AntDesign
                    onPress={() => {
                        navigation.goBack()
                    }} name="left" color={ColorUtil.Purple} size={25} />
                <Text style={{
                    fontSize: ResponsiveUtil.font(20),
                    marginLeft: ResponsiveUtil.width(20),
                    fontFamily: "Nunito-Bold",
                }} numberOfLines={1}>Patient Query</Text>
            </View>
            {
                loading ? <ActivityIndicator color={ColorUtil.Purple} size={25} /> :

                    <ScrollView style={{ flex: 1 }}>
                   
                        <View style={{
                            marginTop: ResponsiveUtil.height(10),
                            paddingHorizontal: ResponsiveUtil.width(5)
                        }}>
                   
                   
                        

                            <View style={{
                                borderColor:ColorUtil.Purple,
                                // borderWidth:1,
                                padding:5,
                                borderRadius:10
                            }}>
                            <ServicesText style={{
                               
                                 fontSize: ResponsiveUtil.font(35),
                                 textAlign:"center",
                                 marginBottom:20
                            }}  text={info.text[0].QueryText}  />
                            {
                                info.data.map((data,index)=>(
                                    <View style={{
                                        borderBottomColor:ColorUtil.Purple,
                                        borderBottomWidth:0.5,
                                        paddingBottom:5,
                                       
                                    }} key={index}>
                                     <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                                marginTop:10,
                                display:"flex",
                                justifyContent:"flex-start"
                            }}>
                                <Entypo style={{
                                    marginRight:10
                                }} name="user" size={16} color={ColorUtil.Purple}  />
                            <ServicesText style={{
                                 fontSize: ResponsiveUtil.font(18),
                                 marginTop:0
                            }}  text={data.QueryName}  />
                            </View>
                             <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                                display:"flex",
                                justifyContent:"flex-start"
                            }}>
                                <Ionicons style={{
                                    marginRight:10,
                                    // transform:[{rotate: '180 deg'}]
                                }} name="call" size={14} color={ColorUtil.Purple}  />
                            <ServicesText style={{
                              
                                 fontSize: ResponsiveUtil.font(18),
                                 marginTop:-1
                            }}  text={data.QueryMobile}  />
                            </View> 
                            </View>
                                ))
                            }
                             {/* <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                                marginTop:10,
                                display:"flex",
                                justifyContent:"flex-start"
                            }}>
                                <Entypo style={{
                                    marginRight:10
                                }} name="user" size={22} color={ColorUtil.Purple}  />
                            <ServicesText style={{
                                 fontSize: ResponsiveUtil.font(18)
                            }}  text={info.QueryName}  />
                            </View> */}
                            {/* <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                                display:"flex",
                                justifyContent:"flex-start"
                            }}>
                                <Ionicons style={{
                                    marginRight:10,
                                    // transform:[{rotate: '180 deg'}]
                                }} name="call" size={20} color={ColorUtil.Purple}  />
                            <ServicesText style={{
                              
                                 fontSize: ResponsiveUtil.font(18),
                                 marginTop:-1
                            }}  text={info.QueryMobile}  />
                            </View> */}
                            </View>

                           


                        </View>
                    </ScrollView>

            }
        </View>
    )
}

export default QueryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorUtil.Gray
    },
    titletext: {
        fontFamily: "Nunito-Bold",
        fontSize: ResponsiveUtil.font(14),
        color: '#555',
        maxWidth: Dimensions.get('screen').width - 100
    },
    datetext: {
        fontFamily: "Nunito-Regular",
        fontSize: ResponsiveUtil.font(12),
        color: '#555'
    },
})

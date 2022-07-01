import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, Linking, Pressable, Dimensions, ScrollView } from 'react-native'
import { ColorUtil } from '../utils/ColourUtils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ResponsiveUtil } from '../utils/ResponsiveUtils'
import axios from 'axios'
import { ApiUtils, ImageService } from '../utils/ApiUtils'
import ServicesText from '../components/ServicesText'
const InfoScreen = ({ navigation }) => {
    const [info, setinfo] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        getdata()

    }, [])
    const html =`<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_HsYrMTZUoJPyKg" async></script></form>`
    const getdata = async () => {
        setloading(true)
        await axios.get(ApiUtils.Aboutus).then(data => {
            const maindata = data.data;
            console.log(maindata)
            setloading(false)
            setinfo(maindata.data[0])

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
                }} numberOfLines={1}>About us</Text>
            </View>
            {
                loading ? <ActivityIndicator color={ColorUtil.Purple} size={25} /> :

                    <ScrollView style={{ flex: 1 }}>
                        <Image
                        resizeMode="stretch"
                            source={{
                                uri: `${ImageService.Hospital}${info.Image}`
                            }}
                            style={{
                                width: '100%',
                                height: ResponsiveUtil.height(250),
                                backgroundColor: ColorUtil.Purple
                            }}
                        />
                        <View style={{
                            marginTop: ResponsiveUtil.height(10),
                            paddingHorizontal: ResponsiveUtil.width(5)
                        }}>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <Text style={{
                                    fontFamily: "Nunito-Bold",
                                    fontSize: ResponsiveUtil.font(16)
                                }}>Name: </Text>
                                <Text numberOfLines={1} style={{
                                    fontFamily: "Nunito-Regular",
                                    fontSize: ResponsiveUtil.font(16)
                                }}>{info.HospitalName}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <Text style={{
                                    fontFamily: "Nunito-Bold",
                                    fontSize: ResponsiveUtil.font(16)
                                }}>MobileNo: </Text>
                                <Text numberOfLines={1} style={{
                                    fontFamily: "Nunito-Regular",
                                    fontSize: ResponsiveUtil.font(16)
                                }}>{info.MobileNo}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <Text style={{
                                    fontFamily: "Nunito-Bold",
                                    fontSize: ResponsiveUtil.font(16)
                                }}>Address: </Text>
                                <Text numberOfLines={1} style={{
                                    fontFamily: "Nunito-Regular",
                                    fontSize: ResponsiveUtil.font(16)
                                }}>{info.Address}</Text>
                            </View>
                            <Text style={{
                                marginTop: ResponsiveUtil.height(10),
                                fontFamily: "Nunito-Bold",
                                fontSize: ResponsiveUtil.font(16)
                            }}>Services</Text>
                            <ServicesText text={info.Service1}  />
                            <ServicesText text={info.Service2}  />
                            <ServicesText text={info.Service3}  />
                            <ServicesText text={info.Service4}  />
                            <ServicesText text={info.Service5}  />
                            <ServicesText text={info.Service6}  />
                           


                        </View>
                    </ScrollView>

            }
        </View>
    )
}

export default InfoScreen

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
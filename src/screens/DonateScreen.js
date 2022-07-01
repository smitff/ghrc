import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { ColorUtil } from '../utils/ColourUtils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ResponsiveUtil } from '../utils/ResponsiveUtils'
import axios from 'axios'
import { ApiUtils, ImageService } from '../utils/ApiUtils'

const DonateScreen = ({ navigation }) => {
    const [donatedata, setdonatedata] = useState(null)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        getdata()

    }, [])
    const getdata = async () => {
        setloading(true)
        await axios.get(ApiUtils.Donate).then(data => {
            const maindata = data.data;
            console.log(maindata)
            setloading(false)
            setdonatedata(maindata.data[0])

        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <View style={styles.container}>
            <View style={{

                zIndex: 1,
                backgroundColor: ColorUtil.white,
                borderBottomWidth: 0.5,
                borderColor: ColorUtil.Purple,
                paddingVertical: ResponsiveUtil.height(13),
                flexDirection: "row"

            }}>
                <AntDesign
                    onPress={() => {
                        navigation.goBack()
                    }} name="left" color={ColorUtil.Purple} size={25} />
                <Text numberOfLines={1} style={{
                   fontSize: ResponsiveUtil.font(20),
                   marginLeft: ResponsiveUtil.width(20),
                   fontFamily: "Nunito-Bold",
                }}>Donate</Text>
                </View>

                {
                    loading ? <ActivityIndicator style={{ marginTop: ResponsiveUtil.height(30) }} color={ColorUtil.Purple} size={25} />
                        : <View style={{
                            flex: 1
                        }}>

                            <Image
                                resizeMethod="auto"
                                resizeMode="stretch"

                                style={{
                                    width: "100%",
                                    height: ResponsiveUtil.height(250),
                                    backgroundColor: ColorUtil.white
                                }}
                                source={{
                                    uri: `${ImageService.Donate}${donatedata?.Image}`
                                }} />
                            <ScrollView style={{
                                // borderTopLeftRadius: 20,
                                // borderTopRightRadius: 20,
                                // marginTop: -50,
                                backgroundColor: ColorUtil.white,
                                padding: ResponsiveUtil.width(10),
                                // borderTopWidth:ResponsiveUtil.width(2),
                                borderColor: ColorUtil.Purple,
                                paddingBottom: ResponsiveUtil.height(20)

                            }}>
                                <View style={{
                                    marginHorizontal: ResponsiveUtil.width(10),
                                    // borderBottomWidth: 1,
                                    borderColor: ColorUtil.Disablebutton,
                                    paddingBottom: ResponsiveUtil.height(20)
                                }}>
                                    <Text style={styles.titletext}>{donatedata?.MobileNo}</Text>
                                    {/* <Text style={styles.drnumber}>{news.MobileNo}</Text> */}

                                </View>

                            </ScrollView>

                        </View>

                }
            </View>
            )
}

            export default DonateScreen

            const styles = StyleSheet.create({
                container: {
                flex: 1,
            backgroundColor: ColorUtil.Gray
    },
            titletext:{
                fontFamily: "Nunito-Bold",
            fontSize: ResponsiveUtil.font(14),
            color: '#555'
    },
            datetext:{
                fontFamily: "Nunito-Regular",
            fontSize: ResponsiveUtil.font(12),
            color: '#555'
    },
})
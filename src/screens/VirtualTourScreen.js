import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, Linking, Pressable, Dimensions } from 'react-native'
import { ColorUtil } from '../utils/ColourUtils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ResponsiveUtil } from '../utils/ResponsiveUtils'
import axios from 'axios'
import { ApiUtils, ImageService } from '../utils/ApiUtils'
const VirtualTourScreen = ({ navigation }) => {
    const [virtualtourdata, setvirtualtourdata] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        getdata()

    }, [])
    const getdata = async () => {
        setloading(true)
        await axios.get(ApiUtils.VirtualTour).then(data => {
            const maindata = data.data;
            console.log(maindata)
            setloading(false)
            setvirtualtourdata(maindata.data)

        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: ResponsiveUtil.width(10),
                paddingTop: ResponsiveUtil.height(10),
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
                }} numberOfLines={1}>Virtual Tour</Text>
            </View>
            {
                loading ? <ActivityIndicator color={ColorUtil.Purple} size={25} /> :
                    <FlatList
                        refreshing={false}
                        onRefresh={() => {
                            getdata()
                        }}
                        style={{
                            paddingHorizontal: ResponsiveUtil.width(10),
                            marginTop: ResponsiveUtil.height(10),
                            backgroundColor: ColorUtil.Gray
                        }}
                        data={virtualtourdata}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: ResponsiveUtil.height(10) }} />
                        )}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={{
                                        // borderWidth:0.5,
                                        borderRadius: 10,
                                        margin: ResponsiveUtil.width(5),
                                        elevation: 5,
                                        backgroundColor: ColorUtil.white,
                                        paddingHorizontal: ResponsiveUtil.width(5),
                                        paddingVertical: ResponsiveUtil.width(10),
                                        marginBottom: ResponsiveUtil.height(8),


                                    }}
                                    key={index}>
                                    <Pressable
                                     onPress={() => {
                                        Linking.openURL(item.VideoURL);
                                    }}
                                    >
                                    <Image
                                        resizeMode="contain"
                                        source={{uri:`${ImageService.Thumbnail}${item.Thumbnail}`}}
                                        style={{
                                            width: "100%",
                                            height: ResponsiveUtil.height(200)
                                        }} />
                                        </Pressable>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingRight: ResponsiveUtil.width(10),
                                        paddingVertical: ResponsiveUtil.height(10)
                                    }}>
                                        <View>
                                            <Text numberOfLines={1} style={[styles.titletext,{
                                               
                                            }]}>{item.Title}</Text>
                                            {/* <Text style={styles.datetext}>{item.CreatedDate}</Text> */}
                                        </View>
                                        <View>
                                            <Pressable
                                                onPress={() => {
                                                    Linking.openURL(item.VideoURL);
                                                }}

                                            >
                                                <Text style={[styles.titletext,{
                                                     color:ColorUtil.Purple
                                                }]}>Play Now</Text>

                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
            }
        </View>
    )
}

export default VirtualTourScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorUtil.Gray
    },
    titletext: {
        fontFamily: "Nunito-Bold",
        fontSize: ResponsiveUtil.font(14),
        color: '#555',
        maxWidth:Dimensions.get('screen').width-100
    },
    datetext: {
        fontFamily: "Nunito-Regular",
        fontSize: ResponsiveUtil.font(12),
        color: '#555'
    },
})

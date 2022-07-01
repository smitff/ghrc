import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native'
import { ApiUtils, ImageService } from '../utils/ApiUtils';
import { ColorUtil } from '../utils/ColourUtils'
import { ResponsiveUtil } from '../utils/ResponsiveUtils';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import axios from 'axios';


const DoctorsDetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [doctorsdata, setdoctorsdata] = useState([])
    // const [loading, setloading] = useState(true)
    const [dr,setdr] = useState({})
   
    console.log(id)


    useEffect(()=>{

        getDoctordetail()


    },[])

    const getDoctordetail = async () => {

        // setloading(true)
        await axios.get(ApiUtils.Doctors).then(data => {
            const maindata = data.data;
            console.log(maindata)
            setdr(maindata.data[id])
            // setloading(false)

        }).catch(e => {
            console.log(e)
        })

    }





    console.log(dr)
    // console.log(news.id)
    const generateLink = async () => {
        try {
            var link = await dynamicLinks().buildShortLink({
                link: `https://ghrc.page.link/doctors?id=${id}`,
                domainUriPrefix: 'https://ghrc.page.link',
                android: {
                    packageName: 'com.ghrc.abu',
                    minimumVersion: '18'
                },
                // ios: {
                //     appStoreId: '123456789',
                //     bundleId: 'com.deepLinkingProjectBundleId',
                //     minimumVersion: '18'
                // },
            },
                dynamicLinks.ShortLinkType.DEFAULT
            )
            return link
        } catch (error) {
            console.log("error raised", error)
        }
    }

    

    const shareUser = async (id) => {
        const getLink = await generateLink()
        console.log("get linkkk kdjfkdlfdf",getLink)
        const res = await Share.open(({
            // message: 'Dummy message',
            
            message: `${dr.Name}\n`,
            url: getLink
        }))
        console.log("res==>>>", res)
    }







    return (
        <View style={styles.container}>
            <View style={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 1
            }}>
                <AntDesign
                    onPress={() => {
                        navigation.goBack()
                    }} name="left" color={ColorUtil.Purple} size={25} />
            </View>

            <View style={{
                flex: 1
            }}>

                <Image
                    style={{
                        width: "100%",
                        height: ResponsiveUtil.height(500)
                    }}
                    source={{
                        uri: `${ImageService.doctor}${dr.Image}`
                    }} />
                <ScrollView style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    marginTop: -50,
                    backgroundColor: ColorUtil.white,
                    padding: ResponsiveUtil.width(10)

                }}>
                    <View style={{
                        marginHorizontal: ResponsiveUtil.width(10),
                        borderBottomWidth: 1,
                        borderColor: ColorUtil.Disablebutton,
                        paddingBottom: ResponsiveUtil.height(5)
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <View>
                                <View style={{
                                    flexDirection: "row"
                                }}>
                                    <Text numberOfLines={1} style={styles.drname}>Name: </Text>
                                    <Text numberOfLines={1} style={{
                                        fontFamily: "Nunito-Regular",
                                        fontSize: ResponsiveUtil.font(18)
                                    }}>{dr.Name}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row"
                                }}>
                                    <Text style={{
                                        fontFamily: "Nunito-Bold",
                                        fontSize: ResponsiveUtil.font(16)
                                    }}>Designation: </Text>
                                    <Text numberOfLines={1} style={{
                                        fontFamily: "Nunito-Regular",
                                        fontSize: ResponsiveUtil.font(16)
                                    }}>{dr.Designation}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row"
                                }}>
                                    <Text style={{
                                        fontFamily: "Nunito-Bold",
                                        fontSize: ResponsiveUtil.font(16)
                                    }}>Experience: </Text>
                                    <Text numberOfLines={1} style={{
                                        fontFamily: "Nunito-Regular",
                                        fontSize: ResponsiveUtil.font(16)
                                    }}>{dr.MobileNo}</Text>
                                </View>

                            </View>


                            <View>
                            <AntDesign
                            onPress={() => {
                            shareUser()
                            }} name="sharealt" color={ColorUtil.Purple} size={25} />
                            </View>


                        </View>




                    </View>
                    <View style={{
                        marginHorizontal: ResponsiveUtil.width(10),
                        marginTop: ResponsiveUtil.height(20)
                    }}>
                        <Text style={styles.drnumber}>
                            {dr.About}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default DoctorsDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorUtil.Gray
    },
    drname: {
        fontFamily: "Nunito-Bold",
        fontSize: ResponsiveUtil.font(18)
    },
    drnumber: {
        fontFamily: "Nunito-Regular",
        fontSize: ResponsiveUtil.font(16)
    },

})

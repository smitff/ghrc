import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Linking,Dimensions } from 'react-native'
import { ApiUtils, ImageService } from '../utils/ApiUtils';
import { ColorUtil } from '../utils/ColourUtils'
import { ResponsiveUtil } from '../utils/ResponsiveUtils';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        await axios.get(ApiUtils.getDoctorByID+id).then(data => {
            const maindata = data.data;
            console.log(maindata,'maindata')
            setdr(maindata.data[0])
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
                flex: 1,
            
            }}>

                <View style={{
                    flex: 0.32,
                    width: '100%',
                    // backgroundColor:"yellow"
                }}>


                    <View style={{
                        // borderRadius:"50%",
                        // backgroundColor:"yellow",
                        width:200,
                        height:200,
                        alignSelf:"center",
                        // borderRadius:100,
                        marginTop: 8,
                    }}>
                        <Image
                            style={{
                                width: "100%",
                                // flex:0.4,
                                // height: ResponsiveUtil.height(500)
                                height: "100%",
                                // borderRadius:windowWidth/2,
                                alignSelf: 'center',
                                borderRadius: 100,
                            }}
                            source={{
                                uri: `${ImageService.doctor}${dr.Image}`
                            }}
                            // resizeMode="stretch"
                            resizeMode="cover"
                            />
                    </View>    

                </View>
                
                
                <View style={{
                    // borderTopLeftRadius: 20,
                    // borderTopRightRadius: 20,
                    // marginTop: -50,
                    backgroundColor: ColorUtil.white,
                    padding: ResponsiveUtil.width(10),
                    paddingTop: ResponsiveUtil.height(12),
                    // backgroundColor:'yellow',
                    flex:0.68,
                    // backgroundColor: "yellow",
                    


                }}>
                    <View style={{
                        marginHorizontal: ResponsiveUtil.width(10),
                        borderBottomWidth: 1,
                        borderColor: ColorUtil.Disablebutton,
                        padding: ResponsiveUtil.height(8),
                        backgroundColor: ColorUtil.Purple,
                        borderRadius: 5
                        
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            // backgroundColor:"yellow",
                            // paddingTop: ResponsiveUtil.height(10),
                        }}>
                            <View>
                                <View style={{
                                    flexDirection: "row"
                                }}>
                                    <Text numberOfLines={1} style={styles.drname}>Name: </Text>
                                    <Text numberOfLines={1} style={{
                                        fontFamily: "Nunito-Regular",
                                        fontSize: ResponsiveUtil.font(18),
                                        color:"#FFFFFF"
                                    }}>{dr.Name}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row"
                                }}>
                                    <Text style={{
                                        fontFamily: "Nunito-Bold",
                                        fontSize: ResponsiveUtil.font(16),
                                        color:"#FFFFFF"

                                        
                                    }}>Designation: </Text>
                                    <Text numberOfLines={1} style={{
                                        fontFamily: "Nunito-Regular",
                                        fontSize: ResponsiveUtil.font(16),
                                        color:"#FFFFFF"

                                    }}>{dr.Designation}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row"
                                }}>
                                    <Text style={{
                                        fontFamily: "Nunito-Bold",
                                        fontSize: ResponsiveUtil.font(16),
                                        color:"#FFFFFF"

                                    }}>Experience: </Text>
                                    <Text numberOfLines={1} style={{
                                        fontFamily: "Nunito-Regular",
                                        fontSize: ResponsiveUtil.font(16),
                                        color:"#FFFFFF"

                                    }}>{dr.MobileNo}</Text>
                                </View>

                            </View>


                            <View>
                                <AntDesign
                                onPress={() => {
                                shareUser()
                                }} name="sharealt" color={ColorUtil.white} size={25} />
                            </View>


                        </View>




                    </View>
                
                
                    <ScrollView>
                        <View style={{
                        marginHorizontal: ResponsiveUtil.width(10),
                        marginTop: ResponsiveUtil.height(20),
                        // backgroundColor:"yellow",
                    }}>
                            <Text style={styles.drnumber}>
                                {dr.About}  
                            </Text>
                        </View>
                    </ScrollView>
                    
                </View>



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
        fontSize: ResponsiveUtil.font(18),
        color: ColorUtil.white
    },
    drnumber: {
        fontFamily: "Nunito-Regular",
        fontSize: ResponsiveUtil.font(16)
    },

})

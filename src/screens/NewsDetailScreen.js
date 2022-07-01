import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import { ApiUtils, ImageService } from '../utils/ApiUtils';
import { ColorUtil } from '../utils/ColourUtils'
import { ResponsiveUtil } from '../utils/ResponsiveUtils';
import AntDesign from 'react-native-vector-icons/AntDesign'
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import axios from 'axios';


const NewsDetailScreen = ({ route,navigation }) => {
    const { id } = route.params;
    console.log(id)
    const [healthtipsdata, sethealthtipsdata] = useState([])
    const [news, setnews] = useState({})


    const getAllNews = () => {
        // setloading(true)
        axios.get(ApiUtils.NewsAll).then(data => {
            const maindata = data.data;
            console.log(maindata)
            // setloading(false)
            sethealthtipsdata(maindata.data)
            setnews(maindata.data[id])
            console.log('ffffffffffffffffff')
        
            console.log(healthtipsdata,"healthtipsdata---------------------------") 
    
        }).catch(e => {
            console.log(e)
        })
    }


    useEffect(()=>{

        getAllNews()


    },[])



    console.log(news)
    // console.log(news.id)
    const generateLink = async () => {
        try {
            var link = await dynamicLinks().buildShortLink({
                link: `https://ghrc.page.link/bjYi?id=${id}`,
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
            message: `${news.Title}\n`,
            url: getLink
        }))
        console.log("res==>>>", res)
    }


    return (
        <View style={styles.container}>


            <View style={{
                flex: 1
            }}>
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
                    <Text numberOfLines={1} style={[styles.drname, {
                        maxWidth: Dimensions.get('screen').width - 50,
                        marginLeft: ResponsiveUtil.width(10)
                    }]}>{news.Title}</Text>
                </View>


                <ScrollView style={{
                    // borderTopLeftRadius: 20,
                    // borderTopRightRadius: 20,
                    marginTop: 0,
                    backgroundColor: ColorUtil.white,
                    padding: ResponsiveUtil.width(0),
                    // borderTopWidth:ResponsiveUtil.width(2),
                    borderColor: ColorUtil.Purple,
                    paddingBottom: ResponsiveUtil.height(20)

                }}>

                    <Image
                        resizeMethod="auto"
                        resizeMode="stretch"

                        style={{
                            width: "100%",
                            height: ResponsiveUtil.height(250)
                        }}
                        source={{
                            uri: `${ImageService.news}${news?.Image}`
                        }} />
                    <View style={{
                        marginHorizontal: ResponsiveUtil.width(10),
                        // borderBottomWidth: 1,
                        borderColor: ColorUtil.Disablebutton,
                        paddingBottom: ResponsiveUtil.height(20),
                        marginTop:ResponsiveUtil.height(15)
                    }}>
                        <Text style={styles.drname}>{news.Title}</Text>
                        <View style={{
                            flexDirection: "row",
                            // backgroundColor: "pink",
                            justifyContent: "space-between",
                        }}>
                            <View style={{flexDirection:"row",alignItems:"center", marginBottom:ResponsiveUtil.height(10)}}>
                                <AntDesign
                                    name="calendar" color={ColorUtil.Purple} size={20} />
                                <Text style={[styles.drnumber,{
                                    marginLeft:ResponsiveUtil.width(10),
                                
                                }]}>{news.Date}</Text>
                            </View>

                            <View style={{
                                marginRight:20
                            }}>
                            <AntDesign
                            onPress={() => {
                            shareUser()
                            }} name="sharealt" color={ColorUtil.Purple} size={25} />
                            </View>



                            
                        </View>
                       
                        <RenderHtml
                            contentWidth={Dimensions.get('screen').width}
                            source={{ html: news.Description }}
                        />


                    </View>
                   
                </ScrollView>
            </View>
        </View>
    )
}

export default NewsDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorUtil.Gray
    },
    drname: {
        fontFamily: "Nunito-ExtraBold",
        fontSize: ResponsiveUtil.font(18)
    },
    drnumber: {
        fontFamily: "Nunito-Regular",
        fontSize: ResponsiveUtil.font(14)
    },

})


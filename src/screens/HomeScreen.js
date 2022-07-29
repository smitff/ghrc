import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, Modal, View, Image, Dimensions, ImageBackground, FlatList, ScrollView, Pressable, RefreshControl, ActivityIndicator, Linking,TextInput,TouchableOpacity,ToastAndroid } from 'react-native'
import { ColorUtil } from '../utils/ColourUtils'
import { ResponsiveUtil } from '../utils/ResponsiveUtils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { ApiUtils, ImageService } from '../utils/ApiUtils'
import NewsLoading from '../components/NewsLoading'
import DocotorLoading from '../components/DocotorLoading'
import NewsLoading2 from '../components/NewsLoading2'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import WebView from 'react-native-webview'
import Modalr from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const HomeScreen = ({ navigation }) => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const [newsdata, setnewsdata] = useState([])
    const [doctorsdata, setdoctorsdata] = useState([])
    const [healthtips, sethealthtips] = useState([])
    const [newsloading, setnewsloading] = useState(true);
    const [docotorloading, setdocotorloading] = useState(true)
    const [healthtiploading, sethealthtiploading] = useState(true)
    const [donationloading, setdonationloading] = useState(true)
    const [topdata, settopdata] = useState(null);
    const [virtualtourdata, setvirtualtourdata] = useState(null)
    const [virtualtouroading, setvirtualtouroading] = useState(true)
    const [donationviewopen, setdonationviewopen] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);

    const [name, setname] = useState('')
    const [mobile, setmobile] = useState(0)
    const [fcmTokenf, setfcmTokenf] = useState('')

    useEffect(() => {
        getFcmToken()
        check()
        getnews()
        getdoctors()
        gethealthtips()
        getdonation()
        getvirtualtour()
    }, [])


    const getDataforname = async () => {
        try {
        const value = await AsyncStorage.getItem('@storage_Key5')
        if(value !== null) {
            // value previously stored
            console.log(value,"----------------val----------")
            return;
        }
        toggleModal()
        } catch(e) {
        // error reading value
        }
    }

    const getFcmToken = async ()=>{
        fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log(fcmToken,"Old Token")
      
        if(!fcmToken){
            try{
                const fcmToken = await messaging().getToken();
                if(fcmToken){
                    console.log("New Token by fb messagin",fcmToken)
                    await AsyncStorage.setItem('fcmToken',fcmToken);
                }
            }catch(e){
                console.log(e,"Error in getting token")
            }
        }
        setfcmTokenf(fcmToken)
    }
    
    const check = ()=>{
        getDataforname()
    }

    const showToast = () => {
        ToastAndroid.show("Data Saved Successfully", ToastAndroid.SHORT);
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };


      const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@storage_Key5', value)
        } catch (e) {
          // saving error
        }
      }



  

    const submit = ()=>{
        console.log(fcmTokenf,"Fcccccccc")

        if(name.length == 0 || mobile.length == 0){
            ToastAndroid.show("Please fill the required details", ToastAndroid.SHORT);
            // return;
        }

        if(name.length>0 && mobile.length>0 && fcmTokenf.length>0){


            axios.post(`http://global-app.in//api/AddPatient.aspx?name=${name}&mobile=${mobile}&token=${fcmTokenf}`)
            // headers={
            //     'Content-Type': 'application/json'
            // }
            
            .then((res)=>{
                console.log("----------------------------response")
                console.log(res.data)
                toggleModal()

                storeData(name)

                showToast()

            })
            .catch((err)=>{
                console.log("----------------------------error")
                console.log(err)
            })

        }

    }  

    const getnews = async () => {
        setnewsloading(true)
        await axios.get(ApiUtils.News).then(data => {
            const maindata = data.data;
            if (maindata.status == "true") {
                setnewsdata(maindata.data)
                setnewsloading(false)
            }
        }).catch(e => {
            console.log(e)
        })
    }
    const getdonation = async () => {
        setdonationloading(true)
        const api = ApiUtils.Top
        console.log("api---->> ", api)
        await axios.get(ApiUtils.Top).then(data => {
            const maindata = data.data;
            console.log(maindata.data)
            if (maindata.status == "true") {
                settopdata(maindata.data[0])
                setdonationloading(false)
            }
        }).catch(e => {
            console.log(e)
        })
    }
    const getvirtualtour = async () => {
        setvirtualtouroading(true)
        await axios.get(ApiUtils.VirtualTour).then(data => {
            const maindata = data.data;
            if (maindata.status == "true") {
                setvirtualtouroading(false)
                setvirtualtourdata(maindata.data)
                console.log("this is vir data",maindata.data)
                //    setdonationloading(false)
            }
        }).catch(e => {
            console.log(e)
        })
    }
    const gethealthtips = async () => {
        sethealthtiploading(true)
        await axios.get(ApiUtils.HealthTps).then(data => {
            const maindata = data.data;
            if (maindata.status == "true") {
                sethealthtips(maindata.data)
                sethealthtiploading(false)
            }
        })
    }
    const getdoctors = async () => {
        setdocotorloading(true)
        await axios.get(ApiUtils.Doctors).then(data => {
            const maindata = data.data;
            if (maindata.status == "true") {
                setdoctorsdata(maindata.data)
                setdocotorloading(false)
            }
        })
    }

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                        getnews()
                        getdoctors()
                        gethealthtips()
                    }}
                />}>
            <StatusBar backgroundColor={ColorUtil.Purple} />
           

            <Modal
                visible={donationviewopen}
                onRequestClose={() => {
                    setdonationviewopen(false)
                }}
            >
                <WebView
                    startInLoadingState
                    renderLoading={() => (
                        <ActivityIndicator style={{ alignSelf: "center", marginBottom: Dimensions.get('screen').height / 2 }} color={ColorUtil.Purple} size={30} />
                    )}

                    source={{
                        uri: ApiUtils.Donationurl
                    }} />
            </Modal>
            {/* <View style={styles.headercard}>
                <View style={styles.headertop}>
                    <AntDesign onPress={()=>{
                        navigation.toggleDrawer();
                    }} name="menu-fold" color={ColorUtil.black} size={25} />

                </View>

            </View> */}
            {/* source={{
                        uri: "http://awarepedia786-001-site1.htempurl.com/Images/News/637651595657491114doctor_face.jpg"
                    }} */}
            <View
               
                style={styles.headerimage}

            >
                {donationloading ? <ShimmerPlaceholder style={{
                position:"absolute",
                width:'100%',
                height:200
            }}  />
            :
                <Image 
                style={{
                    position:"absolute",
                    width:'100%',
                    height:200
                }}
                 resizeMethod="auto"
                 resizeMode="stretch"
                 source={{ uri: `${ImageService.Top}${topdata?.Image}` }}  /> }

                <View style={styles.headertop}>
                    <AntDesign onPress={() => {
                        navigation.toggleDrawer();
                    }} name="menu-fold" color={ColorUtil.white} size={25} />



                </View>
                {/* {donationloading ? <ShimmerPlaceholder style={{
                height:ResponsiveUtil.height(100),
                width:ResponsiveUtil.width(100),
                borderRadius:50
            }}  />
            :
            
            <Image style={{
                height: ResponsiveUtil.height(100),
                width: ResponsiveUtil.width(100),
                alignSelf: "center",

            }} source={{uri:`${ImageService.Top}${topdata?.Image}`}} />
            } */}
                {/* {donationloading ? <ShimmerPlaceholder style={styles.headertext} /> :
                    <Text style={styles.headertext}>{topdata?.Text}</Text>
                } */}
                 <Text style={styles.headertext}>{topdata?.Text}</Text>
                {/* <Text style={styles.desctext}>Lets Chek you health with us Lets Chek you health with us Lets Chek you health with us</Text> */}

            </View>
            <View style={{ paddingHorizontal: ResponsiveUtil.width(10) }}>

                <View style={{ marginTop: ResponsiveUtil.height(10) }}>
                    <Text style={styles.blackheading}>Top News</Text>
                    {newsloading ?
                        <NewsLoading2 />
                        :
                        <FlatList
                            style={{ marginTop: ResponsiveUtil.width(10) }}
                            horizontal
                            data={newsdata}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={() => (
                                <View style={{ width: 0 }} />
                            )}
                            renderItem={({ item, index }) => {
                                return (
                                    <Pressable
                                        onPress={() => {
                                            navigation.navigate("HomeNews", { id: index })
                                        }}
                                        style={{
                                            width: (Dimensions.get('screen').width) / 1.6,
                                            backgroundColor: ColorUtil.white,
                                            borderRadius: 10,
                                            overflow: "hidden",
                                            elevation: 5,
                                            margin: ResponsiveUtil.width(5),
                                            marginBottom: ResponsiveUtil.height(10)
                                        }}
                                        key={index}>
                                        <Image style={{
                                            height: ResponsiveUtil.height(160),
                                            width: "100%",
                                            alignSelf: "center"
                                        }}
                                            source={{
                                                uri: `${ImageService.news}${item.Image}`
                                            }} />
                                        <View style={{
                                            paddingHorizontal: ResponsiveUtil.width(5),
                                            paddingVertical: ResponsiveUtil.width(10),
                                            paddingBottom: ResponsiveUtil.height(10)
                                        }}>
                                            <Text style={[styles.cardttiletext, { marginTop: ResponsiveUtil.height(5) },]} numberOfLines={2}>{item.Title}</Text>
                                            {/* <Text style={[styles.carddestext, { marginTop: ResponsiveUtil.height(5) }]} numberOfLines={1}>{item.Description}</Text> */}
                                        </View>
                                    </Pressable>
                                )
                            }}

                        />
                    }
                </View>

                <View style={{ marginTop: ResponsiveUtil.height(10) }}>
                    <Text style={styles.blackheading}>Top Doctors</Text>
                    {docotorloading ? <DocotorLoading />
                        :
                        <FlatList
                            style={{ marginTop: ResponsiveUtil.width(10) }}
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
                                            navigation.navigate("HomeDoctors", { id: index })
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

                        />}
                </View>
                <View style={{ marginTop: ResponsiveUtil.height(10), marginBottom: ResponsiveUtil.height(10) }}>
                    <Text style={styles.blackheading}>Health Tips</Text>
                    {healthtiploading ? <NewsLoading />
                        :
                        <FlatList
                            style={{ marginTop: ResponsiveUtil.width(10), marginBottom: ResponsiveUtil.height(10) }}
                            showsVerticalScrollIndicator={false}
                            data={healthtips}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            numColumns={2}
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 0 }} />
                            )}
                            renderItem={({ item, index }) => {
                                return (
                                    <Pressable
                                        onPress={() => {
                                            navigation.navigate('HomeHealthTips', { id: index })
                                        }}
                                        style={{
                                            width: ((Dimensions.get('screen').width) / 2) - 20,
                                            backgroundColor: ColorUtil.white,
                                            borderRadius: 10,
                                            overflow: "hidden",
                                            elevation: 3,
                                            margin: ResponsiveUtil.width(5),
                                            marginBottom: ResponsiveUtil.height(8),
                                            // flexDirection: 'row'

                                        }}
                                        key={index}>
                                        <Image style={{
                                            height: ResponsiveUtil.height(100),
                                            width: Dimensions.get('screen').width / 2 - 20,
                                            alignSelf: "center"
                                        }}
                                            source={{
                                                uri: `${ImageService.health}${item.Image}`
                                            }} />
                                        <View style={{
                                            paddingHorizontal: ResponsiveUtil.width(10),
                                            paddingBottom: ResponsiveUtil.height(5),
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            flex: 1
                                        }}>
                                            <View>
                                                <Text style={[styles.cardttiletext, { marginTop: ResponsiveUtil.height(5) }]} numberOfLines={2}>{item.Title}</Text>
                                                {/* <Text style={[styles.carddestext, { marginTop: ResponsiveUtil.height(5) }]} numberOfLines={1}>{item.Description}</Text> */}
                                            </View>
                                            {/* <View style={{ alignSelf: "center" }}>
                                            <AntDesign name="right" size={25} color={ColorUtil.black} />
                                        </View> */}
                                        </View>


                                    </Pressable>
                                )
                            }}

                        />
                    }
                </View>
                <View style={{ marginTop: ResponsiveUtil.height(10) }}>
                    <Text style={styles.blackheading}>Virtual Tour</Text>
                    {virtualtouroading ?
                        <NewsLoading2 />
                        :
                        <FlatList
                            style={{ marginTop: ResponsiveUtil.width(10) }}
                            horizontal
                            data={virtualtourdata}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={() => (
                                <View style={{ width: 0 }} />
                            )}
                            renderItem={({ item, index }) => {
                                console.log("this is thimb ",item.Thumbnail)
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
                                            marginBottom: ResponsiveUtil.height(10),


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
                                                width: Dimensions.get('screen').width / 1.5,
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
                                                <Text numberOfLines={1} style={[styles.titletext, {
                                                    maxWidth: Dimensions.get('screen').width / 2.2
                                                }]}>{item.Title}</Text>
                                                {/* <Text style={styles.datetext}>{item.CreatedDate}</Text> */}
                                            </View>
                                            <View>
                                                <Pressable
                                                    onPress={() => {
                                                        Linking.openURL(item.VideoURL);
                                                    }}

                                                >
                                                    <Text style={[styles.titletext, {
                                                        color: ColorUtil.Purple
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

                <View style={{
                    marginTop: ResponsiveUtil.height(15),
                    marginBottom: ResponsiveUtil.height(20),
                    margin: ResponsiveUtil.width(5),
                    elevation: 5

                }}>
                    <Pressable
                        style={{
                            justifyContent: "center",
                            //    alignItems:"center",
                            backgroundColor: ColorUtil.Purple,
                            paddingVertical: ResponsiveUtil.height(12),
                            borderRadius: 10,
                            flexDirection: "row",
                            alignItems: "flex-start"
                        }}
                        onPress={() => {
                            setdonationviewopen(true)
                        }}
                    >
                        <FontAwesome5 name="hands" color={ColorUtil.white} size={16} />
                        <Text style={{
                            color: ColorUtil.white,
                            fontFamily: "Nunito-Bold",
                            marginLeft: ResponsiveUtil.width(8)
                        }}>Donate</Text>
                    </Pressable>

                </View>
            </View>
        
            <KeyboardAwareScrollView>
            <View>
                <Modalr isVisible={isModalVisible}
                // style={{
                //     justifyContent: "flex-start",
                // }}
                >
                    <View style={{ 
                        // flex: 0.65,
                        backgroundColor: ColorUtil.white,
                        // justifyContent:'flex-start',
                        paddingHorizontal:20,
                        borderRadius:5,
                        paddingBottom:20,
                        paddingTop:20,

                     }}>
                        {/* <TouchableOpacity
                        onPress={() => toggleModal()}
                        style={{
                            alignItems: "flex-end",
                            marginTop:10,
                            alignSelf: "flex-end",
                            // backgroundColor:'pink',
                            // width:50,
                            marginRight:-10,
                            alignItems:'center'
                        }}>
                            <AntDesign name="closecircleo" color={ColorUtil.Purple} size={25} />
                        </TouchableOpacity> */}




                        <View style={{
                            marginBottom: 24,
                            alignItems:"center",
                            justifyContent:'center'
                            
                        }}>
                            <Text style={{
                                fontSize: ResponsiveUtil.font(24),
                                color: ColorUtil.Purple,
                            }}>Signup</Text>
                        </View>

                        <View style={{
                            // backgroundColor: "pink", 
                        }}>

                            <TextInput
                            autoCapitalize="none"
                            style={{
                                paddingLeft: 24,
                                paddingRight: 50,
                                color: ColorUtil.black,
                                fontFamily:"OpenSans-Regular",
                                fontSize: 16,
                                fontWeight: '400',
                                // backgroundColor: "grey",
                                borderColor: ColorUtil.Purple,
                                borderWidth: 1,
                                borderRadius: 5,
                                marginBottom: 24,
                            }}
                            onChangeText={e => setname(e)}
                            value={name}
                            keyboardType="default"
                            // keyboardType="email-address"
                            placeholder="Enter your name"
                            placeholderTextColor={ColorUtil.Grey}
                            />
                            <TextInput
                                style={{
                                    paddingLeft: 24,
                                    paddingRight: 50,
                                    color: ColorUtil.black,
                                    fontFamily:"OpenSans-Regular",
                                    fontSize: 16,
                                    fontWeight: '400',
                                    // backgroundColor: "grey",
                                    borderColor: ColorUtil.Purple,
                                    borderWidth: 1,
                                    marginBottom: 24,
                                    borderRadius: 5,
                                }}
                                onChangeText={e => setmobile(e)}
                                value={mobile}
                                keyboardType="numeric"

                                placeholder="Enter your mobile number"
                                // secureTextEntry={true}
                                placeholderTextColor={ColorUtil.Grey}
                            />



                            <View style={{
                                width: '100%',
                            }}>
                                <TouchableOpacity
                                onPress={() => submit()}
                                style={{
                                    // backgroundColor:colors.yellow,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height: 40,
                                    borderRadius:5,
                                    backgroundColor: ColorUtil.Purple,
                                    borderColor: ColorUtil.Purple,
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        color:ColorUtil.white,
                                        fontFamily: 'OpenSans-Regular',
                                        fontWeight: '700',
                                        fontSize: 16,

                                        
                                    }}>
                                        Submit
                                    </Text>

                                </TouchableOpacity>
                            </View>

                        </View>





                    </View>
                </Modalr>
                
      
            </View>
    
            
            </KeyboardAwareScrollView>
      
        </ScrollView>
    )
}


export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorUtil.Gray

    },
    headercard: {
        // backgroundColor:ColorUtil.darkblue,
        paddingHorizontal: ResponsiveUtil.width(10),
        paddingVertical: ResponsiveUtil.width(10),
        // borderBottomLeftRadius:20
    },
    headerimage: {
        // height: ResponsiveUtil.height(200),
        // width: Dimensions.get('screen').width - 40,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // justifyContent:"center",
        // alignItems: "center",
        backgroundColor: ColorUtil.Purple,
        paddingHorizontal: ResponsiveUtil.width(0),
        paddingVertical: ResponsiveUtil.width(15),
        justifyContent: "flex-end",
        alignItems: "center",
        margin: ResponsiveUtil.width(5),
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        elevation: 8,
        height: 200,
        overflow:"hidden"

    },
    headertop: {
        paddingHorizontal: ResponsiveUtil.width(0),
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: ResponsiveUtil.height(10),
        justifyContent: "flex-start",
        position: "absolute",
        zIndex: 1,
        top: 10,
        left: ResponsiveUtil.width(10)
    },
    headertext: {
        color: ColorUtil.white,
        fontSize: ResponsiveUtil.font(20),
        fontFamily: "Nunito-ExtraBold",
        marginTop: ResponsiveUtil.width(10),
        textAlign:"center",
    },
    desctext: {
        color: ColorUtil.white,
        fontSize: ResponsiveUtil.font(14),
        fontFamily: "Nunito-ExtraBold",
        letterSpacing: 1,
        marginTop: ResponsiveUtil.height(5)
    },
    blackheading: {
        fontSize: ResponsiveUtil.font(16),
        fontFamily: "Nunito-ExtraBold",
        // fontWeight:"bold"

    },
    cardttiletext: {
        fontFamily: "Nunito-Bold",
        fontSize: ResponsiveUtil.font(14),
        color: '#555'
    },
    carddestext: {
        fontFamily: "Nunito-Regular",
        fontSize: ResponsiveUtil.font(12),
        color: '#555'
    }
})
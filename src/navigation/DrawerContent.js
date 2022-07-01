import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
// import AboutUs from '../component/icon/AboutUs';
// import CommonLine from '../component/common/CommonLine';
// import User2 from '../component/icon/User2'
// import Wallet from '../component/icon/Wallet'
// import Mystats from '../component/icon/Mystats'
// import LeaderBoard from '../component/icon/LeaderBoard'
// import Logout from '../component/icon/Logout'
// import Rate from '../component/icon/Rate'
// import Privacy from '../component/icon/Privacy'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAsesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ColorUtil } from '../utils/ColourUtils';
import { ResponsiveUtil } from '../utils/ResponsiveUtils';
import CommonLine from './CommonLine';
const DrawerContent = (props) => {
    const tatasirimage = "https://www.tatasteel.com/media/3370/ratan-tata1.jpg";




    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <View style={[styles.header]}>
                <Image style={styles.headerimage} source={require('../../asset/GHRC_512.jpg')} />
                <Text style={styles.headermobile}>GHRC</Text>
            </View>
            <ScrollView style={styles.userInformation} showsVerticalScrollIndicator={false}>




                <TouchableOpacity

                    activeOpacity={0.5} style={styles.item} onPress={() => {
                        // props.navigation.navigate('ProfileScreen');
                            props.navigation.toggleDrawer();
                    }}>
                    {/* <View style={styles.leftIcon}>
                        <User2/>
                    </View> */}
                    <FontAsesome5 color={ColorUtil.Purple} size={20} name="home" />
                    <View style={styles.content}>
                        <Text style={styles.text}>Home</Text>
                    </View>

                </TouchableOpacity>

                <CommonLine style={styles.CommonLinestyle} />
                <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => {
                    props.navigation.navigate('DoctorsFullScreen');

                }}>
                    {/* <View style={styles.leftIcon}>
                        <User2/>
                    </View> */}
                    <Fontisto color={ColorUtil.Purple} size={20} name="doctor" />
                    <View style={styles.content}>
                        <Text style={styles.text}>All Doctors</Text>
                    </View>
                    <View style={styles.rightIcon}>

                    </View>
                </TouchableOpacity> 
                <CommonLine style={styles.CommonLinestyle} />
                <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => {
                    props.navigation.navigate('TrustiesScreen');

                }}>
                    {/* <View style={styles.leftIcon}>
                        <User2/>
                    </View> */}
                    <Fontisto color={ColorUtil.Purple} size={20} name="person" />
                    <View style={styles.content}>
                        <Text style={styles.text}>Governance</Text>
                    </View>
                    <View style={styles.rightIcon}>

                    </View>
                </TouchableOpacity>
               
                  <CommonLine style={styles.CommonLinestyle} />
                <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => {
                    props.navigation.navigate('HealthTips');

                }}>
                    {/* <View style={styles.leftIcon}>
                        <User2/>
                    </View> */}
                    <FontAsesome5 color={ColorUtil.Purple} size={20} name="seedling" />
                    <View style={styles.content}>
                        <Text style={styles.text}>Health Tips</Text>
                    </View>
                    <View style={styles.rightIcon}>

                    </View>
                </TouchableOpacity>
               
                <CommonLine style={styles.CommonLinestyle} />
                <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => {
                    props.navigation.navigate('NewsScreen');

                }}>
                    {/* <View style={styles.leftIcon}>
                        <User2/>
                    </View> */}
                    <FontAsesome5 color={ColorUtil.Purple} size={20} name="newspaper" />
                    <View style={styles.content}>
                        <Text style={styles.text}>News</Text>
                    </View>
                    <View style={styles.rightIcon}>

                    </View>
                </TouchableOpacity>

                <CommonLine style={styles.CommonLinestyle} />
                <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => {
                    props.navigation.navigate('VirtualTourScreen');

                }}>
                    {/* <View style={styles.leftIcon}>
                        <User2/>
                    </View> */}
                    <FontAsesome5 color={ColorUtil.Purple} size={20} name="video" />
                    <View style={styles.content}>
                        <Text style={styles.text}>Virtual Tour</Text>
                    </View>
                    <View style={styles.rightIcon}>

                    </View>
                </TouchableOpacity>


                <CommonLine style={styles.CommonLinestyle} />
               
                <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => {
                    props.navigation.navigate('InfoScreen');

                }}>
                    {/* <View style={styles.leftIcon}>
                        <User2/>
                    </View> */}
                    <FontAsesome5 color={ColorUtil.Purple} size={20} name="info-circle" />
                    <View style={styles.content}>
                        <Text style={styles.text}>About</Text>
                    </View>
                    <View style={styles.rightIcon}>

                    </View>
                </TouchableOpacity> 
                 <CommonLine style={styles.CommonLinestyle} />
               
                <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => {
                    props.navigation.navigate('QueryScreen');

                }}>
                    {/* <View style={styles.leftIcon}>
                        <User2/>
                    </View> */}
                    <FontAsesome5 color={ColorUtil.Purple} size={20} name="info-circle" />
                    <View style={styles.content}>
                        <Text style={styles.text}>Patient Query</Text>
                    </View>
                    <View style={styles.rightIcon}>

                    </View>
                </TouchableOpacity>
                

















            </ScrollView>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
        // overflow: 'scroll',
        // borderWidth: 1,
    },
    text: {
        fontSize: ResponsiveUtil.width(16),
        fontFamily: "Nunito-ExtraBold",
        color:ColorUtil.black
    },
    drawerStyles: { flex: 1, width: '60%', backgroundColor: 'transparent' },
    header: {
        // height: ResponsiveUtil.height(80),
        width: '100%',
        backgroundColor: ColorUtil.white,
        // justifyContent:"center",
        alignItems: "center",
        flexDirection:'row',
        paddingHorizontal: ResponsiveUtil.width(0),
        paddingVertical: ResponsiveUtil.height(10)
    },
    headerimage: {
        width: "30%",
        height: ResponsiveUtil.height(60),
        borderRadius: 0,
        backgroundColor: ColorUtil.white,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        // marginTop:ResponsiveUtil.width(10)
    },
    headername: {
        fontWeight: "bold",
        color: ColorUtil.black,
        fontSize: 14,
        marginLeft: ResponsiveUtil.width(10)
    },
    headermobile: {
        color: ColorUtil.black,
        marginBottom: ResponsiveUtil.height(5),
        fontFamily: "Nunito-ExtraBold",
        fontSize: ResponsiveUtil.font(16),
        marginTop: ResponsiveUtil.height(5)
    },
    userInformation: {
        marginTop: ResponsiveUtil.height(6),
        width: '100%',
        // maxHeight: ResponsiveUtil.screenHeight() - 110,
        flex: 1

    },
    item: {
        width: '100%',
        height: ResponsiveUtil.height(35),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: ResponsiveUtil.height(8),

        paddingHorizontal: ResponsiveUtil.width(10)
    },
    itemswitch: {
        width: '100%',
        height: ResponsiveUtil.height(35),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ResponsiveUtil.height(8),
        position: "absolute",
        bottom: 0
    },
    leftIcon: {
        width: ResponsiveUtil.width(42),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightIcon: {
        width: ResponsiveUtil.width(30),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightIconswitch: {
        width: ResponsiveUtil.width(30),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: ResponsiveUtil.width(10)
    },
    setting: {
        height: ResponsiveUtil.height(40),
        width: '100%',
    },
    CommonLinestyle: {
        marginTop: ResponsiveUtil.height(2),
        backgroundColor: ColorUtil.Purple,
        width: "95%",
        opacity: 0.2
    }
});

export default DrawerContent

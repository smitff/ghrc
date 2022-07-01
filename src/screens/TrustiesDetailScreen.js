import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native'
import { ImageService } from '../utils/ApiUtils';
import { ColorUtil } from '../utils/ColourUtils'
import { ResponsiveUtil } from '../utils/ResponsiveUtils';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
const TrustiesDetailScreen = ({ route, navigation }) => {
    const { dr } = route.params;
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
                        uri: `${ImageService.Governance}${dr.Image}`
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

export default TrustiesDetailScreen

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
